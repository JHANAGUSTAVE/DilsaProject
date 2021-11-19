from django.db import models

# Create your models here.


class Product(models.Model):
	class Meta:
		db_table = 'products'
	date_created = models.DateTimeField(auto_now_add=True)
	date_modified = models.DateTimeField(auto_now=True)
	name = models.CharField(max_length=200)
	subtitle = models.CharField(max_length=255, blank=True, null=True)
	description = models.TextField(max_length=400)
	photo = models.ImageField(upload_to='products/photos/', blank=True, null=True)
	position = models.IntegerField(default=-1)
	active = models.BooleanField(default=False)
	categories = models.ManyToManyField("Category", blank=True)

	def __str__(self):
		return self.name

class Category(models.Model):
	class Meta:
		db_table = 'categories'
		verbose_name_plural = 'Categories'

	name = models.CharField(max_length=100)

class Promotion(models.Model):
	class Meta:
		db_table = 'promotions'
	date_created = models.DateTimeField(auto_now_add=True)
	date_modified = models.DateTimeField(auto_now=True)
	name = models.CharField(max_length=200)
	description = models.TextField(max_length=400, blank=True, null=True)
	photo = models.ImageField(upload_to='promotions/photos/', blank=True, null=True)
	active = models.BooleanField(default=False)
	position = models.IntegerField(default=-1)

	def __str__(self):
		return self.name

class Contact(models.Model):
	class Meta:
		db_table = 'contacts'

	date_created = models.DateTimeField(auto_now_add=True)
	date_modified = models.DateTimeField(auto_now=True)
	name = models.CharField(max_length=200)
	email = models.EmailField()
	phone = models.CharField(max_length=20,blank=True, null=True)
	message = models.TextField(max_length=4000)