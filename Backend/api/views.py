from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Person
from .serializer import PersonSerializer


# Create your views here.
@api_view(['GET'])
def get_all_persons(request):
    all_persons = Person.objects.all()
    serialized_data = PersonSerializer(all_persons, many=True).data
    return Response(serialized_data)

@api_view(['POST'])
def create_person(request):
    data = request.data
    serializer = PersonSerializer(data = data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def manage_person(request, pk):
    try:
        person = Person.objects.get(pk = pk)
    except Person.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'DELETE':
        person.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        data = request.data
        serializer = PersonSerializer(person, data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

def home(request):
    return HttpResponse("This is from api/home!")