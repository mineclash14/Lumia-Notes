from django.urls import path
from notes import views

urlpatterns = [
    path('home/', views.home, name='home'),
]