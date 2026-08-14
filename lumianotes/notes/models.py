from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Nota(models.Model):
    usuario = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='notas'
    )

    titulo = models.CharField(max_length=255)
    conteudo = models.TextField()

    favorito = models.BooleanField(default=False)
    arquivado = models.BooleanField(default=False)

    tags = models.JSONField(default=list, blank=True)

    data = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo