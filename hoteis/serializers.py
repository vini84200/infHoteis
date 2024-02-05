import datetime
from logging import info

from django.contrib.auth.models import User

from hoteis.models import Hotel, Quarto, Beneficio, CategoriaQuarto, Reserva, EspacoHotel, EspacoHotelReserva
from rest_framework import serializers
from rest_framework.validators import ValidationError


class BeneficioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beneficio
        fields = ['nome']


class CategoriaSerializer(serializers.ModelSerializer):
    beneficios = BeneficioSerializer(many=True)

    class Meta:
        model = CategoriaQuarto
        fields = ['nome', 'descricao', 'beneficios', 'preco', 'hospedes', 'imagem', 'id']


class QuartoSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer()

    class Meta:
        model = Quarto
        fields = ['numero', 'categoria', 'hotel']


class EspacoHotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = EspacoHotel
        fields = ['id', 'nome', 'descricao', 'hotel', 'autorizacao']


class EspacoHotelReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EspacoHotelReserva
        fields = ['id', 'idEspaco', 'cliente', 'data_inicio', 'data_fim', 'autorizada']


class HotelSerializer(serializers.ModelSerializer):
    # quarto_set = QuartoSerializer(many=True)

    class Meta:
        model = Hotel
        fields = ['id', 'nome', 'descricao', 'estado', 'cidade', 'rua', 'imagem', 'avaliacao']


class ReservaRequestSerializer(serializers.Serializer):
    class QuartoReservaSerializer(serializers.Serializer):
        tipo = serializers.PrimaryKeyRelatedField(queryset=CategoriaQuarto.objects.all())
        qtde = serializers.IntegerField(
            min_value=1,
        )

    reserva = serializers.ListField(child=QuartoReservaSerializer(), min_length=1)
    hotel = serializers.PrimaryKeyRelatedField(queryset=Hotel.objects.all())
    # reserva = QuartoReservaSerializer(many=True)
    data_inicio = serializers.DateField()
    data_fim = serializers.DateField()
    cliente = serializers.HiddenField(default=serializers.CurrentUserDefault())

    def validate(self, attrs):
        if attrs['data_inicio'] > attrs['data_fim']:
            raise ValidationError('Data de início maior que a data de fim')
        if attrs['data_inicio'] < datetime.date.today():
            raise ValidationError('Data de início no passado')
        if attrs['data_inicio'] == attrs['data_fim']:
            raise ValidationError('O período da reserva deve ser maior que 1 dia')

        for reserva in attrs['reserva']:
            tipo_quarto = reserva['tipo']
            qtde = reserva['qtde']
            hotel = attrs['hotel']

            disponiveis = hotel.disponiveis_em(attrs['data_inicio'], attrs['data_fim'], tipo_quarto)

            if qtde > len(disponiveis):
                raise ValidationError(f'Quarto {tipo_quarto.nome} não tem {qtde} disponíveis')

        return attrs

    def create(self, validated_data):
        print("Criando reserva")
        reservas = []
        try:
            for reserva in validated_data['reserva']:
                tipo_quarto = reserva['tipo']
                qtde = reserva['qtde']
                hotel = validated_data['hotel']
                novas = hotel.reservar(
                    validated_data['data_inicio'],
                    validated_data['data_fim'],
                    tipo_quarto,
                    qtde,
                    validated_data['cliente']
                )
                reservas.extend(novas)
        except ValueError as e:
            for reserva in reservas:
                # Deletar as reservas já feitas
                info(f'Deletando reserva {reserva}')
                reserva.delete()
            raise ValidationError(e)
        return reservas


class ReservaSerializer(serializers.ModelSerializer):
    quarto = QuartoSerializer(read_only=True)
    # quarto_categoria = CategoriaSerializer(source='quarto.categoria', read_only=True)
    hotel = HotelSerializer(source='quarto.hotel', read_only=True)
    cliente = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Reserva
        fields = ['id', 'quarto', 'cliente', 'data_inicio', 'data_fim', 'preco', 'pago', 'checkin',
                  'checkout', 'cancelada', 'hotel']


class UsuarioPerfilSerializer(serializers.ModelSerializer):
    data_nascimento = serializers.DateField(source='perfil.data_nascimento')
    cpf = serializers.CharField(source='perfil.cpf')
    telefone = serializers.CharField(source='perfil.telefone')

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'data_nascimento', 'cpf', 'telefone']
        #   The username and email should be read-only, as they are set by the User model, not the Profile model.
        read_only_fields = ['username']

    def update(self, instance, validated_data):
        perfil_data = validated_data.pop('perfil', {})
        instance = super().update(instance, validated_data)
        perfil = instance.perfil
        perfil_data = {k: v for k, v in perfil_data.items() if v is not None}
        for attr, value in perfil_data.items():
            setattr(perfil, attr, value)
        perfil.save()
        return instance
