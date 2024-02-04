
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter

from hoteis.views import HotelViewSet, ReservaViewSet, EspacoViewSet, EspacoReservaViewSet

from django.conf.urls.static import static
from infHoteis import settings

router = DefaultRouter()

router.register('hoteis', HotelViewSet)
router.register('reservas', ReservaViewSet)
router.register('espacoReservas', EspacoReservaViewSet)

urlpatterns = [
    re_path('^espacoshotel/(?P<hotel>.+)/$', EspacoViewSet.as_view({'get': 'list'})),
    path('', include(router.urls))
]

