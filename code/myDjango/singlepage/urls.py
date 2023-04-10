from django.urls import path, include
from .views.AccountView import RegisterView, LogoutView, EditNameView, EditEmailAddressView, EditPasswordView, LoginView
from .views.ReviewView import RetrieveReviewView, AddReviewView
from .views.ToiletView import AddToiletView, AddFavouriteToiletView, RetrieveFavouriteToiletView, RemoveFavouriteToiletView
from .views.SettingsView import UpdateToiletView, RetrieveToiletView, RetrieveTrafficView
from . import view

urlpatterns = [
    path("", view.index, name='index'),
    path("accounts/login/", LoginView.as_view(), name='login'),
    path("accounts/register/", RegisterView.as_view(), name='register'),
    path("accounts/logout/", LogoutView.as_view(), name='logout'),
    path("accounts/editname/", EditNameView.as_view(), name='editName'),
    path("accounts/editemail/", EditEmailAddressView.as_view(), name='editEmailAddress'),
    path("accounts/editpassword/", EditPasswordView.as_view(), name='editPassword'),
    path("toilets/create/", AddToiletView.as_view(), name='addToilet'),
    path("toilets/addfavourite/", AddFavouriteToiletView.as_view(), name='addFavouriteToilet'),
    path("toilets/retrievefavourite/", RetrieveFavouriteToiletView.as_view(), name='retrieveFavouriteToilet'),
    path("toilets/removefavourite/", RemoveFavouriteToiletView.as_view(), name='removeFavouriteToilet'),
    path("reviews/create/", AddReviewView.as_view(), name='addReview'),
    path("settings/updatetoilet/", UpdateToiletView.as_view(), name='updateToilet'),
    path("settings/retrievetoilet/", RetrieveToiletView.as_view(), name='retrieveToilet'),
    path("settings/retrievetraffic/", RetrieveTrafficView.as_view(), name='retrieveTraffic'),
]