from django.db import models

# Create your models here.
class StudentDetails(models.Model):
    # pk=models.IntegerField()
    firstName=models.CharField(max_length=200)
    lastName=models.CharField(max_length=200)
    skills=models.CharField(max_length=500)


    def __str__(self):
        return self.firstName

    def get_skills_list(self):
        return list(str(self.skills).split(','))


# Create your models here.
class Product(models.Model):
    # pk=models.IntegerField()
    name=models.CharField(max_length=200)
    quantity=models.IntegerField()
    price=models.IntegerField()


    def __str__(self):
        return self.name
