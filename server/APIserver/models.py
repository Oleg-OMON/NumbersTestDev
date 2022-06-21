from django.db import models


class Orders(models.Model):
    order_id = models.IntegerField(primary_key=True, default='')
    price_in_dollar = models.IntegerField()
    price_in_rub = models.IntegerField()
    date_delivery = models.CharField(max_length=12)
