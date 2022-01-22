# sitemaps.py
from django.contrib import sitemaps
from django.urls import reverse
from core.models import Product

class StaticViewSitemap(sitemaps.Sitemap):
	# priority = 0.5
	changefreq = 'weekly'
	
	def items(self):
		return ['contact','home']

	def location(self, item):
		return reverse(item)


class ProductSitemap(sitemaps.Sitemap):

	def items(self):
		return Product.objects.filter(active=True)

	def lastmod(self, obj):
		return obj.date_modified