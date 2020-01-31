from django.contrib import admin
from .models import StudentDetails

class StudentDetailsAdmin(admin.ModelAdmin):
    list_display = ('pk','firstName','lastName','skills',)
# Register your models here.
admin.site.register(StudentDetails, StudentDetailsAdmin)