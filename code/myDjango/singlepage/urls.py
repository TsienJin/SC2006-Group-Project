from django.urls import path, include
from . import views

urlpatterns = [
    path("", views.index, name='index'),
    path("", include("django_nextjs.urls"), name='home'),
    path('login/', views.login_view, name='api-login'),
    path('logout/', views.logout_view, name='api-logout'),
    path('session/', views.session_view, name='api-session'),
    path('whoami/', views.whoami_view, name='api-whoami'),
]