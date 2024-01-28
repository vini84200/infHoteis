from django.urls import path, include
from rest_framework.routers import DefaultRouter

from hoteis.views import HotelViewSet

router = DefaultRouter()

router.register('hoteis', HotelViewSet)

urlpatterns = [
    path('', include(router.urls))
]
