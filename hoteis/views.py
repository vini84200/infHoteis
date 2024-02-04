import datetime

from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.response import Response

from hoteis.models import Hotel, Reserva, Quarto, CategoriaQuarto
from hoteis.serializers import HotelSerializer, ReservaSerializer, ReservaRequestSerializer, CategoriaSerializer


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class HotelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    authentication_classes = []

    @action(detail=True, methods=['get'])
    def tipos(self, request, pk=None, *args, **kwargs):
        hotel = self.get_object()
        tipos = CategoriaQuarto.objects.filter(quarto__hotel=hotel).distinct()

        return Response(CategoriaSerializer(tipos, many=True, context={'request': request}).data)


class ReservaPermission(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        if request.method == 'PUT':
            return False
        return obj.cliente == request.user or request.user.is_staff


class ReservaViewSet(viewsets.ModelViewSet):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer
    permission_classes = [ReservaPermission]

    def get_serializer_class(self):
        if self.action == 'create':
            return ReservaRequestSerializer
        if self.request.method == 'POST':
            return ReservaRequestSerializer
        return super().get_serializer_class()

    def create(self, request, *args, **kwargs):
        reserva = self.get_serializer(data=request.data)
        reserva.is_valid(raise_exception=True)
        reservas = reserva.create(reserva.validated_data)

        return Response(ReservaSerializer(reservas, many=True).data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        reserva = self.get_object()
        if reserva.checkin:
            return Response({'detail': 'Checkin já foi feito'}, status=status.HTTP_400_BAD_REQUEST)
        if reserva.cancelada:
            return Response({'detail': 'Reserva já foi cancelada'}, status=status.HTTP_400_BAD_REQUEST)
        if (reserva.data_inicio - datetime.date.today()).days < 2:
            return Response({'detail': 'Não é possível cancelar com menos de 2 dias de antecedência'},
                            status=status.HTTP_400_BAD_REQUEST)
        if not reserva.can_cancel():
            return Response({'detail': 'Não é possível cancelar'}, status=status.HTTP_400_BAD_REQUEST)

        reserva.cancelada = True
        reserva.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_queryset(self):
        return Reserva.objects.filter(cliente=self.request.user)
