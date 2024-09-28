from rest_framework import serializers
from .models import *


# items
class DrinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drink
        fields = "__all__"


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = "__all__"


class MerchandiseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Merchandise
        fields = "__all__"


class CoffeeAtHomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoffeeAtHome
        fields = "__all__"


class ReadyToEatSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReadyToEat
        fields = "__all__"
