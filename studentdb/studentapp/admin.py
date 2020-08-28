from django.contrib import admin
from .models import StudentDetails, Product

class StudentDetailsAdmin(admin.ModelAdmin):
    list_display = ('pk','firstName','lastName','skills',)
# Register your models here.
admin.site.register(StudentDetails, StudentDetailsAdmin)

class ProductAdmin(admin.ModelAdmin):
    list_display = ('pk','name','quantity','price',)
# Register your models here.
admin.site.register(Product, ProductAdmin)