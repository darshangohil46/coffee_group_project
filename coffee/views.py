from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    DrinkSerializer,
    FoodSerializer,
    MerchandiseSerializer,
    CoffeeAtHomeSerializer,
    ReadyToEatSerializer,
)

from django.contrib.auth.models import User
from django.views import View
from django.utils.decorators import method_decorator

import json
from collections import Counter

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# import models
from .models import (
    Drink,
    Food,
    Merchandise,
    CoffeeAtHome,
    ReadyToEat,
    CoffeeCart,
    Order,
)

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required


from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.decorators import api_view


# Create your views here.
# sample api
class SampleAPIView(APIView):
    x = "http://127.0.0.1:8000/"

    def get(self, request):
        data = {
            "drink-item-api": f"{self.x}api/drink/",
            "food-item-api": f"{self.x}api/food/",
            "merchandise-item-api": f"{self.x}api/merchandise/",
            "coffee-at-home-item-api": f"{self.x}api/coffee-at-home/",
            "ready-toeat-item-api": f"{self.x}api/ready-to-eat/",
            "bestseller-item-api": f"{self.x}api/bestseller/",
        }
        return Response(data)


# all items ------------------------------------------------


# drinks
class DrinkListCreateAPIView(APIView):
    def get(self, request):
        items = Drink.objects.all()
        serializer = DrinkSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = DrinkSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# food
class FoodListCreateAPIView(APIView):
    def get(self, request):
        items = Food.objects.all()
        serializer = FoodSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = FoodSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Merchandise
class MerchandiseListCreateAPIView(APIView):
    def get(self, request):
        items = Merchandise.objects.all()
        serializer = MerchandiseSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = MerchandiseSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Coffee At Home
class CoffeeAtHomeListCreateAPIView(APIView):
    def get(self, request):
        items = CoffeeAtHome.objects.all()
        serializer = CoffeeAtHomeSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CoffeeAtHomeSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Ready to Eat
class ReadytoEatListCreateAPIView(APIView):
    def get(self, request):
        items = ReadyToEat.objects.all()
        serializer = ReadyToEatSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ReadyToEatSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt  # Disable CSRF for API requests, you can set up CSRF tokens instead for security.
def add_to_cart(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user = User.objects.get(id=data["user_id"])

            cart = CoffeeCart.objects.create(
                user=user,
                cart_details=data.get("cart_details"),
            )
            print(cart)

            return JsonResponse(
                {"message": "Item added to cart successfully!"}, status=201
            )
        except User.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def remove_item_from_cart(request):
    if request.method == "POST":
        try:
            # user = request.user
            user = 1  # for now
            cart_item = CoffeeCart.objects.all()
            dataa = json.loads(request.body)
            if dataa["res"]:
                for i in cart_item:
                    data = i.cart_details
                    if data["title"] == dataa["Itemtitle"]:
                        i.delete()
            else:
                for i in cart_item:
                    data = i.cart_details
                    if data["title"] == dataa["Itemtitle"]:
                        i.delete()
                        break
            return JsonResponse(
                {"message": "Item removed from cart successfully."}, status=200
            )

        except CoffeeCart.DoesNotExist:
            return JsonResponse({"error": "Item not found in cart."}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        body = json.loads(request.body)
        username = body.get("username")
        password = body.get("password")

        print(username, password)

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"message": "Login successful"}, status=200)
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def signup_view(request):
    if request.method == "POST":
        try:
            # Parse the incoming data
            data = json.loads(request.body)
            username = data.get("username")
            pass1 = data.get("pass1")
            password = data.get("password")

            if not username or not pass1 or not password:
                return JsonResponse({"error": "All fields are required."}, status=400)

            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "Username already taken."}, status=400)
            if pass1 != password:
                return JsonResponse(
                    {"error": "Both passwords are different"}, status=400
                )
            user = User.objects.create_user(username=username, password=password)
            user.save()
            return JsonResponse({"message": "Account created successfully"}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
    else:
        return JsonResponse({"error": "Only POST method is allowed"}, status=405)


@csrf_exempt
def logout_view(request):
    if request.user.is_authenticated:
        logout(request)
        response = JsonResponse({"message": "Logout Done"}, status=200)
    return JsonResponse({"error": "User is not authenticated"}, status=405)


@csrf_exempt
def user_authentication(request):
    if request.user.is_authenticated:
        try:
            print(request.user)
            user = User.objects.get(username=request.user)
            print(user)

            cart = CoffeeCart.objects.filter(user=user)
            cart_data = (
                [
                    {
                        "id": item.id,
                        "cart_details": item.cart_details,
                        "time": item.added_time,
                    }
                    for item in cart
                ]
                if cart.exists()
                else None
            )
            user_data = {
                "id": user.id,
                "username": user.username,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "email": user.email,
                "cart": cart_data,
            }

            return JsonResponse(
                {"message": "Authentication successful", "user": user_data},
                status=200,
            )

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def place_order(request):
    if request.method == "POST":
        user = request.user
        data = json.loads(request.body)

        dis = float(data.get("discount"))

        cart = CoffeeCart.objects.filter(user=user)
        print(cart)
        cart_items = [(item.cart_details) for item in cart]
        total_price = sum(float(item["price"]) for item in cart_items)

        total_price = total_price * dis
        print(total_price)
        # delivery charge
        total_price += 100

        order = Order.objects.create(
            user=user, cart_items=cart_items, total_price=total_price
        )

        for item in cart:
            item.delete()

        return JsonResponse(
            {"message": "Order placed successfully", "order_id": order.id}, status=201
        )

    return JsonResponse({"error": "Invalid request method"}, status=405)


@api_view(["GET"])
def get_user_orders(request):
    if request.user.is_authenticated:
        orders = Order.objects.filter(user=request.user).values(
            "id", "cart_items", "total_price", "order_time"
        )
        orders_list = list(orders)

        return JsonResponse(
            {"orders": orders_list, "user": request.user.id}, status=200
        )
    return JsonResponse({"message": "not authenticated"}, status=400)


@csrf_exempt
def delete_account(request):
    if request.method == "POST":
        try:
            user = request.user
            user.delete()
            logout(request)
            return Response(
                {"message": "Account deleted successfully"}, status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"error": "Inavlid method"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def bestseller(request):
    orders = Order.objects.all()
    item_counter = Counter()

    for order in orders:
        cart_items = order.cart_items
        for item in cart_items:
            item_counter[
                (item["title"], item["price"], item["img"], item["description"])
            ] += 1  # Count each item by title

    most_common_items = item_counter.most_common(10)  # Change number as needed

    response_data = [
        {
            "title": item[0],
            "price": item[1],
            "img": item[2],
            "description": item[3],
            "count": count,
        }
        for item, count in most_common_items
    ]

    return Response(response_data)
