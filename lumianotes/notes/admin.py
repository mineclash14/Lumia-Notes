from django.contrib import admin
from .models import Nota

# Register your models here.
@admin.register(Nota)
class NotaAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'usuario',
        'titulo',
        'favorito',
        'arquivado',
        'data',
    )

    list_filter = (
        'favorito',
        'arquivado',
        'data',
    )

    search_fields = (
        'titulo',
        'conteudo',
        'usuario__username',
    )