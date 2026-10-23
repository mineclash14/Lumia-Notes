from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib.auth import logout
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.db import IntegrityError

from .models import Nota, Pasta

import json

@login_required
def home(request):
    return render(request, "notes/home.html")

def guest(request):
    return render(request, "notes/guest.html")

def logout_view(request):
    logout(request)
    return redirect('guest')

def obter_pasta_do_usuario(request, pasta_id):
    if pasta_id is None:
        return None

    return get_object_or_404(
        Pasta,
        id=pasta_id,
        usuario=request.user
    )

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
                "pasta_id": nota.pasta_id,
                "pasta_nome": nota.pasta.nome if nota.pasta else None
            })

        return JsonResponse(dados, safe=False)

    if request.method == "POST":
        dados = request.POST

        tags = json.loads(dados.get("tags", "[]"))

        pasta_id = dados.get("pasta_id") or None

        pasta = obter_pasta_do_usuario(request, pasta_id)

        nota = Nota.objects.create(
            usuario=request.user,
            titulo=dados.get("titulo"),
            conteudo=dados.get("conteudo"),
            favorito=False,
            arquivado=False,
            tags=tags,
            pasta=pasta
        )

        return JsonResponse({
            "id": nota.id,
            "titulo": nota.titulo,
            "conteudo": nota.conteudo,
            "favorito": nota.favorito,
            "arquivado": nota.arquivado,
            "tags": nota.tags,
            "data": nota.data.isoformat(),
            "pasta_id": nota.pasta_id,
            "pasta_nome": nota.pasta.nome if nota.pasta else None
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

        if "pasta_id" in dados:
            pasta_id = dados["pasta_id"]

            if pasta_id in (None, ""):
                nota.pasta = None
            else:
                nota.pasta = obter_pasta_do_usuario(
                    request,
                    pasta_id
                )


        nota.save()

        return JsonResponse({
            "id": nota.id,
            "favorito": nota.favorito,
            "arquivado": nota.arquivado,
        })

@login_required
@require_http_methods(["GET", "POST"])
def pastas(request):
    if request.method == "GET":
        lista = Pasta.objects.filter(usuario=request.user)

        return JsonResponse([
            {
                "id": pasta.id,
                "nome": pasta.nome,
                "total_notas": pasta.notas.filter(
                    usuario=request.user
                ).count()
            }
            for pasta in lista
        ], safe=False)

    nome = request.POST.get("nome", "").strip()

    if not nome:
        return JsonResponse(
            {"erro": "Informe o nome da pasta."},
            status=400
        )

    try:
        pasta = Pasta.objects.create(
            usuario=request.user,
            nome=nome
        )
    except IntegrityError:
        return JsonResponse(
            {"erro": "Você já tem uma pasta com esse nome"},
            status=409
        )

    return JsonResponse({
        "id": pasta.id,
        "nome": pasta.nome,
        "total_notas": 0,
    }, status=201)

@login_required
@require_http_methods(["PATCH", "DELETE"])
def pasta_detail(request, id):
    pasta = get_object_or_404(
        Pasta,
        id=id,
        usuario=request.user
    )

    if request.method == "DELETE":
        pasta.delete()

        return JsonResponse({"success": True})

    try:
        dados = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse(
            {"erro": "JSON inválido."},
            status=400
        )

    nome = dados.get("nome", "").strip()

    if not nome:
        return JsonResponse(
            {"erro": "Informe o nome da pasta."},
            status=400
        )

    if Pasta.objects.filter(
        usuario=request.user,
        nome=nome
    ).exclude(id=pasta.id).exists():
        return JsonResponse(
            {"erro": "Você já tem uma pasta com esse nome"},
            status=400
        )

    pasta.nome = nome
    pasta.save(update_fields=["nome"])

    return JsonResponse({
        "id": pasta.id,
        "nome": pasta.nome
    })