from django.contrib import admin
from  .models import *

class ProductAdmin(admin.ModelAdmin):
	ordering = ('position', )
	list_display = ('name', 'description', 'photo', 'position')
	search_fields =  ('name','description',)

class ContactAdmin(admin.ModelAdmin):
	list_display = ('date_created', 'name', 'email', 'phone')
	search_fields =  ('name','email', 'phone')


class PromotionAdmin(admin.ModelAdmin):
	list_display = ('date_created', 'name', 'active')
	search_fields =  ('name','description',)

admin.site.register(Product, ProductAdmin)
admin.site.register(Promotion, PromotionAdmin)
admin.site.register(Category)
admin.site.register(Contact, ContactAdmin)

admin.site.site_header = "DILPIS Back-Office"