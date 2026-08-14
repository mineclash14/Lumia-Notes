from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib.auth import logout
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from .models import Nota

import json

@login_required
def home(request):
    return render(request, "notes/home.html")

def guest(request):
    return render(request, "notes/guest.html")

def logout_view(request):
    logout(request)
    return redirect('guest')

@login_required
@require_http_methods(["GET", "POST"])
def notas(request):
    if request.method == "GET":
        notas = Nota.objects.filter(usuario=request.user)

        dados = []

        for nota in notas:
            dados.append({
                "id": nota.id,
                "titulo": nota.titulo,
                "conteudo": nota.conteudo,
                "favorito": nota.favorito,
                "arquivado": nota.arquivado,
                "tags": nota.tags,
                "data": nota.data.isoformat(),
            })

        return JsonResponse(dados, safe=False)

    if request.method == "POST":
        dados = request.POST

        tags = json.loads(dados.get("tags", "[]"))

        nota = Nota.objects.create(
            usuario=request.user,
            titulo=dados.get("titulo"),
            conteudo=dados.get("conteudo"),
            favorito=False,
            arquivado=False,
            tags=tags,
        )

        return JsonResponse({
            "id": nota.id,
            "titulo": nota.titulo,
            "conteudo": nota.conteudo,
            "favorito": nota.favorito,
            "arquivado": nota.arquivado,
            "tags": nota.tags,
            "data": nota.data.isoformat(),
        }, status=201)

@login_required
@require_http_methods(["GET", "DELETE", "PATCH"])
def nota_detail(request, id):
    nota = get_object_or_404(
        Nota,
        id=id,
        usuario=request.user
    )

    if request.method == "GET":
        return JsonResponse({
            "id": nota.id,
            "titulo": nota.titulo,
            "conteudo": nota.conteudo,
            "favorito": nota.favorito,
            "arquivado": nota.arquivado,
            "tags": nota.tags,
            "data": nota.data.isoformat(),
        })

    if request.method == "DELETE":
        nota.delete()

        return JsonResponse({
            "success": True
        })

    if request.method == "PATCH":

        dados = json.loads(request.body)

        if "favorito" in dados:
            nota.favorito = dados["favorito"]

        if "arquivado" in dados:
            nota.arquivado = dados["arquivado"]

        nota.save()

        return JsonResponse({
            "id": nota.id,
            "favorito": nota.favorito,
            "arquivado": nota.arquivado,
        })