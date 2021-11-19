from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import *
from .forms import *

def home(request):
	form = ContactForm()
	all_products = Product.objects.all()
	promotion_list = Promotion.objects.filter(active=True, photo__isnull=False).order_by('position')
	context = {'all_products':all_products, 'form':form, 'promotion_list':promotion_list}
	return render(request, 'home.html', context)

def contact(request):
	form = ContactForm(request.POST or None)
	if request.method == 'POST':
		if form.is_valid():
			contact = form.save()

			from django.core.mail import send_mail

			send_mail(
				'Message from %s' % contact.name,
				contact.message,
				'groupcode9@gmail.com',
				['rynnika@gmail.com', 'jhana.gustave@gmail.com'],
				fail_silently=True,
			)
	return redirect('home')

def text(request):
	content = '943DDDB6088FBE65DA6397AE8FE3EC712876859864C423C9D0D83A6474DCC4EE\nsectigo.com'
	return HttpResponse(content, content_type='text/plain')