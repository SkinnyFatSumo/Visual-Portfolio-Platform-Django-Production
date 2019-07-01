from django.contrib import admin

# Register your models here.
from .models import Photo, Tag, PhotoWithTag


admin.site.register(Photo)
admin.site.register(Tag)
admin.site.register(PhotoWithTag)
