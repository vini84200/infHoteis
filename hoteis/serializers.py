from rest_framework import serializers

from hoteis.models import Hotel, Quarto, Beneficio, CategoriaQuarto, Reserva


class BeneficioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beneficio
        fields = ['nome']


class CategoriaSerializer(serializers.ModelSerializer):
    beneficios = BeneficioSerializer(many=True)

    class Meta:
        model = CategoriaQuarto
        fields = ['nome', 'descricao', 'beneficios', 'preco', 'hospedes']


class QuartoSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer()

    class Meta:
        model = Quarto
        fields = ['numero', 'categoria', 'hotel']


class HotelSerializer(serializers.ModelSerializer):
    quarto_set = serializers.SlugRelatedField(many=True, read_only=True, slug_field='numero')

    class Meta:
        model = Hotel
        fields = ['id', 'nome', 'descricao', 'endereco', 'avaliacao', 'quarto_set']


class ReservaSerializer(serializers.ModelSerializer):
    quarto = QuartoSerializer()

    class Meta:
        model = Reserva
        fields = ['__all__']
