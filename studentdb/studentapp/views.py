from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView,CreateAPIView,DestroyAPIView
from .serializers import StudentDetailsSerializer,GetDetailsSerializer, ProductSerializer, ProductDetailSerializer
from .models import *

# Create your views here.
#view

class StudentDetailsView(ListAPIView):
    serializer_class = StudentDetailsSerializer
    queryset = StudentDetails.objects.all()

class ProductView(ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

#ADD

class AddProductView(CreateAPIView):
    serializer_class = ProductDetailSerializer
    queryset = Product.objects.all()
    lookup_field = 'id'

class CreateDetailsView(CreateAPIView):
    serializer_class = GetDetailsSerializer
    queryset = StudentDetails.objects.all()
    lookup_field = 'id'

#Delete

class RemoveDetailsView(DestroyAPIView):
    serializer_class = GetDetailsSerializer
    queryset = StudentDetails.objects.all()
    lookup_field = 'id'

@api_view(['GET'])
def api_student_list_view(request):
    students=StudentDetails.objects.all()
    if request.method=='GET':
        serializer=StudentDetailsSerializer(students,many=True)
        return Response(serializer.data)

@api_view(['POST'])
def post_student_list_view(request):
    if request.method=='POST':
        getData=StudentDetailsSerializer(data=request.data)
        if getData.is_valid():
            user=getData.save()
        return  Response(data=getData.data,status=status.HTTP_201_CREATED)
    return Response(getData.error,status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def post_product_list_view(request):
    if request.method=='POST':
        getData=ProductDetailSerializer(data=request.data)
        if getData.is_valid():
            user=getData.save()
        return  Response(data=getData.data,status=status.HTTP_201_CREATED)
    return Response(getData.error,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def api_product_list_view(request):
    students=Product.objects.all()
    if request.method=='GET':
        serializer=ProductDetailSerializer(students,many=True)
        return Response(serializer.data)
