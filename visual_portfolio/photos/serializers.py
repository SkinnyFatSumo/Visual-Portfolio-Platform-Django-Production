from rest_framework import serializers
from photos.models import Photo, Tag, PhotoWithTag
from django.urls import reverse


class TagSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
            view_name='photo-api:detail-tag',
            lookup_field='tagname')

    class Meta:
        model = Tag
        fields = ('id', 'owner', 'tagname', 'url')


class PhotoSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
            view_name='photo-api:detail-photo',
            )
    
    class Meta:
        model = Photo
        fields = ('id', 'owner', 'title', 'color', 'film',
                  'film_comp', 'film_stock', 'iso',
                  'aperture','shutter', 'focal_length', 'aspect_ratio',
                  'camera_brand', 'camera_model', 'lens_brand', 'lens_model',
                  'country', 'city', 'state', 'site', 'taken',
                  'uploaded', 'photo_source', 'thumbnail_source', 'thumbnail_height',
                  'thumbnail_width', 'url')


class PhotoWithTagSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='photo-api:detail-pwt')
    tagname = serializers.CharField(source='tag.tagname')

    class Meta:
        model = PhotoWithTag
        
        fields = ('id', 'owner', 'photo', 'tag', 'tagname', 'url')




