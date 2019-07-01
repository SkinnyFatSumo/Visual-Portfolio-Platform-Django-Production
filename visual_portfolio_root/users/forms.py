'''
from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import User

class UserCreationForm(UserCreationForm):
    username = forms.EmailField(required=True)

    class Meta(UserCreationForm):
        model = User
        fields = ('username', 'password1', 'password2')
'''
