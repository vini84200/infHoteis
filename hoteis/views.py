from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.response import Response

from hoteis.models import Hotel, Reserva, CategoriaQuarto
from hoteis.serializers import HotelSerializer, CategoriaSerializer, ReservaSerializer

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    authentication_classes = []
    permission_classes = [ReadOnly]

class CategoriaQuartoViewSet(viewsets.ModelViewSet):
    queryset = CategoriaQuarto.objects.all()
    serializer_class = CategoriaSerializer
    authentication_classes = []
    permission_classes = [ReadOnly]

    def list(self, request):
        queryset = self.queryset
        booked = Reserva.objects.filter(data_inicio__lte=request.inicio, data_fim__gte=request.fim).select_related('quarto').filter(hotel=request.hotel).values('categoria').distinct
        intersection = []

        for categoria in queryset:
            if not categoria in booked:
                intersection.append(categoria)
                
        serializer = CategoriaSerializer(intersection, many=True)
        return Response(serializer.data)

class ReservaViewSet(viewsets.ModelViewSet):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer
    authentication_classes = []
    permission_classes = []