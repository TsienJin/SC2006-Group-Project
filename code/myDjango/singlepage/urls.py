from django.urls import path, include
from .views.AccountView import RegisterView, LogoutView, EditNameView, EditEmailAddressView, EditPasswordView, LoginView
from .views.ReviewView import RetrieveReviewView, AddReviewView
from .views.ToiletView import AddToiletView, AddFavouriteToiletView, RetrieveFavouriteToiletView, RemoveFavouriteToiletView
from .views.SettingsView import UpdateToiletView, RetrieveToiletView, RetrieveTrafficView
from . import view

# TODO: Add versioning for APIS
urlpatterns = [
    path("", view.index, name='index'),
    # path("", include("django_nextjs.urls"), name='home'), 
    path("accounts/login/", LoginView.as_view(), name='login'), # okay
    path("accounts/register/", RegisterView.as_view(), name='register'), # okay
    path("accounts/logout/", LogoutView.as_view(), name='logout'), # okay
    path("accounts/editname/", EditNameView.as_view(), name='editName'), # okay
    path("accounts/editemail/", EditEmailAddressView.as_view(), name='editEmailAddress'), # okay
    path("accounts/editpassword/", EditPasswordView.as_view(), name='editPassword'), # okay
    path("toilets/create/", AddToiletView.as_view(), name='addToilet'),
    path("toilets/addfavourite/", AddFavouriteToiletView.as_view(), name='addFavouriteToilet'),
    path("toilets/retrievefavourite/", RetrieveFavouriteToiletView.as_view(), name='retrieveFavouriteToilet'),
    path("toilets/removefavourite/", RemoveFavouriteToiletView.as_view(), name='removeFavouriteToilet'),
    path("reviews/create/", AddReviewView.as_view(), name='addReview'), # okay
    # path("reviews/retrievereview/", RetrieveReviewView.as_view(), name='retrieveReview'),
    path("settings/updatetoilet/", UpdateToiletView.as_view(), name='updateToilet'), # okay
    path("settings/retrievetoilet/", RetrieveToiletView.as_view(), name='retrieveToilet'), # okay
    path("settings/retrievetraffic/", RetrieveTrafficView.as_view(), name='retrieveTraffic'), # okay
]