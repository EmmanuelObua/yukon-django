from django.test import TestCase

from rest_framework.test import APIClient
from rest_framework import status
from .models import Teacher
from .serializers import TeacherSerializer

class TeacherAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_create_teacher(self):
        data = {
            'name': 'John Doe',
            'students': []
        }

        response = self.client.post('/api/teachers/', data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Teacher.objects.count(), 1)
        self.assertEqual(Teacher.objects.get().name, 'John Doe')

    def test_list_teachers(self):
        # Create some teachers for testing
        teacher1 = Teacher.objects.create(name='Teacher 1')
        teacher2 = Teacher.objects.create(name='Teacher 2')

        response = self.client.get('/api/teachers/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Deserialize the response data
        teachers = TeacherSerializer(Teacher.objects.all(), many=True)

        # Check if the response data matches the expected data
        self.assertEqual(response.data, teachers.data)
