Python Django

Step 1 — Setting Up the Backend

Now install Pipenv using pip:
ednalan@Cairocoders django-nextjs % pip install pipenv

And activate a new virtual environment:
pipenv shell
ednalan@Cairocoders django-nextjs % pipenv shell

Install Django using Pipenv:
pipenv install django
ednalan@Cairocoders django-nextjs % pipenv install django

Then create a new project called backend:
django-admin startproject backend
ednalan@Cairocoders django-nextjs % django-admin startproject backend

navigate into the newly created backend directory:
cd backend
ednalan@Cairocoders backend %

Start a new application called myapp:
ednalan@Cairocoders backend % python manage.py startapp myapp

Run migrations:
ednalan@Cairocoders backend % python manage.py migrate

Navigate to http://localhost:8000 in your web browser:

Registering the myapp Application
Open the backend/settings.py file in your code editor and add myapp to the INSTALLED_APPS:

?
1
2
3
4
5
6
7
8
9
10
	
//backend/settings.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'myapp',
]
save your changes.

Defining the Customer Model
Open the myapp/models.py file in your code editor and add the following lines of code:

?
1
2
3
4
5
6
7
8
9
10
	
//myapp/models.py
from django.db import models
 
# Create your models here.
class Customer(models.Model):
    name = models.CharField(max_length=124)
    email = models.CharField(max_length=125)
 
    def _str_(self):
        return self.name
Create a migration file
python manage.py makemigrations myapp
And apply the changes to the database: python manage.py migrate myapp Open the myapp/admin.py file with your code editor and add the following lines of code:
?
1
2
3
4
5
6
7
8
9
10
	
//myapp/admin.py
from django.contrib import admin
from .models import Customer
 
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email')
 
# Register your models here.
 
admin.site.register(Customer, CustomerAdmin)
create a “superuser” account to access the admin interface. Run the following command in your terminal:
python manage.py createsuperuser
Start the server once again:
python manage.py runserver

Navigate to http://localhost:8000/admin in your web browser. And log in with the username and password that was created You can create, edit, and, delete items using this interface:

Step 2 — Setting Up the APIs create an API using the Django REST framework.
Install the djangorestframework and django-cors-headers using Pipenv:
pipenv install djangorestframework django-cors-headers

need to add rest_framework and corsheaders to the list of installed applications. Open the backend/settings.py file in your code editor and update the INSTALLED_APPS and MIDDLEWARE sections:

INSTALLED_APPS = [
'corsheaders',
'rest_framework',
]

MIDDLEWARE = [
'corsheaders.middleware.CorsMiddleware',
]

add these lines of code to the bottom of the backend/settings.py file:
CORS_ORIGIN_WHITELIST = [
'http://localhost:3000'
]

Creating serializers
serializers to convert model instances to JSON so that the frontend can work with the received data.
myapp/serializers.py file with your code editor. Open the serializers.py file and update it with the following lines of code:

?
1
2
3
4
5
6
7
8
	
//myapp/serializers.py
from rest_framework import serializers
from .models import Customer
 
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('id', 'name', 'email')
This code specifies the model to work with and the fields to be converted to JSON.
Creating View
myapp/views.py
?
1
2
3
4
5
6
7
8
9
10
11
	
//myapp/views.py
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CustomerSerializer
from .models import Customer
 
# Create your views here.
 
class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()
Open the backend/urls.py file with your code editor and replace the contents with the following lines of code:
?
1
2
3
4
5
6
7
8
9
10
11
12
13
	
//backend/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from myapp import views
 
router = routers.DefaultRouter()
router.register(r'customers', views.CustomerView, 'customer')
 
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
restart the server:
python manage.py runserver
Navigate to http://localhost:8000/api/customers http://localhost:8000/api/customers/1 in your web browser:

Pagination
django-rest-framework
PageNumberPagination
Request:
GET https://api.example.org/accounts/?page=4
Setup
To enable the PageNumberPagination style globally, use the following configuration, and set the PAGE_SIZE as desired:
backend/settings.py
?
1
2
3
4
	
REST_FRAMEWORK = { #https://www.django-rest-framework.org/api-guide/pagination/#pagenumberpagination
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 3
}
http://localhost:8000/api/customers/?page=1 

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
