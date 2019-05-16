from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import UserManager

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique=True)

    date_joined = models.DateTimeField(auto_now_add=True)
    
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    objects = UserManager()

    def __str__(self):
        return self.email
  

class OptionalUserInfo(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name = 'User')
    
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    
    photo = models.URLField(max_length=300, blank=True, null=True) # provide default in front end
    bio = models.CharField(max_length=2000, blank=True, null=True)


class FavoriteUsers(models.Model):
    this_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name = 'This_User')
    other_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name = 'Favorited_User')


class FavoritePhotos(models.Model):
    this_user = models.ForeignKey(User, on_delete=models.CASCADE)
    favorited_photo = models.ForeignKey('photos.Photo', on_delete=models.CASCADE, related_name = 'Favorited_Photo')

class FavoriteTags(models.Model):
    this_user = models.ForeignKey(User, on_delete=models.CASCADE)
    favorited_tag = models.ForeignKey('photos.Tag', on_delete=models.CASCADE, related_name = 'Favorited_Tag')


