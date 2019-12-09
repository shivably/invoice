from rest_framework import serializers
from .models import StudentDetails

class StudentDetailsSerializer(serializers.ModelSerializer):
    skills = serializers.ListField(source='get_skills_list')
    class Meta:
        model= StudentDetails
        fields=('id','firstName','lastName','skills',)


class GetDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model=StudentDetails
        fields=('id','firstName','lastName','skills',)




        # lookup_field=('pk')