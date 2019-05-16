from django.contrib import admin
from .models import User, FavoriteUsers, FavoritePhotos, FavoriteTags

admin.site.register(User)
admin.site.register(FavoriteUsers)
admin.site.register(FavoritePhotos)
admin.site.register(FavoriteTags)

