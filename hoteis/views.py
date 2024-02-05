import datetime

from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.response import Response
from rest_framework.decorators import action

from hoteis.models import Hotel, Reserva, Quarto, CategoriaQuarto, EspacoHotel, EspacoHotelReserva
from hoteis.serializers import HotelSerializer, ReservaSerializer, ReservaRequestSerializer, QuartoSerializer, CategoriaSerializer, EspacoHotelSerializer, EspacoHotelReservaSerializer

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

class HotelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    authentication_classes = []

    @action(detail=False, methods=['get'], url_path='hotel/(?P<nome>.+)')
    def buscaPorNome(self, request, nome, *args, **kwargs):
        hotel = Hotel.objects.filter(nome=nome)
        if not hotel:
            return Response({'detail': 'Hotel named [' + nome + '] not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(HotelSerializer(hotel[0]).data)
    
    @action(detail=True, methods=['get'])
    def tipos(self, request, pk=None, *args, **kwargs):
        hotel = self.get_object()
        tipos = CategoriaQuarto.objects.filter(quarto__hotel=hotel).distinct()

        return Response(CategoriaSerializer(tipos, many=True, context={'request': request}).data)

class CategoriaQuartoViewSet(viewsets.ModelViewSet):
    queryset = CategoriaQuarto.objects.all()
    serializer_class = [CategoriaSerializer]
    authentication_classes = []
    permission_classes = [ReadOnly]

    def list(self, request, *args, **kwargs):        
        if datetime.date.today() > datetime.datetime.strptime(self.kwargs['data_inicio'], '%Y-%m-%d').date():
            return Response({'detail': 'Data de início no passado'}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar se o fim é depois do início
        if datetime.datetime.strptime(self.kwargs['data_inicio'], '%Y-%m-%d') > datetime.datetime.strptime(
                self.kwargs['data_fim'], '%Y-%m-%d'):
            return Response({'detail': 'Data de fim antes da data de início'}, status=status.HTTP_400_BAD_REQUEST)
        
        quartos = Quarto.objects.all().filter(hotel=self.kwargs['id_hotel'])
        quartos_ids = quartos.values_list('id', flat=True)
        quartos_reservados_ids = Reserva.objects.filter(data_inicio__lte=self.kwargs['data_fim'], data_fim__gte=self.kwargs['data_inicio'], cancelada=False).values_list('quarto', flat=True)
        import sys
        print(len(quartos_reservados_ids), sys.stderr)
        print(self.kwargs['data_inicio'], sys.stderr)
        print(Reserva.objects.filter(data_fim__lte=self.kwargs['data_fim']), sys.stderr)
        quartos_liberados = list(set(quartos_ids).difference(quartos_reservados_ids))

        categorias = []
        for quarto in quartos:
            if quarto.id in quartos_liberados:
                categorias.append(quarto.categoria)
        categorias = list(set(categorias))

        serializer = CategoriaSerializer(categorias, many=True)
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
    
class ReservaPermissionAll(BasePermission):
    def has_permission(self, request, view):
        return True
    def has_object_permission(self, request, view, obj):
        return True

class EspacoViewSet(viewsets.ModelViewSet):
    queryset = EspacoHotel.objects.all()
    serializer_class = EspacoHotelSerializer
    permission_classes = [ReadOnly]

    def list(self, request, *args, **kwargs):
        hotel = self.kwargs['hotel']
        queryset = EspacoHotel.objects.filter(hotel=hotel)
        serializer = EspacoHotelSerializer(queryset, many=True)
        return Response(serializer.data)

import sys
class EspacoReservaPermission(BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False         
        if not request.data:
            return True
        espaco = EspacoHotel.objects.filter(id=request.data['idEspaco'])[0]
        reservas = Reserva.objects.filter(cliente=request.data['cliente'], data_inicio__lte=request.data['data_inicio'][0:10], data_fim__gte=request.data['data_fim'][0:10])
        valid = False
        print(request.data['cliente'], sys.stderr)
        print(str(request.data['data_inicio'][0:10]), sys.stderr)
        print(Reserva.objects.all()[0].cliente.id, sys.stderr)
        for reserva in reservas:
            quarto = Quarto.objects.filter(id=reserva.quarto.id)[0]       
            if quarto.hotel == espaco.hotel:
                if reserva.pago:
                    valid = True
        return valid

    def has_object_permission(self, request, view, obj):
        if request.user.is_staff:
            return True
        if request.method in SAFE_METHODS:
            return True
        if request.method == 'PUT':
            return False
        return obj.cliente == request.user.id
            

class EspacoReservaViewSet(viewsets.ModelViewSet):
    queryset = EspacoHotelReserva.objects.all()
    serializer_class = EspacoHotelReservaSerializer
    permission_classes = [EspacoReservaPermission]

    def create(self, request, *args, **kwargs):
        # Verificar se não está no passado
        if datetime.date.today() > datetime.datetime.strptime(request.data['data_inicio'], '%Y-%m-%d %H:%M:%S').date():
            return Response({'detail': 'Data de início no passado'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Verificar se o fim é depois do início
        if datetime.datetime.strptime(request.data['data_inicio'], '%Y-%m-%d %H:%M:%S') >= datetime.datetime.strptime(
                request.data['data_fim'], '%Y-%m-%d %H:%M:%S'):
            return Response({'detail': 'Data de fim antes da data de início'}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar se Espaço está disponível
        # Isso é feito verificando se existe alguma reserva que começa antes do fim e termina depois do início
        if EspacoHotelReserva.objects.filter(idEspaco=request.data['idEspaco'], data_inicio__lte=request.data['data_fim'],
                                  data_fim__gte=request.data['data_inicio'], autorizada=True).exists():
            return Response({'detail': 'Espaço não disponível'}, status=status.HTTP_400_BAD_REQUEST)
        duracao = (datetime.datetime.strptime(request.data['data_fim'], '%Y-%m-%d %H:%M:%S') - datetime.datetime.strptime(
            request.data['data_inicio'], '%Y-%m-%d %H:%M:%S')).seconds 
        if duracao > 8 * 60 * 60:
            return Response({'detail': 'Reservas de Espaço não podem ter duração maior que 8 horas'}, status=status.HTTP_400_BAD_REQUEST)
        
        espaco = EspacoHotel.objects.filter(id=request.data['idEspaco'])[0]
 
        request.data['autorizada'] = not espaco.autorizacao


    
        return super().create(request, *args, **kwargs)

    def get_queryset(self):
        return EspacoHotelReserva.objects.filter(cliente=self.request.user)




class ReservaViewSet(viewsets.ModelViewSet):
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer
    authentication_classes = []
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
        return Reserva.objects.filter(cliente=self.request.user.id)
    
    @action(detail=True, methods=['get'])
    def disponibilidade(self, request, pk):
        data_inicio = request.query_params.get('data_inicio')
        data_fim = request.query_params.get('data_fim')
        categoria = request.query_params.get('categoria')

        if datetime.date.today() > datetime.datetime.strptime(data_inicio, '%Y-%m-%d').date():
            return Response({'detail': 'Data de início no passado'}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar se o fim é depois do início
        if datetime.datetime.strptime(data_inicio, '%Y-%m-%d') > datetime.datetime.strptime(
                data_fim, '%Y-%m-%d'):
            return Response({'detail': 'Data de fim antes da data de início'}, status=status.HTTP_400_BAD_REQUEST)

        quartos = Quarto.objects.all().filter(hotel=pk)
        quartos_ids = quartos.values_list('id', flat=True)
        quartos_reservados_ids = Reserva.objects.filter(data_inicio__lte=data_fim, data_fim__gte=data_inicio, cancelada=False).values_list('quarto', flat=True)
        quartos_liberados = list(set(quartos_ids).difference(quartos_reservados_ids))

        disponiveis = []
        for quarto in quartos:
            if quarto.pk in quartos_liberados and quarto.categoria.pk == int(categoria):
                disponiveis.append(quarto)
        
        serializer = QuartoSerializer(disponiveis, many=True)
        return Response(serializer.data)
