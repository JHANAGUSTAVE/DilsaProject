from django import forms 
from .models import Contact
from django.utils.translation import ugettext_lazy as _
from django.core.validators import validate_email

class ContactForm(forms.ModelForm):
	class Meta:
		model = Contact 
		fields = ('name', 'email', 'phone', 'message')
		
	def __init__(self, *args, **kwargs):
		super(ContactForm, self).__init__(*args, **kwargs)
		
		self.fields['name'].widget.attrs.update({'class':'form-control', 'placeholder': _('Your Name *')})
		self.fields['email'].widget.attrs.update({'class':'form-control', 'placeholder': _('Your Email *')})
		self.fields['phone'].widget.attrs.update({'class':'form-control', 'placeholder': _('Your Phone *')})
		self.fields['message'].widget.attrs.update({'class':'form-control', 'placeholder': _('Your Message *')})
