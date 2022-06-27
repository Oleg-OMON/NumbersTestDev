from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Orders
from .serializers import OrdersSerializers
from django.core.paginator import Paginator





class OrdersApiViews( ModelViewSet):
    queryset = Orders.objects.all()
    serializer_class = OrdersSerializers

   



