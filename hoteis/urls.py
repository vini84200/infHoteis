from django.conf.urls.static import static
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from hoteis.views import HotelViewSet, ReservaViewSet, CategoriaQuartoViewSet
from infHoteis import settings

router = DefaultRouter()

router.register('hoteis', HotelViewSet)
router.register('reservas', ReservaViewSet)

urlpatterns = [
    re_path('^espacoshotel/(?P<id_hotel>.+)/(?P<data_inicio>.+)/(?P<data_fim>.+)$', CategoriaQuartoViewSet.as_view({'get': 'list'})),
    path('', include(router.urls))
]