from rest_framework import serializers
from .models import StudentDetails, Product

class StudentDetailsSerializer(serializers.ModelSerializer):
    skills = serializers.ListField(source='get_skills_list')
    class Meta:
        model= StudentDetails
        fields=('id','firstName','lastName','skills',)


class GetDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model=StudentDetails
        fields=('id','firstName','lastName','skills',)


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model= Product
        fields=('id','name','quantity','price',)

class ProductDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model=Product
        fields=('id','name','quantity','price',)


        # lookup_field=('pk')