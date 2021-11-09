from django.shortcuts import render, redirect
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