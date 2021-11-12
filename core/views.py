from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import *
from .forms import *

def home(request):
	form = ContactForm()
	all_products = Product.objects.all()
	context = {'all_products':all_products, 'form':form}
	return render(request, 'home.html', context)

def contact(request):
	form = ContactForm(request.POST or None)
	if request.method == 'POST':
		if form.is_valid():
			form.save()

			# send email to admin
			# send_email([])

			return JsonResponse({'error_message':''})
		return JsonResponse({'error_message': str(form.errors.as_text())})
	return redirect('home')

def text(request):
	content = '943DDDB6088FBE65DA6397AE8FE3EC712876859864C423C9D0D83A6474DCC4EE\nsectigo.com'
	return HttpResponse(content, content_type='text/plain')