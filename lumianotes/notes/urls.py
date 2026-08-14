from django.urls import path
from notes import views

urlpatterns = [
    path('home/', views.home, name='home'),
    path("logout/", views.logout_view, name="logout"),
    path("api/notas/", views.notas, name="notas"),
    path("api/notas/<int:id>/", views.nota_detail, name="nota_detail"),
]