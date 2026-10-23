from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.home, name='home'),
    path("logout/", views.logout_view, name="logout"),
    path("api/notas/", views.notas, name="notas"),
    path("api/notas/<int:id>/", views.nota_detail, name="nota_detail"),
    path("api/pastas/", views.pastas, name="pastas"),
    path("api/pastas/<int:id>/", views.pasta_detail, name="pasta_detail")
]