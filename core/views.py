from django.shortcuts import render, redirect, HttpResponseRedirect
from django.http import HttpResponse
from .models import *
from .forms import *
from urllib.parse import unquote
from django.conf import settings

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



def set_language(request):
	"""
	Redirect to a given URL while setting the chosen language in the session
	(if enabled) and in a cookie. The URL and the language code need to be
	specified in the request parameters.

	Since this view changes how the user will see the rest of the site, it must
	only be accessed as a POST request. If called as a GET request, it will
	redirect to the page in the request (the 'next' parameter) without changing
	any state.
	"""
	from django.utils.http import is_safe_url
	LANGUAGE_QUERY_PARAMETER = 'language'
	from django.utils.translation import (
	    LANGUAGE_SESSION_KEY, check_for_language, get_language,
	)
	from django.urls import translate_url
	next = request.POST.get('next', request.GET.get('next'))
	if ((next or not request.is_ajax()) and
			not is_safe_url(url=next, allowed_hosts={request.get_host()}, require_https=request.is_secure())):
		next = request.META.get('HTTP_REFERER')
		next = next and unquote(next)  # HTTP_REFERER may be encoded.
		if not is_safe_url(url=next, allowed_hosts={request.get_host()}, require_https=request.is_secure()):
			next = '/'

	queries = unquote(request.GET.urlencode())
	if queries:
		next += ("?" + queries)

	response = HttpResponseRedirect(next) if next else HttpResponse(status=204)
	if request.method == 'POST':
		lang_code = request.POST.get(LANGUAGE_QUERY_PARAMETER)
		if lang_code and check_for_language(lang_code):
			if next:
				next_trans = translate_url(next, lang_code)
				if next_trans != next:
					response = HttpResponseRedirect(next_trans)
			if hasattr(request, 'session'):
				request.session[LANGUAGE_SESSION_KEY] = lang_code
			response.set_cookie(
				settings.LANGUAGE_COOKIE_NAME, lang_code,
				max_age=settings.LANGUAGE_COOKIE_AGE,
				path=settings.LANGUAGE_COOKIE_PATH,
				domain=settings.LANGUAGE_COOKIE_DOMAIN,
			)
	return response