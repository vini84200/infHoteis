
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter

from hoteis.views import HotelViewSet, ReservaViewSet, EspacoViewSet, EspacoReservaViewSet, CategoriaQuartoViewSet, \
    PerfilViewset

from django.conf.urls.static import static
from infHoteis import settings

router = DefaultRouter()

router.register('hoteis', HotelViewSet)
router.register('reservas', ReservaViewSet)
router.register('espacoReservas', EspacoReservaViewSet)

urlpatterns = [
    re_path('^espacoshotel/(?P<hotel>.+)/$', EspacoViewSet.as_view({'get': 'list'})),
    re_path('^categoriaQuarto/(?P<id_hotel>.+)/(?P<data_inicio>.+)/(?P<data_fim>.+)$', CategoriaQuartoViewSet.as_view({'get': 'list'})),
    re_path('^perfil/$', PerfilViewset.as_view()),
    path('', include(router.urls))
]

