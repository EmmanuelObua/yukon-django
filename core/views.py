from rest_framework import viewsets
from .models import Student, Teacher
from .serializers import StudentSerializer, TeacherSerializer

# ModelViewSet provides default views for CRUD operations on a Django model

# We are setting queryset attribute to retrieve all instances of the Student and Teacher models from the database. 
# The viewsets will handle CRUD operations for these models. 

# ----------------------------------------------------------------------------------------------------------------

# The serializer classes for the models defined below is for serializing and deserializing data when handling API requests.

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
