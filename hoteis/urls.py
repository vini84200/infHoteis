from django.conf.urls.static import static
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from hoteis.views import HotelViewSet, ReservaViewSet
from infHoteis import settings

router = DefaultRouter()

router.register('hoteis', HotelViewSet)
router.register('reservas', ReservaViewSet)

urlpatterns = [
                  path('', include(router.urls))
              ]
