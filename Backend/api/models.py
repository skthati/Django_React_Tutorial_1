from django.db import models

# Create your models here.

class Person(models.Model):
    personName = models.CharField(max_length=50)
    date_of_birth = models.IntegerField()

    def __str__(self):
        return self.personName
    