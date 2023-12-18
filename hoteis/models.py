from django.db import models


# Create your models here.

class Hotel(models.Model):
    nome = models.CharField(max_length=120)
    descricao = models.CharField(max_length=1024)
    endereco = models.CharField(max_length=1024)
    # FOTO
    avaliacao = models.FloatField()

    def __str__(self):
        return self.nome


class Beneficio(models.Model):
    nome = models.CharField(max_length=120)

    def __str__(self):
        return self.nome


class CategoriaQuarto(models.Model):
    nome = models.CharField(max_length=120)
    descricao = models.CharField(max_length=1024)
    beneficios = models.ManyToManyField(Beneficio)
    preco = models.DecimalField(decimal_places=2, max_digits=10)
    hospedes = models.IntegerField()

    def __str__(self):
        return self.nome


class Quarto(models.Model):
    numero = models.IntegerField()
    categoria = models.ForeignKey(CategoriaQuarto, on_delete=models.DO_NOTHING, null=True)
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, null=False)

    def __str__(self):
        return self.numero.__str__()
