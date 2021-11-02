<template>
<section class="page-section" id="contact">
			<div class="container">
				<div class="text-center">
					<h2 class="section-heading text-uppercase">{{$t("ctu")}}</h2>
					<h3 class="section-subheading text-muted">{{$t("ctutxt")}}</h3>
				</div>
				<!-- * * * * * * * * * * * * * * *-->
				<!-- * * SB Forms Contact Form * *-->
				<!-- * * * * * * * * * * * * * * *-->
				<!-- This form is pre-integrated with SB Forms.-->
				<!-- To make this form functional, sign up at-->
				<!-- https://startbootstrap.com/solution/contact-forms-->
				<!-- to get an API token!-->
				<form @submit.prevent="submit" @reset="onReset">
					<div class="row align-items-stretch mb-5">
						<div class="col-md-6">
							<div class="form-group">
								<!-- Name input-->
								<input class="form-control" id="name"  v-model="name" type="text" placeholder="Your Name *" data-sb-validations="required" />
								<div class="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
							</div>
							<div class="form-group">
								<!-- Email address input-->
								<input class="form-control" id="email" type="email" placeholder="Your Email *" data-sb-validations="required,email" />
								<div class="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
								<div class="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
							</div>
							<div class="form-group mb-md-0">
								<!-- Phone number input-->
								<input class="form-control" id="phone" type="tel" placeholder="Your Phone *" data-sb-validations="required" />
								<div class="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
							</div>
						</div>
						<div class="col-md-6">
							<div class="form-group form-group-textarea mb-md-0">
								<!-- Message input-->
								<textarea class="form-control" id="message" placeholder="Your Message *" data-sb-validations="required"></textarea>
								<div class="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
							</div>
						</div>
					</div>
					<!-- Submit success message-->
					<!---->
					<!-- This is what your users will see when the form-->
					<!-- has successfully submitted-->
					<div class="d-none" id="submitSuccessMessage">
						<div class="text-center text-white mb-3">
							<div class="fw-bolder">Form submission successful!</div>
							To activate this form, sign up at
							<br />
							<a href=" jhana.gustave@gmail.com"> jhana.gustave@gmail.com</a>
						</div>
					</div>
				
					<div class="d-none" id="submitErrorMessage"><div class="text-center text-danger mb-3">Error sending message!</div></div>
					<!-- Submit Button-->
					<div class="text-center"><button class="btn btn-primary btn-xl text-uppercase" id="submitButton" type="submit">Send Message</button></div>
				</form>
			</div>
		</section>
        </template>
<script>
    import axios from "axios";
export default {
  name: "Contact",
  data() {
    return {
      name: "",
      email: "",
      message: "",
    };
  },
  computed: {
    formValid() {
      const { name, email, message } = this;
      return (
        name.length > 0 &&
        /(.+)@(.+){2,}.(.+){2,}/.test(email) &&
        message.length > 0
      );
    },
  },
  methods: {
    onReset() {
      this.name = "";
      this.email = "";
      this.message = "";
    },
    submit() {
            console.log("errrrr")

      if (!this.formValid) {
        //return;
      }
      
      const { name, email, message } = this;
      
      // localStorage.setItem("messages", JSON.stringify(messages));
      axios.post("http://localhost:3001/contact", {name, email, message },
      {
         headers:{
             'Authorization': "Bearer zxcvbnefght53hbxc006bcc12fsdgfsdsdf "
         } 
      }
      )
    },
  },
};
</script>
