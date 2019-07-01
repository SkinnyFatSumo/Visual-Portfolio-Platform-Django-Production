from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import generics, permissions
from knox.models import AuthToken
from rest_framework.response import Response
from .models import CustomUser, OptionalUserInfo, Favorites
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, OptionalUserInfoSerializer, FavoritesSerializer



# USER INFORMATIOON

# List all Users
class ListUserAPIView(generics.ListAPIView):
    user = get_user_model() 
    queryset = user.objects.all()
    serializer_class = UserSerializer


# List optional user info owned by a specific user
class OptionalUserInfoListAPIView(generics.ListAPIView):
    serializer_class = OptionalUserInfoSerializer 

    def get_queryset(self):
        username = self.kwargs['username']
        return OptionalUserInfo.objects.filter(owner__username=username)

# Add a new user info owned by this user
class OptionalUserInfoCreateAPIView(generics.CreateAPIView):
    queryset = OptionalUserInfo.objects.all()
    serializer_class = OptionalUserInfoSerializer 
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# Retrieve a specific user's info, url @ /auth/userinfo/<int:pk>
class OptionalUserInfoRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = OptionalUserInfo.objects.all()
    serializer_class = OptionalUserInfoSerializer
    permission_classes  = [permissions.IsAuthenticated]


# List favorites owned by a specific user
class FavoritesListAPIView(generics.ListAPIView):
    serializer_class = FavoritesSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        return Favorites.objects.filter(owner__username=username)

# Add a new favorite owned by this user
class FavoritesCreateAPIView(generics.CreateAPIView):
    queryset = Favorites.objects.all()
    serializer_class = FavoritesSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# Retrieve a specific favorite, url @ /auth/favorites/<int:pk>
class FavoritesRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Favorites.objects.all()
    serializer_class = FavoritesSerializer
    permission_classes  = [permissions.IsAuthenticated]



# REGISTRATION AND AUTHENTICATION
    
# Register User
class RegisterUserAPIView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Login User
class LoginUserAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Retrive User 
class GetUserAPIView(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

