from django.contrib import admin

from hoteis.models import Hotel, Beneficio, Quarto, CategoriaQuarto

admin.site.register(Hotel)
admin.site.register(Beneficio)
admin.site.register(Quarto)
admin.site.register(CategoriaQuarto)

