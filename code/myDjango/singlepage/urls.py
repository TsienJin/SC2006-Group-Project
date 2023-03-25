from django.urls import path, include
from .views.LoginView import LoginView
from .views.RegisterView import RegisterView
from .views.AccountView import LogoutView, EditNameView, EditEmailAddressView, EditPasswordView
from .views.ToiletView import ToggleToiletView
from . import view

urlpatterns = [
    path("", view.index, name='index'),
    # path("", include("django_nextjs.urls"), name='home'), 
    path("accounts/login", LoginView.as_view(), name='login'),
    path("accounts/create", RegisterView.as_view(), name='register'),
    path("accounts/logout", LogoutView.as_view(), name='logout'),
    path("accounts/editname", EditNameView.as_view(), name='editName'),
    path("accounts/editemail", EditEmailAddressView.as_view(), name='editEmailAddress'),
    path("accounts/editpassword", EditPasswordView.as_view(), name='editPassword'),
    path("toilets/toggle", ToggleToiletView.as_view(), name='toggleToilet'),
]