# Django_React_Tutorial_1


cd backend

python3 -m pip install virtualenv

python3 -m virtualenv env

source env/bin/activate

python3 -m pip install django

pip install --upgrade pip

npm install -g npm

pip install djangorestframework

django-admin startproject Mysystem

django-admin startapp api

add 'rest_framework' in Mysystem/settings.py

write below code at api/urls.py
from django.urls import path

urlpatterns = [
    path('', home),
]

write below code at api/views.py
def home(request):
    return HttpResponse("This is from api/home!")

add include and below code in mysystem/urls.py
path('', include('api.urls'))

at terminal
python3 manage.py makemigration

python3 manage.py migrate

python3 manage.py runserver

Install React

npx create-react-app frontend

nmp start

Create components folder in src

Once both frontend and backend servers are started.

frontend and backend can communicate with each other using django-cors-headers

Install django-cors-headers and configure it in settings.py
add below code:
CORS_ALLOWED_ORIGINS = [
    http://localhost:3000/
]

Also add 'corsheaders' in Installed apps and 'corsheaders.middleware.CorsMiddleware' in middleware.

npm i install react-router-dom

python3 manage.py makemigrations

python3 manage.py migrate

