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