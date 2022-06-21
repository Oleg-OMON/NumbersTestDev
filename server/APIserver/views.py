from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Orders
from .serializers import OrdersSerializers


class OrdersApiViews(ModelViewSet):
    queryset = Orders.objects.all()
    serializer_class = OrdersSerializers


