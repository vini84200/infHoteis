from django.contrib import admin

from hoteis.models import Hotel, Beneficio, Quarto, CategoriaQuarto, Reserva


class QuartoInline(admin.TabularInline):
    model = Quarto


class HotelAdmin(admin.ModelAdmin):
    inlines = [
        QuartoInline,
    ]


admin.site.register(Hotel, HotelAdmin)
admin.site.register(Beneficio)
admin.site.register(Quarto)
admin.site.register(CategoriaQuarto)


@admin.register(Reserva)
class ReservaAdmin(admin.ModelAdmin):
    list_display = ['cliente', 'quarto', 'data_inicio', 'data_fim', 'hospedes', 'preco', 'pago', 'checkin', 'checkout',
                    'cancelada']
