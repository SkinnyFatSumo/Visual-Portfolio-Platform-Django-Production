from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser, OptionalUserInfo, Favorites 

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email')

class OptionalUserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = OptionalUserInfo
        fields = ('first_name', 'last_name', 'photo', 'bio', 'owner')

class FavoritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorites
        fields = ('owner', 'other_user', 'is_favorited_user', 'favorited_user', 'favorited_user')



# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(username=validated_data['username'], email=validated_data['email'], password=validated_data['password'])
        
        return user

# Login Serializer
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Invalid Credentials')



