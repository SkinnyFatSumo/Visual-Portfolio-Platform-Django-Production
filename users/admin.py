from django.contrib import admin
from .models import CustomUser, OptionalUserInfo, Favorites

admin.site.register(CustomUser)
admin.site.register(OptionalUserInfo)
admin.site.register(Favorites)


