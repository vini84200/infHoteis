import datetime

from django.contrib.auth.models import User
from django.db import models


# Create your models here.

class Hotel(models.Model):
    nome = models.CharField(max_length=120)
    descricao = models.CharField(max_length=1024)
    endereco = models.CharField(max_length=1024)
    # TODO: FOTO
    # TODO: Posicao no mapa
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

class EspacoHotel(models.Model):
    nome = models.CharField(max_length=120,null=False)
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, null=False)
    autorizacao = models.BooleanField(default=False)
    descricao = models.TextField(null=True)
    def __str__(self):
        return self.nome

class EspacoHotelReserva(models.Model):
    idEspaco = models.ForeignKey(EspacoHotel, on_delete=models.CASCADE, null=False)
    dataInicial = models.DateTimeField(null=False)
    duracao = models.DurationField(null=False)
    def __str__(self):
        return self.idEspaco + self.dataInicial

class Reserva(models.Model):
    quarto = models.ForeignKey(Quarto, on_delete=models.CASCADE, null=False)
    cliente = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    data_inicio = models.DateField()
    data_fim = models.DateField()
    hospedes = models.IntegerField()
    preco = models.DecimalField(decimal_places=2, max_digits=10)
    pago = models.BooleanField(default=False)
    checkin = models.BooleanField(default=False)
    checkout = models.BooleanField(default=False)
    cancelada = models.BooleanField(default=False)

    def can_cancel(self):
        return not self.checkin and not self.cancelada and (self.data_inicio - datetime.date.today()).days >= 2

    def __str__(self):
        return self.quarto.__str__() + " - " + self.data_inicio.__str__() + " - " + self.data_fim.__str__()
