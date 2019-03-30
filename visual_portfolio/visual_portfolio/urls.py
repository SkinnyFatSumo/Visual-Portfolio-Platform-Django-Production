"""visual_portfolio URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import path, include, re_path

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    re_path(r'^photo/', TemplateView.as_view(template_name='index.html')),
    re_path(r'^motion/', TemplateView.as_view(template_name='index.html')),
    re_path(r'^design/', TemplateView.as_view(template_name='index.html')),
    path('admin/', admin.site.urls),
    path('api/photos/', include('photos.urls', namespace="photo-api")),
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
    #path('api/motion/', include('motion.urls', namespace="motion-api")),
    #path('api/design/', include('design.urls', namespace="design-api"))
]
