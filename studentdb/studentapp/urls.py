from django.urls import path
from .views import StudentDetailsView,CreateDetailsView,RemoveDetailsView

urlpatterns=[
    path('students/',StudentDetailsView.as_view(),name='showData'),
    path('create/',CreateDetailsView.as_view(),name='postData'),
    path('delete/<int:id>/',RemoveDetailsView.as_view(),name='removeData')

]