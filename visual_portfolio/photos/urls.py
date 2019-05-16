from django.urls import path, re_path

from .views import (
        PhotoListAPIView,
        PhotoListByUsernameAPIView,
        PhotoCreateAPIView,
        PhotoRetrieveUpdateDestroyAPIView,
        TagListCreateAPIView,
        TagRetrieveUpdateDestroyAPIView,
        PhotoListByTagAPIView,
        PhotoWithTagListCreateAPIView,
        PhotoWithTagRetrieveUpdateDestroyAPIView
    )

# the app name is used to associate the name following it (e.g. detail-photo) 
# with a specific view from this app, as also named in the main urls.py file

app_name = 'photos-api'
urlpatterns = [
    # photo
    re_path(r'^(?P<username>[\w-]+)/list/$', PhotoListByUsernameAPIView.as_view()),
    # path('list', PhotoListAPIView.as_view()),
    path('create', PhotoCreateAPIView.as_view()),
    re_path(r'^(?P<pk>\d+)/$', PhotoRetrieveUpdateDestroyAPIView.as_view(), name='detail-photo'),
    # tag
    re_path(r'^tags/$', TagListCreateAPIView.as_view()),
    re_path(r'^tags/(?P<tagname>[\w-]+)/$', TagRetrieveUpdateDestroyAPIView.as_view(), name='detail-tag'),
 #   re_path(r'^tags/(?P<pk>\d+)/$', TagRetrieveUpdateDestroyApiView.as_view(), name='detail-tag'),
    # re_path(r'^tags/(?P<tagname>[\w-]+)/$', TagRetrieveUpdateDestroyApiView.as_view(), name='detail-tag'),
    # photos based on tags, for querying
    re_path(r'^(?P<username>[\w-]+)/sort', PhotoListByTagAPIView.as_view()),
    # photo with tag, for defining relationships
    re_path(r'^pwt/$', PhotoWithTagListCreateAPIView.as_view()),
    re_path(r'^pwt/(?P<pk>\d+)$', PhotoWithTagRetrieveUpdateDestroyAPIView.as_view(), name='detail-pwt')
]
