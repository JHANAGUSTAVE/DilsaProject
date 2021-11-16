<template>
	<main>
		<nav class="navbar navbar-expand-lg navbar-dark fixed-top navbar-shrink" id="mainNav">
			<div class="container">
				<!-- <a class="navbar-brand" href="#page-top">DILSA</a> -->
				<a class="navbar-brand" href="#page-top"><img src="@/assets/img/navbar-logo.jpg" alt="..." /></a>

				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
					Menu
					<i class="fas fa-bars ms-1"></i>
				</button>
				<div class="collapse navbar-collapse" id="navbarResponsive">
					<ul class="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
						<li class="nav-item"><a class="nav-link" href="#services">{{$t("Serv")}}</a></li>
						<li class="nav-item"><a class="nav-link" href="#produits">{{$t("Prod")}}</a></li>
						<li class="nav-item"><a class="nav-link" href="#about">{{$t("Abt")}}</a></li>
						<li class="nav-item"><a class="nav-link" href="#team">{{$t("Tm")}}</a></li>
						<li class="nav-item"><a class="nav-link" href="#contact">{{$t("Ctc")}}</a></li>
					</ul>
					<div>
						<ul> <b-dropdown variant="outline-warning" split split-href="#" :text="$t('Lang')" class="m-2 pl-2">
							<li v-for="entry in languages" :key="entry.title">
								<b-dropdown-item @click="(e)=>changeLocale(entry.language)" href="#">
									<span class="ml-2"><flag :iso="entry.flag" v-bind:squared=false /> {{entry.title}}</span>
								</b-dropdown-item>
							</li>
							</b-dropdown>
						</ul> 
					</div>
				</div>
			</div>
		</nav>
		<!-- Masthead-->
		<header class="masthead">
			<div class="container">
				<section style="background-color: rgba(0, 0, 0, 0.8);padding: 20px; margin-bottom: 4rem;"><div class="masthead-subheading">{{$t("WTDILSA")}}</div>
					<!-- <div class="masthead-heading text-uppercase">{{$t("ItsNiceToMeetYou")}}</div> -->
				</section> 
			
				<a class="btn btn-primary btn-xl text-uppercase" href="#services">{{$t("tellMeMore")}}</a>
			</div>
		</header>
		<!-- Services-->
		<section class="page-section" id="services">
			<div class="container">
				<div class="text-center">
					<h3 class="section-heading text-uppercase">{{$t("SACS")}}</h3>
					<h4 class="section-subheading text-muted">{{$t("SACSTXT")}}</h4>
				</div>
				<div class="row text-center">
					<div class="col-md-4">
						<img height="170px" width="170px" class="rounded-circle" :src="imgAS" alt="alt" />
						<h4 class="my-3">{{$t("adn")}}</h4>
						<p class="text-muted">{{$t("adntxt")}}</p>
					</div>
					<div class="col-md-4">
                        <img height="170px" width="170px" class="rounded-circle" :src="img1" alt="alt" />
                        
						<h4 class="my-3">{{$t("Rad")}}</h4>
						<p class="text-muted">{{$t("Radtxt")}}</p>
					</div>
					<div class="col-md-4">
						<img height="170px" width="170px" class="rounded-circle" :src="imgSc" alt="alt" />
						<h4 class="my-3">{{$t("SACS")}}</h4>
						<p class="text-muted">{{$t("SACSTXT1")}}</p>
					</div>
				</div>
			</div>
		</section>
		<!-- Promotions Grid-->

		<div class="row">
			<div class="col-md-10 offset-md-1">
				<div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
					<div class="carousel-indicators">
						<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
						<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
						<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
					</div>
					<div class="carousel-inner">
						<div class="carousel-item active">
						<img class="d-block w-100" src="https://www.joomshaper.com/images/2016/08/04/best-10-free-joomla-templates.jpg"/>
						<div class="carousel-caption d-none d-md-block">
							<h5>First slide label</h5>
							<p>Some representative placeholder content for the first slide.</p>
						</div>
						</div>

						<div class="carousel-item">
						<img class="d-block w-100" src="https://images.all-free-download.com/images/graphicthumb/christmas_sale_flyers_templates_classic_santa_fir_trees_decor_6843055.jpg"/>
						<div class="carousel-caption d-none d-md-block">
							<h5>First slide label</h5>
							<p>Some representative placeholder content for the first slide.</p>
						</div>
						</div>
						
					</div>
					<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Previous</span>
					</button>
					<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Next</span>
					</button>
				</div>
			</div>
		</div>

		
		<!-- produits Grid-->
		<section class="page-section bg-light" id="produits">
			<div class="container">
				<div class="text-center">
					<h2 class="section-heading text-uppercase">Produits</h2>
				</div>
				<div class="row" v-if='typeof(products) !== "undefined" && products != null'>
					<div
						v-for='product in products' :key='product.id' class="col-lg-4 col-sm-6 mb-4">
						<!-- produits item 2-->
						<div class="portfolio-item">
							<a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal2">
								<div class="portfolio-hover">
									<div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
								</div>
								<img class="img-fluid" src="@/assets/img/portfolio/2.jpg" alt="..." />
							</a>
							<div class="portfolio-caption">
								<div class="portfolio-caption-heading">{{product.name}}</div>
								<div class="portfolio-caption-subheading text-muted">Diesel</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>



		<!-- About-->
		<section class="page-section" id="about">
			<div class="container">
				<div class="text-center">
					<h2 class="section-heading text-uppercase">{{$t("Abt")}}</h2>
				</div>
				<ul class="timeline">
					<li>
						<div class="timeline-image"><img height="170px" width="170px" class="rounded-circle" :src="imgB" alt="..." />></div>
						<div class="timeline-panel">
							<div class="timeline-heading">
								<h4 class="subheading">{{$t("OHB")}}</h4>
							</div>
							<div class="timeline-body"><p class="text-muted">{{$t("tOHB")}}</p></div>
						</div>
					</li>
					<li class="timeline-inverted">
						<div class="timeline-image"><img height="170px" width="170px" class="rounded-circle" :src="imgSc" alt="..." /></div>
						<div class="timeline-panel">
							<div class="timeline-heading">
								<h4 class="subheading">{{$t("AAB")}}</h4>
							</div>
							<div class="timeline-body"><p class="text-muted">{{$t("tAAB")}} </p></div>
						</div>
					</li>
					<li>
						<div class="timeline-image"><img height="170px" width="170px" class="rounded-circle" :src="imgTS" alt="..." /></div>
						<div class="timeline-panel">
							<div class="timeline-heading">
							<h4 class="subheading">{{$t("TFS")}}</h4>
							</div>
							<div class="timeline-body"><p class="text-muted">{{$t("tTFS")}} </p></div>
						</div>
					</li>
					<li class="timeline-inverted">
						<div class="timeline-image"><img height="170px" width="170px" class="rounded-circle" :src="imgPTE" alt="..." /></div>
						<div class="timeline-panel">
							<div class="timeline-heading">
								<h4 class="subheading">{{$t("PTE")}}</h4>
							</div>
							<div class="timeline-body"><p class="text-muted">{{$t("tPTE")}}
							</p></div>
						</div>
					</li>
					<li class="timeline-inverted">
						<div class="timeline-image">
							<h4>
								Be Part
								<br />
								Of Our
								<br />
								Story!
							</h4>
						</div>
					</li>
				</ul>
			</div>
		</section>
		<!-- Team-->
		<section class="page-section bg-light" id="team">
			<div class="container">
				<div class="text-center">
					<h2 class="section-heading text-uppercase">SUPPORT AND CUSTOMER SERVICE</h2>
				</div>
				<div class="row">
					<div class="col-lg-4">
						<div class="team-member">
							<img class="mx-auto rounded-circle" src="@/assets/img/team/1.jpg" alt="..." />
							<h4>Parveen Anand</h4>
							<p class="text-muted">Lead Designer</p>
							<a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-twitter"></i></a>
							<a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-facebook-f"></i></a>
							<a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-linkedin-in"></i></a>
						</div>
					</div>
					<div class="col-lg-4">
						<div class="team-member">
							<img class="mx-auto rounded-circle" src="@/assets/img/team/2.jpg" alt="..." />
							<h4>Diana Petersen</h4>
							<p class="text-muted">Lead Marketer</p>
							<a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-twitter"></i></a>
							<a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-facebook-f"></i></a>
							<a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-linkedin-in"></i></a>
						</div>
					</div>
					<div class="col-lg-4">
						<div class="team-member">
							<img class="mx-auto rounded-circle" src="@/assets/img/team/3.jpg" alt="..." />
							<h4>Larry Parker</h4>
							<p class="text-muted">Lead Developer</p>
							<a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-twitter"></i></a>
							<a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-facebook-f"></i></a>
							<a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-linkedin-in"></i></a>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-8 mx-auto text-center"><p class="large text-muted">Since its creation the company has been working in collaboration with a wide range of partners. It has more ten distributors across the company. For over 20 years, it has developped relationship with Redat SpA, Diesel Components, Central Turbos, Southeast Power Systems and is the representative Robert Bosch, Zexel, Stanadyne  in Haiti. Furthermore, the company is an active member of the worldwide diesel specialist association (ADS).</p></div>
				</div>
			</div>
		</section>
		<!-- Clients-->
		<!-- <div class="py-5">
			<div class="container">
				<div class="row align-items-center">
					<div class="col-md-3 col-sm-6 my-3">
						<a href="#!"><img class="img-fluid img-brand d-block mx-auto" src="@/assets/img/logos/microsoft.svg" alt="..." /></a>
					</div>
					<div class="col-md-3 col-sm-6 my-3">
						<a href="#!"><img class="img-fluid img-brand d-block mx-auto" src="@/assets/img/logos/google.svg" alt="..." /></a>
					</div>
					<div class="col-md-3 col-sm-6 my-3">
						<a href="#!"><img class="img-fluid img-brand d-block mx-auto" src="@/assets/img/logos/facebook.svg" alt="..." /></a>
					</div>
					<div class="col-md-3 col-sm-6 my-3">
						<a href="#!"><img class="img-fluid img-brand d-block mx-auto" src="@/assets/img/logos/ibm.svg" alt="..." /></a>
					</div>
				</div>
			</div>
		</div> -->
		<!-- Contact-->
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
				<form id="contactForm" data-sb-form-api-token="API_TOKEN">
					<div class="row align-items-stretch mb-5">
						<div class="col-md-6">
							<div class="form-group">
								<!-- Name input-->
								<input class="form-control" id="name" type="text" placeholder="Your Name *" data-sb-validations="required" />
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
							<a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
						</div>
					</div>
					<!-- Submit error message-->
					<!---->
					<!-- This is what your users will see when there is-->
					<!-- an error submitting the form-->
					<div class="d-none" id="submitErrorMessage"><div class="text-center text-danger mb-3">Error sending message!</div></div>
					<!-- Submit Button-->
					<div class="text-center"><button class="btn btn-primary btn-xl " id="submitButton" type="submit">Send Message</button></div>
				</form>
			</div>
		</section>
		<!-- Footer-->
		<footer class="footer py-4">
			<div class="container">
				<div class="row align-items-center">
					<div class="col-lg-4 text-lg-start">Copyright &copy; Your Website 2021</div>
					<div class="col-lg-4 my-3 my-lg-0">
						<a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-twitter"></i></a>
						<a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-facebook-f"></i></a>
						<a class="btn btn-dark btn-social mx-2" href="#!"><i class="fab fa-linkedin-in"></i></a>
					</div>
					<div class="col-lg-4 text-lg-end">
						<a class="link-dark text-decoration-none me-3" href="#!">Privacy Policy</a>
						<a class="link-dark text-decoration-none" href="#!">Terms of Use</a>
					</div>
				</div>
			</div>
		</footer>
		<!-- Portfolio Modals-->
		<!-- Portfolio item 1 modal popup-->
		<div class="portfolio-modal modal fade" id="portfolioModal1" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="close-modal" data-bs-dismiss="modal"><img src="@/assets/img/close-icon.svg" alt="Close modal" /></div>
					<div class="container">
						<div class="row justify-content-center">
							<div class="col-lg-8">
								<div class="modal-body">
									<!-- Project details-->
									<h2 class="text-uppercase">Project Name</h2>
									<p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
									<img class="img-fluid d-block mx-auto" src="@/assets/img/portfolio/1.jpg" alt="..." />
									<p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
									<ul class="list-inline">
										<li>
											<strong>Client:</strong>
											Threads
										</li>
										<li>
											<strong>Category:</strong>
											Illustration
										</li>
									</ul>
									<button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
										<i class="fas fa-times me-1"></i>
										Close Project
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Portfolio item 2 modal popup-->
		<div class="portfolio-modal modal fade" id="portfolioModal2" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="close-modal" data-bs-dismiss="modal"><img src="@/assets/img/close-icon.svg" alt="Close modal" /></div>
					<div class="container">
						<div class="row justify-content-center">
							<div class="col-lg-8">
								<div class="modal-body">
									<!-- Project details-->
									<h2 class="text-uppercase">Project Name</h2>
									<p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
									<img class="img-fluid d-block mx-auto" src="@/assets/img/portfolio/2.jpg" alt="..." />
									<p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
									<ul class="list-inline">
										<li>
											<strong>Client:</strong>
											Explore
										</li>
										<li>
											<strong>Category:</strong>
											Graphic Design
										</li>
									</ul>
									<button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
										<i class="fas fa-times me-1"></i>
										Close Project
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Portfolio item 3 modal popup-->
		<div class="portfolio-modal modal fade" id="portfolioModal3" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="close-modal" data-bs-dismiss="modal"><img src="@/assets/img/close-icon.svg" alt="Close modal" /></div>
					<div class="container">
						<div class="row justify-content-center">
							<div class="col-lg-8">
								<div class="modal-body">
									<!-- Project details-->
									<h2 class="text-uppercase">Project Name</h2>
									<p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
									<img class="img-fluid d-block mx-auto" src="@/assets/img/portfolio/3.jpg" alt="..." />
									<p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
									<ul class="list-inline">
										<li>
											<strong>Client:</strong>
											Finish
										</li>
										<li>
											<strong>Category:</strong>
											Identity
										</li>
									</ul>
									<button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
										<i class="fas fa-times me-1"></i>
										Close Project
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Portfolio item 4 modal popup-->
		<div class="portfolio-modal modal fade" id="portfolioModal4" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="close-modal" data-bs-dismiss="modal"><img src="@/assets/img/close-icon.svg" alt="Close modal" /></div>
					<div class="container">
						<div class="row justify-content-center">
							<div class="col-lg-8">
								<div class="modal-body">
									<!-- Project details-->
									<h2 class="text-uppercase">Project Name</h2>
									<p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
									<img class="img-fluid d-block mx-auto" src="@/assets/img/portfolio/4.jpg" alt="..." />
									<p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
									<ul class="list-inline">
										<li>
											<strong>Client:</strong>
											Lines
										</li>
										<li>
											<strong>Category:</strong>
											Branding
										</li>
									</ul>
									<button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
										<i class="fas fa-times me-1"></i>
										Close Project
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Portfolio item 5 modal popup-->
		<div class="portfolio-modal modal fade" id="portfolioModal5" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="close-modal" data-bs-dismiss="modal"><img src="@/assets/img/close-icon.svg" alt="Close modal" /></div>
					<div class="container">
						<div class="row justify-content-center">
							<div class="col-lg-8">
								<div class="modal-body">
									<!-- Project details-->
									<h2 class="text-uppercase">Project Name</h2>
									<p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
									<img class="img-fluid d-block mx-auto" src="@/assets/img/portfolio/5.jpg" alt="..." />
									<p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
									<ul class="list-inline">
										<li>
											<strong>Client:</strong>
											Southwest
										</li>
										<li>
											<strong>Category:</strong>
											Website Design
										</li>
									</ul>
									<button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
										<i class="fas fa-times me-1"></i>
										Close Project
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Portfolio item 6 modal popup-->
		<div class="portfolio-modal modal fade" id="portfolioModal6" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="close-modal" data-bs-dismiss="modal"><img src="@/assets/img/close-icon.svg" alt="Close modal" /></div>
					<div class="container">
						<div class="row justify-content-center">
							<div class="col-lg-8">
								<div class="modal-body">
									<!-- Project details-->
									<h2 class="text-uppercase">Project Name</h2>
									<p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
									<img class="img-fluid d-block mx-auto" src="@/assets/img/portfolio/6.jpg" alt="..." />
									<p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
									<ul class="list-inline">
										<li>
											<strong>Client:</strong>
											Window
										</li>
										<li>
											<strong>Category:</strong>
											Photography
										</li>
									</ul>
									<button class="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
										<i class="fas fa-times me-1"></i>
										Close Project
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
	// import { Navbar } from "@/components/Navbar"; 
	import i18n from '../../plugins/i18n';
	import img1 from '@/assets/img/services/IMG-01.jpg';
	import imgBg from '@/assets/img/services/IMG-20211101-WA0065.jpg'
	import imgSc from '@/assets/img/services/IMG-20211101-WA0065.jpg'
	import imgAS from '@/assets/img/services/IMG-20211101-WA0056.jpg'
	import imgPTE from '@/assets/img/about/IMG-20211101-WA0061.jpg'
	import imgTS from '@/assets/img/about/IMG-20211101-WA0071.jpg'
	import imgB from '@/assets/img/about/IMG-20211101-WA0069.jpg'
	export default {
		name: 'Home',
		props: {
			msg: String
		},
		data(){
			return {
				languages : [
					{ flag: 'us', language: 'en', title: 'English' },
					{ flag: 'es', language: 'es', title: 'Español' },
					{ flag: 'fr', language: 'fr', title: 'Francais' },
				],
				img1, imgBg, imgSc,	imgAS, imgPTE, imgTS, imgB,	}
		},
		created() {
			this.callProducts();
		},
		// components: {Navbar,
		// },
		methods:{
			callProducts(){
				this.$store.dispatch("callProducts");
			},
			changeLocale(locale){
				i18n.locale = locale;
			}
		},
		watch:{
			// products(v){
				// console.info(v)
			// }
		},
		computed: {
			products() {
				console.info(this.$store.getters.products)
				return this.$store.getters.products;
			},
		}
	}
</script>
<style>
	.dropdown ul.dropdown-menu.show{
		padding-left: 12px;
	}
	.dropdown ul.dropdown-menu.show li{
		cursor: pointer;
	}
	
</style>