from django.contrib import admin
from .models.User import User
from .models.MoP import MoP
from .models.Toilet import Toilet
from .models.Review import Review

# Register your models here.
admin.site.register(User)
# admin.site.register(MoP)
admin.site.register(Toilet)
admin.site.register(Review)
