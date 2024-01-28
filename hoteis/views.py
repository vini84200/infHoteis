from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import BasePermission, SAFE_METHODS

from hoteis.models import Hotel
from hoteis.serializers import HotelSerializer


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    authentication_classes = []
    permission_classes = [ReadOnly]
