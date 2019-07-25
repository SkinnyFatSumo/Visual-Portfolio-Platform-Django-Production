from django.contrib import admin
from .models import User, OptionalUserInfo, Favorites

admin.site.register(User)
admin.site.register(OptionalUserInfo)
admin.site.register(Favorites)


