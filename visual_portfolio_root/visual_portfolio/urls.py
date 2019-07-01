from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import path, include, re_path

urlpatterns = [
    
    # ADMINISTRATION
    path('admin/', admin.site.urls),

    # AUTHORIZATION / AUTHENTICATION
    path('api/auth/', include('users.urls', namespace='users-api')),

    # PHOTOGRAPHY
    path('api/photos/', include('photos.urls', namespace="photo-api")),
    
    # CATCH-ALL: EVERYTHING BUT APIs AND ADMIN GOES TO INDEX (FRONTEND)
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]
