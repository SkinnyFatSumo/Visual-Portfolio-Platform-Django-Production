from django.db import models
from django.conf import settings
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import UserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
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

    '''
    class Meta:
        verbose_name = 'User'
    '''
  

class OptionalUserInfo(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name = 'User')
    
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    
    photo = models.URLField(max_length=300, blank=True, null=True) # provide default in front end
    bio = models.CharField(max_length=2000, blank=True, null=True)


class Favorites(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name = 'This_User')
    other_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name = 'Other_User')
    is_favorited_user = models.BooleanField();
    favorited_photo = models.ForeignKey('photos.Photo', on_delete=models.CASCADE, related_name = 'Favorited_Photo', blank=True, null=True)
    favorited_tag = models.ForeignKey('photos.Tag', on_delete=models.CASCADE, related_name = 'Favorited_Tag', blank=True, null=True)

