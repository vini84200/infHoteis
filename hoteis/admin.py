from django.contrib import admin

from hoteis.models import Hotel, Beneficio, Quarto, CategoriaQuarto, Reserva, EspacoHotel, EspacoHotelReserva, Perfil


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
admin.site.register(EspacoHotel)
admin.site.register(Perfil)

@admin.action(description="Autorizar pedidos selecionados")
def autorizar(modeladmin, request, queryset):
    queryset.update(autorizada=True)


@admin.register(EspacoHotelReserva)
class ReservaAdmin(admin.ModelAdmin):
    list_display = ['id', 'idEspaco', 'cliente', 'data_inicio', 'data_fim', 'autorizada']
    list_filter = ['autorizada']
    actions = [autorizar]


@admin.register(Reserva)
class ReservaAdmin(admin.ModelAdmin):
    list_display = ['cliente', 'quarto', 'data_inicio', 'data_fim', 'preco', 'pago', 'checkin', 'checkout',
                    'cancelada']
