import faker.providers.address.pt_BR
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from faker import Faker

from hoteis.models import Hotel, CategoriaQuarto, Beneficio, Quarto, Reserva
from hoteis.utils.progress_bar import progressbar

fake = Faker(['pt_BR', 'en_US'])


def gen_hotel():
    endereco = fake.address()
    nome = fake.city() + " Hotel"
    return dict(
        nome=nome,
        descricao=fake.sentence(),
        endereco=endereco,
        avaliacao=fake.random_int(0, 10)
    )


class Command(BaseCommand):
    help = 'Create the data.'

    def handle(self, *args, **options):
        for i in range(0, 100):
            hotel = gen_hotel()
            hotel = Hotel(**hotel)
            hotel.save()
