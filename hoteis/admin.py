from django.contrib import admin

from hoteis.models import Hotel, Beneficio, Quarto, CategoriaQuarto, EspacoHotel

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