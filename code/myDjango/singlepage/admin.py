from django.contrib import admin
from .models.User import User
from .models.Toilet import Toilet
from .models.Review import Review
from .models.Traffic import Traffic

# Register your models here.
admin.site.register(User)
admin.site.register(Toilet)
admin.site.register(Review)
admin.site.register(Traffic)
