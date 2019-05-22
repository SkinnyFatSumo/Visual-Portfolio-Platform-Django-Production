from django.urls import path, re_path

from .views import (
        # PHOTOS 
        PhotoListAPIView,
        PhotoCreateAPIView,
        PhotoRetrieveUpdateDestroyAPIView,
        # PHOTOS BY TAG 
        PhotoListByTagAPIView,
        # TAGS 
        TagListAPIView,
        TagCreateAPIView,
        TagRetrieveUpdateDestroyAPIView,
        # RELATIONS (TAG-PHOTO ASSOCIATIONS) 
        PhotoWithTagListAPIView,
        PhotoWithTagCreateAPIView,
        PhotoWithTagRetrieveUpdateDestroyAPIView
) 

# the app name is used to associate the name following it (e.g. detail-photo) 
# with a specific view from this app, as also named in the main urls.py file
app_name = 'photos-api'

urlpatterns = [
    re_path(r'^(?P<username>[\w-]+)/list$', PhotoListAPIView.as_view()),
    # CREATE
    path('create', PhotoCreateAPIView.as_view()),
    # RETRIEVE, UPDATE, DESTROY
    re_path(r'^(?P<pk>\d+)$', PhotoRetrieveUpdateDestroyAPIView.as_view(), name='detail-photo'),
    
    # LIST
    re_path(r'^(?P<username>[\w-]+)/sort$', PhotoListByTagAPIView.as_view()),
    
    # LIST
    re_path(r'^tags/(?P<username>[\w-]+)/list$', TagListAPIView.as_view()),
    # CREATE
    re_path(r'^tags/create$', TagCreateAPIView.as_view()),
    # RETRIEVE, UPDATE, DESTROY
    re_path(r'^tags/(?P<tagname>[\w-]+)$', TagRetrieveUpdateDestroyAPIView.as_view(), name='detail-tag'),
    
    # LIST
    re_path(r'^pwt/(?P<username>[\w-]+)/list$', PhotoWithTagListAPIView.as_view()),
    # CREATE
    path('pwt/create', PhotoWithTagCreateAPIView.as_view()),
    # RETRIEVE, UPDATE, DESTROY
    re_path(r'^pwt/rud/(?P<pk>\d+)$', PhotoWithTagRetrieveUpdateDestroyAPIView.as_view(), name='detail-pwt')
]
