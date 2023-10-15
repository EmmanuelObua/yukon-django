
from rest_framework import serializers
from .models import Student, Teacher

# Here, we are converting complex data types, Eg. Django model instances, into Python data types 
# that can be easily rendered into JSON for use in API responses.

class StudentSerializer(serializers.ModelSerializer):

    # The model indicates that this serializer is associated with the Student model.
    # The fields specifies that all fields from the Student model should be included in the serialized output.
    class Meta:
        model = Student
        fields = '__all__'

class TeacherSerializer(serializers.ModelSerializer):

    # The field students is associated with the StudentSerializer. 
    # When a teacher object is serialized, it will include a list of students associated with that teacher.

    students = StudentSerializer(many=True, read_only=True)

    # Refer to the docs of the StudentSerializer
    class Meta:
        model = Teacher
        fields = '__all__'