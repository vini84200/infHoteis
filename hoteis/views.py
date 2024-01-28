from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import BasePermission, SAFE_METHODS

from hoteis.models import Hotel, CategoriaQuarto
from hoteis.serializers import HotelSerializer, CategoriaSerializer

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    authentication_classes = []
    permission_classes = [ReadOnly]

class CategoriaQuartoViewSet(viewsets.ModelViewSet):
    queryset = CategoriaQuarto.objects.all()
    serializer_class = CategoriaSerializer
    authentication_classes = []
    permission_classes = [ReadOnly]