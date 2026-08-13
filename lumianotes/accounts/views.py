from django.contrib.auth.models import User
from django.contrib import messages
from django.http import JsonResponse
from django.shortcuts import render, redirect

def login_view(request):

    if request.method == 'POST':

        username = request.POST.get('username')
        password = request.POST.get('password')
        user = User.objects.filter(username=username).first()

        if user and user.check_password(password):
            return render(request, 'notes/home.html', {'success': 'Login successful!'})
        else:
            return render(request, 'accounts/login.html', {'error': 'Invalid username or password.'})

    return render(request, 'accounts/login.html')


def user_exists(username):
    return User.objects.filter(username=username).exists()


def check_username(request):
    username = request.GET.get('username', '').strip()
    exists = user_exists(username)
    return JsonResponse({'exists': exists})


def register_view(request):

    if request.method == 'POST':

        username = request.POST.get('username', '').strip()
        email = request.POST.get('email', '').strip()
        password = request.POST.get('password', '')
        confirm_password = request.POST.get('confirm_password','')

        if password != confirm_password:
            return render(request, 'accounts/register.html', {'error': 'Passwords do not match.', 'username': username, 'email': email })

        if user_exists(username):
            return render(request, 'accounts/register.html', {'error': 'Username already exists.','username': username, 'email': email})

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()

        messages.success(request, 'User created successfully!')

        return redirect('login')

    return render(request, 'accounts/register.html')