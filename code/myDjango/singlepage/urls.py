from django.urls import path, include
from .views.AccountView import RegisterView, LogoutView, EditNameView, EditEmailAddressView, EditPasswordView, LoginView
from .views.ReviewView import RetrieveReviewView, AddReviewView
from .views.ToiletView import AddToiletView, AddFavouriteToiletView, RetrieveFavouriteToiletView
from .views.SettingsView import RetrieveToiletView, RetrieveTrafficView
from . import view

# TODO: Add versioning for APIS
urlpatterns = [
    path("", view.index, name='index'),
    # path("", include("django_nextjs.urls"), name='home'), 
    path("accounts/login/", LoginView.as_view(), name='login'),
    path("accounts/register/", RegisterView.as_view(), name='register'),
    path("accounts/logout/", LogoutView.as_view(), name='logout'),
    path("accounts/editname/", EditNameView.as_view(), name='editName'),
    path("accounts/editemail/", EditEmailAddressView.as_view(), name='editEmailAddress'),
    path("accounts/editpassword/", EditPasswordView.as_view(), name='editPassword'),
    path("toilets/create/", AddToiletView.as_view(), name='addToilet'),
    path("toilets/addfavourite/", AddFavouriteToiletView.as_view(), name='addFavouriteToilet'),
    path("toilets/retrievefavourite/", RetrieveFavouriteToiletView.as_view(), name='retrieveFavouriteToilet'),
    path("reviews/create/", AddReviewView.as_view(), name='addReview'),
    # path("reviews/retrievereview/", RetrieveReviewView.as_view(), name='retrieveReview'),
    path("settings/retrievetoilet/", RetrieveToiletView.as_view(), name='retrieveToilet'),
    path("settings/retrievetraffic/", RetrieveTrafficView.as_view(), name='retrieveTraffic'),
]