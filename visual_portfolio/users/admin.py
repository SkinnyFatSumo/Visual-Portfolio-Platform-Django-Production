from django.contrib import admin
from .models import CustomUser, FavoriteUsers, FavoritePhotos, FavoriteTags

admin.site.register(CustomUser)
admin.site.register(FavoriteUsers)
admin.site.register(FavoritePhotos)
admin.site.register(FavoriteTags)

