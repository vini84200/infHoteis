# Generated by Django 4.2.8 on 2024-01-28 18:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hoteis', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Reserva',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data_inicio', models.DateField()),
                ('data_fim', models.DateField()),
                ('hospedes', models.IntegerField()),
                ('preco', models.DecimalField(decimal_places=2, max_digits=10)),
                ('pago', models.BooleanField(default=False)),
                ('checkin', models.BooleanField(default=False)),
                ('checkout', models.BooleanField(default=False)),
                ('cancelada', models.BooleanField(default=False)),
                ('quarto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hoteis.quarto')),
            ],
        ),
    ]
