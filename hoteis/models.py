import datetime
from logging import info

from django.contrib.auth.models import User
from django.db import models


# Create your models here.

class Hotel(models.Model):
    nome = models.CharField(max_length=120)
    descricao = models.CharField(max_length=1024)
    cidade = models.CharField(max_length=1024)
    estado = models.CharField(max_length=1024)
    rua = models.CharField(max_length=1024)
    imagem = models.ImageField(upload_to='hoteis', null=True)
    # TODO: Posicao no mapa
    avaliacao = models.FloatField()

    """Retorna os quartos disponíveis em um hotel para um período e categoria específicos."""

    def disponiveis_em(self, data_inicio, data_fim, categoria):
        reservas = Reserva.objects.filter(quarto__hotel=self, data_inicio__lte=data_fim, data_fim__gte=data_inicio,
                                          quarto__categoria=categoria)
        quartos = self.quarto_set.filter(categoria=categoria)
        disponiveis = []
        for quarto in quartos:
            if quarto not in [reserva.quarto for reserva in reservas]:
                disponiveis.append(quarto)
        return disponiveis

    def reservar(self, data_inicio, data_fim, categoria, quantidade, cliente):
        disponiveis = self.disponiveis_em(data_inicio, data_fim, categoria)
        if len(disponiveis) < quantidade:
            raise ValueError(f'Não há quartos disponíveis para a categoria {categoria.nome} no período especificado')
        reservas = []
        i = 0
        while len(reservas) < quantidade:
            if i >= len(disponiveis):
                # Não há quartos suficientes, deletar as reservas já feitas
                for reserva in reservas:
                    reserva.delete()
                raise ValueError(
                    f'Não há quartos disponíveis para a categoria {categoria.nome} no período especificado')
            r = Reserva()
            r.data_inicio = data_inicio
            r.data_fim = data_fim
            r.quarto = disponiveis[i]
            duracao = (data_fim - data_inicio).days
            r.preco = categoria.preco * duracao
            r.cliente = cliente
            r.save()

            # Checar se a reserva é a única no quarto neste período
            if not len(Reserva.objects.filter(quarto=disponiveis[i], data_inicio__lte=data_fim,
                                              data_fim__gte=data_inicio).all()) == 1:
                # Quarto já reservado por outra pessoa, deletar a reserva
                info(f'Quarto {disponiveis[i]} já reservado')
                r.delete()
            else:
                # Reserva válida
                info(f'Reserva {r} válida')
                reservas.append(r)
                i += 1
        return reservas

    def __str__(self):
        return self.nome

    class Meta:
        ordering = ['cidade', 'rua', 'nome']


class Beneficio(models.Model):
    nome = models.CharField(max_length=120)

    def __str__(self):
        return self.nome


class CategoriaQuarto(models.Model):
    nome = models.CharField(max_length=120)
    descricao = models.CharField(max_length=1024)
    beneficios = models.ManyToManyField(Beneficio)
    preco = models.DecimalField(decimal_places=2, max_digits=10)
    imagem = models.ImageField(upload_to='categorias', null=True)
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
    nome = models.CharField(max_length=120, null=False)
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, null=False)
    autorizacao = models.BooleanField(default=False)
    descricao = models.TextField(null=True)

    def __str__(self):
        return self.nome


class EspacoHotelReserva(models.Model):
    idEspaco = models.ForeignKey(EspacoHotel, on_delete=models.CASCADE, null=False)
    cliente = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    data_inicio = models.DateTimeField(null=False)
    data_fim = models.DateTimeField(null=False)
    autorizada = models.BooleanField(default=False)

    def __str__(self):
        isAuth = "Autorizada" if self.autorizada else "Não autorizada!"
        return 'Reserva ' + isAuth + ' : ' + self.idEspaco.nome + ' de ' + str(self.data_inicio) + ' até ' + str(
            self.data_fim)


class Reserva(models.Model):
    quarto = models.ForeignKey(Quarto, on_delete=models.CASCADE, null=False)
    cliente = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    data_inicio = models.DateField()
    data_fim = models.DateField()
    preco = models.DecimalField(decimal_places=2, max_digits=10)
    pago = models.BooleanField(default=False)
    checkin = models.BooleanField(default=False)
    checkout = models.BooleanField(default=False)
    cancelada = models.BooleanField(default=False)

    def can_cancel(self):
        return not self.checkin and not self.cancelada and (self.data_inicio - datetime.date.today()).days >= 2

    def __str__(self):
        return self.quarto.__str__() + " - " + self.data_inicio.__str__() + " - " + self.data_fim.__str__()


class Perfil(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name='perfil')
    data_nascimento = models.DateField(null=True)
    cpf = models.CharField(max_length=11, null=True)
    telefone = models.CharField(max_length=11, null=True)

    def __str__(self):
        return self.usuario.__str__()


def create_user_profile(instance, created, raw, **kwargs):
    if not created or raw:
        return
    print('Criando perfil para ' + instance.__str__() + '...')
    Perfil.objects.create(usuario=instance)


models.signals.post_save.connect(create_user_profile, sender=User)
