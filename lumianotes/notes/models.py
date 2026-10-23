from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Pasta(models.Model):
    usuario = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='pastas'
    )

    nome = models.CharField(max_length=100)
    data = models.DateTimeField(auto_now_add=100)

    class Meta:
        ordering = ["nome"]
        constraints = [
            models.UniqueConstraint(
                fields=["usuario", "nome"],
                name="pasta_nome_unico_por_usuario"
            )
        ]

    def __str__(self):
        return self.nome

class Nota(models.Model):
    usuario = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='notas'
    )

    pasta = models.ForeignKey(
        Pasta,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
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