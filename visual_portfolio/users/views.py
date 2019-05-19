from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import generics, permissions
from knox.models import AuthToken
from .models import CustomUser 
from rest_framework.response import Response
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer


# List all Users
class ListUserAPIView(generics.ListAPIView):
    user = get_user_model() 
    queryset = user.objects.all()
    serializer_class = UserSerializer
    
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

