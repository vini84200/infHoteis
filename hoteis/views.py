import datetime

from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.response import Response

from hoteis.models import Hotel, Reserva, Quarto
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
    authentication_classes = []
    permission_classes = [ReservaPermission]

    def create(self, request, *args, **kwargs):
        request.data['cliente'] = request.user.id
        # Verificar se não está no passado
        if datetime.date.today() > datetime.datetime.strptime(request.data['data_inicio'], '%Y-%m-%d').date():
            return Response({'detail': 'Data de início no passado'}, status=status.HTTP_400_BAD_REQUEST)
        # Verificar se o fim é depois do início
        if datetime.datetime.strptime(request.data['data_inicio'], '%Y-%m-%d').date() >= datetime.datetime.strptime(
                request.data['data_fim'], '%Y-%m-%d').date():
            return Response({'detail': 'Data de fim antes da data de início'}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar se quarto está disponível
        # Isso é feito verificando se existe alguma reserva que começa antes do fim e termina depois do início
        if Reserva.objects.filter(quarto=request.data['quarto'], data_inicio__lte=request.data['data_fim'],
                                  data_fim__gte=request.data['data_inicio'], cancelada=False).exists():
            return Response({'detail': 'Quarto não disponível'}, status=status.HTTP_400_BAD_REQUEST)

        # Calcular preço
        quarto = Quarto.objects.get(id=request.data['quarto'])
        # request.data['quarto'] = {'id': quarto.id}
        request.data['hospedes'] = quarto.categoria.hospedes
        duracao = (datetime.datetime.strptime(request.data['data_fim'], '%Y-%m-%d').date() - datetime.datetime.strptime(
            request.data['data_inicio'], '%Y-%m-%d').date()).days
        request.data['preco'] = quarto.categoria.preco * duracao

        request.data['pago'] = False
        request.data['checkin'] = False
        request.data['checkout'] = False
        request.data['cancelada'] = False

        return super().create(request, *args, **kwargs)

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