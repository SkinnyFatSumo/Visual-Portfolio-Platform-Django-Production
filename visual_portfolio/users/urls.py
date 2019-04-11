from django.urls import path, re_path, include
from knox import views as knox_views
from .views import RegisterUserAPIView, LoginUserAPIView, GetUserAPIView
app_name = 'users-api'

urlpatterns = [
    # photo
    path('', include('knox.urls')),
    path('register', RegisterUserAPIView.as_view()),
    path('login', LoginUserAPIView.as_view()),
    path('user', GetUserAPIView.as_view()),
    path('logout', knox_views.LogoutView.as_view(), name='knox_logout'),
]
