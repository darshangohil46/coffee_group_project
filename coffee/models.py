from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.


# item data
class Drink(models.Model):
    img = models.URLField(max_length=500, blank=True)
    title = models.CharField(max_length=200, blank=True)
    text = models.TextField(blank=True)
    kcal = models.CharField(blank=True, null=True, max_length=150)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return self.title if self.title else "Unnamed Item"


class Food(models.Model):
    img = models.URLField(max_length=500, blank=True)
    title = models.CharField(max_length=200, blank=True)
    text = models.TextField(blank=True)
    kcal = models.CharField(blank=True, null=True, max_length=150)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    nonVeg = models.BooleanField(default=False)

    def __str__(self):
        return self.title if self.title else "Unnamed Item"


class Merchandise(models.Model):
    img = models.URLField(max_length=500, blank=True)
    title = models.CharField(max_length=200, blank=True)
    text = models.TextField(blank=True)
    kcal = models.CharField(blank=True, null=True, max_length=150)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return self.title if self.title else "Unnamed Item"


class CoffeeAtHome(models.Model):
    img = models.URLField(max_length=500, blank=True)
    title = models.CharField(max_length=200, blank=True)
    text = models.TextField(blank=True)
    kcal = models.CharField(blank=True, null=True, max_length=150)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return self.title if self.title else "Unnamed Item"


class ReadyToEat(models.Model):
    img = models.URLField(max_length=500, blank=True)
    title = models.CharField(max_length=200, blank=True)
    text = models.TextField(blank=True)
    kcal = models.CharField(blank=True, null=True, max_length=150)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    nonVeg = models.BooleanField(default=False)

    def __str__(self):
        return self.title if self.title else "Unnamed Item"


# item data end


class CoffeeCart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cart_details = models.JSONField()
    added_time = models.DateTimeField(default=timezone.now)

    def __str__(self):
        title = self.cart_details.get("title")
        return f"Cart for {self.user.username}: {title}"


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cart_items = models.JSONField()  # To store cart items as JSON
    order_time = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"
