from django.urls import path, include

from . import view
from .views.AccountView import RegisterView, LogoutView, EditNameView, EditEmailAddressView, EditPasswordView, LoginView
from .views.ReviewView import AddReviewView
from .views.ToiletView import AddToiletView, AddFavouriteToiletView, RetrieveFavouriteToiletView, RemoveFavouriteToiletView
from .views.SettingsView import UpdateToiletView, RetrieveToiletView, RetrieveTrafficView

urlpatterns = [
    path("", view.index, name='index'),
    path("sg/v1/accounts/login/", LoginView.as_view(), name='login'),
    path("sg/v1/accounts/register/", RegisterView.as_view(), name='register'),
    path("sg/v1/accounts/logout/", LogoutView.as_view(), name='logout'),
    path("sg/v1/accounts/editname/", EditNameView.as_view(), name='editName'),
    path("sg/v1/accounts/editemail/", EditEmailAddressView.as_view(), name='editEmailAddress'),
    path("sg/v1/accounts/editpassword/", EditPasswordView.as_view(), name='editPassword'),
    path("sg/v1/toilets/create/", AddToiletView.as_view(), name='addToilet'),
    path("sg/v1/toilets/addfavourite/", AddFavouriteToiletView.as_view(), name='addFavouriteToilet'),
    path("sg/v1/toilets/retrievefavourite/", RetrieveFavouriteToiletView.as_view(), name='retrieveFavouriteToilet'),
    path("sg/v1/toilets/removefavourite/", RemoveFavouriteToiletView.as_view(), name='removeFavouriteToilet'),
    path("sg/v1/reviews/create/", AddReviewView.as_view(), name='addReview'),
    path("sg/v1/settings/updatetoilet/", UpdateToiletView.as_view(), name='updateToilet'),
    path("sg/v1/settings/retrievetoilet/", RetrieveToiletView.as_view(), name='retrieveToilet'),
    path("sg/v1/settings/retrievetraffic/", RetrieveTrafficView.as_view(), name='retrieveTraffic'),
]