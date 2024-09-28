from django.urls import path
from .views import SampleAPIView
from .views import (
    DrinkListCreateAPIView,
    FoodListCreateAPIView,
    MerchandiseListCreateAPIView,
    CoffeeAtHomeListCreateAPIView,
    ReadytoEatListCreateAPIView,
    add_to_cart,
    user_authentication,
    remove_item_from_cart,
    login_view,
    signup_view,
    logout_view,
    place_order,
    get_user_orders,
    delete_account,
    bestseller,
)

# for fetch data
urlpatterns = [
    path("drink/", DrinkListCreateAPIView.as_view(), name="drinks"),
    path("food/", FoodListCreateAPIView.as_view(), name="food"),
    path("merchandise/", MerchandiseListCreateAPIView.as_view(), name="merchandise"),
    path(
        "coffee-at-home/",
        CoffeeAtHomeListCreateAPIView.as_view(),
        name="coffee-at-home",
    ),
    path("ready-to-eat/", ReadytoEatListCreateAPIView.as_view(), name="ready-to-eat"),
    path("bestseller/", bestseller, name="most-repeated-items"),
]


# for cart
urlpatterns += [
    path("coffee-cart/", add_to_cart, name="coffee-cart"),
    path("user-auth/", user_authentication, name="user_authentication"),
    path(
        "cart/remove/",
        remove_item_from_cart,
        name="remove-item-from-cart",
    ),
    path("place-order/", place_order, name="place_order"),
    path("user-orders/", get_user_orders, name="user-orders"),
    path("delete-account/", delete_account, name="delete-account"),
]

urlpatterns += [
    path("login/", login_view, name="login_api"),
    path("signup/", signup_view, name="signup"),
    path("logout/", logout_view, name="logout"),
]
