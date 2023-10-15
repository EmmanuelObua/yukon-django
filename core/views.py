from rest_framework import viewsets, status
from .models import Student, Teacher
from .serializers import StudentSerializer, TeacherSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

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

    def create(self, request, *args, **kwargs):
        # Extract the student IDs from the request data
        student_ids = request.data.get('students', [])

        # Create a new teacher instance
        teacher_serializer = self.get_serializer(data=request.data)
        if teacher_serializer.is_valid():
            teacher = teacher_serializer.save()

            # Set the many-to-many relationship with students
            teacher.students.set(student_ids)
            teacher.save()

            return Response({"message": "Teacher created successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "There was a slight error, please try again"}, status=status.HTTP_400_BAD_REQUEST)