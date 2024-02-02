# Generated by Django 4.2.8 on 2024-01-28 18:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('hoteis', '0002_reserva'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='reserva',
            options={'permissions': [('can_checkin', 'Can do checkin'), ('can_checkout', 'Can do checkout'), ('can_cancel', 'Can cancel reservation')]},
        ),
        migrations.AddField(
            model_name='reserva',
            name='cliente',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]