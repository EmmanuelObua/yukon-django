from django.db import models

# Student model with name and surname, returning a name and surname cocatinated string
class Student(models.Model):
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.name} {self.surname}'

# Teacher model with name and students with a many to many relationship returning a name string
class Teacher(models.Model):
    name = models.CharField(max_length=100)
    students = models.ManyToManyField(Student, related_name='teachers')

    def __str__(self):
        return self.name
