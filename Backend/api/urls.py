from django.urls import path
from .views import home, get_all_persons, create_person, manage_person


urlpatterns = [
    path('persons/', get_all_persons, name='get_all_persons'),
    path('persons/create/', create_person, name = 'create_person'),
    path('persons/<int:pk>', manage_person, name = 'manage_person'),
    path('', home),
]