from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter

from hoteis.views import HotelViewSet, ReservaViewSet, EspacoViewSet

router = DefaultRouter()

router.register('hoteis', HotelViewSet)
router.register('reservas', ReservaViewSet)

urlpatterns = [
    re_path('^espacoshotel/(?P<hotel>.+)/$', EspacoViewSet.as_view({'get': 'list'})),
    path('', include(router.urls))
]
