from django.urls import path, include
from rest_framework.routers import DefaultRouter

from hoteis.views import HotelViewSet, ReservaViewSet, CategoriaQuartoViewSet

router = DefaultRouter()

router.register('hoteis', HotelViewSet)
router.register('categoria', CategoriaQuartoViewSet)
router.register('reservas', ReservaViewSet)

urlpatterns = [
    path('', include(router.urls))
]