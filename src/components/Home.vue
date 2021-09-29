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
						<li class="nav-item"><a class="nav-link" href="#services">Services</a></li>
						<li class="nav-item"><a class="nav-link" href="#produits">Produits</a></li>
						<li class="nav-item"><a class="nav-link" href="#about">About</a></li>
						<li class="nav-item"><a class="nav-link" href="#team">Team</a></li>
						<li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
					</ul>
				</div>
			</div>
		</nav>
		<!-- Masthead-->
		<header class="masthead">
			<div class="container">
				<section style="background-color: rgba(0, 0, 0, 0.8);padding: 20px; margin-bottom: 4rem;"><div class="masthead-subheading">Welcome To Diesel Injection Laboratory S.A!</div>
					<div class="masthead-heading text-uppercase">It's Nice To Meet You</div>
				</section> 
				<a class="btn btn-primary btn-xl text-uppercase" href="#services">Tell Me More</a>
			</div>
		</header>
		<!-- Services-->
		<section class="page-section" id="services">
			<div class="container">
				<div class="text-center">
					<h3 class="section-heading text-uppercase">SUPPORT AND CUSTOMER SERVICE</h3>
					<h4 class="section-subheading text-muted">The company is very sensitive to the customer 
					satisfaction. A team of two persons is dedicated five days a week to answer the customer's inquiries and complains.</h4>
				</div>
				<div class="row text-center">
					<div class="col-md-4">
						<span class="fa-stack fa-4x">
							<i class="fas fa-circle fa-stack-2x text-primary"></i>
							<i class="fas fa-shopping-cart fa-stack-1x fa-inverse"></i>
						</span>
						<h4 class="my-3">Engine</h4>
						<p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
					</div>
					<div class="col-md-4">
						<span class="fa-stack fa-4x">
							<i class="fas fa-circle fa-stack-2x text-primary"></i>
							<i class="fas fa-laptop fa-stack-1x fa-inverse"></i>
						</span>
						<h4 class="my-3">Engine</h4>
						<p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
					</div>
					<div class="col-md-4">
						<span class="fa-stack fa-4x">
							<i class="fas fa-circle fa-stack-2x text-primary"></i>
							<i class="fas fa-lock fa-stack-1x fa-inverse"></i>
						</span>
						<h4 class="my-3">Engine</h4>
						<p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
					</div>
				</div>
			</div>
		</section>

		<!-- produits Grid-->
		<section class="page-section bg-light" id="produits">
			<div class="container">
				<div class="text-center">
					<h2 class="section-heading text-uppercase">Produits {{JSON.stringify(products)}}</h2>
					<h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
				</div>
				<div class="row">
					<div class="col-lg-4 col-sm-6 mb-4">
						<!-- produits item 1-->
						<div class="portfolio-item">
							<a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal1">
								<div class="portfolio-hover">
									<div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
								</div>
								<img class="img-fluid" src="@/assets/img/portfolio/1.jpg" alt="..." />
							</a>
							<div class="portfolio-caption">
								<div class="portfolio-caption-heading">Diesel</div>
								<div class="portfolio-caption-subheading text-muted">Illustration</div>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-sm-6 mb-4">
						<!-- produits item 2-->
						<div class="portfolio-item">
							<a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal2">
								<div class="portfolio-hover">
									<div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
								</div>
								<img class="img-fluid" src="@/assets/img/portfolio/2.jpg" alt="..." />
							</a>
							<div class="portfolio-caption">
								<div class="portfolio-caption-heading">Explore</div>
								<div class="portfolio-caption-subheading text-muted">Diesel</div>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-sm-6 mb-4">
						<!-- produits item 3-->
						<div class="portfolio-item">
							<a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal3">
								<div class="portfolio-hover">
									<div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
								</div>
								<img class="img-fluid" src="@/assets/img/portfolio/3.jpg" alt="..." />
							</a>
							<div class="portfolio-caption">
								<div class="portfolio-caption-heading">Finish</div>
								<div class="portfolio-caption-subheading text-muted">Identity</div>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-sm-6 mb-4 mb-lg-0">
						<!-- produits item 4-->
						<div class="portfolio-item">
							<a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal4">
								<div class="portfolio-hover">
									<div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
								</div>
								<img class="img-fluid" src="@/assets/img/portfolio/4.jpg" alt="..." />
							</a>
							<div class="portfolio-caption">
								<div class="portfolio-caption-heading">Lines</div>
								<div class="portfolio-caption-subheading text-muted">Branding</div>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-sm-6 mb-4 mb-sm-0">
						<!-- produits item 5-->
						<div class="portfolio-item">
							<a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal5">
								<div class="portfolio-hover">
									<div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
								</div>
								<img class="img-fluid" src="@/assets/img/portfolio/5.jpg" alt="..." />
							</a>
							<div class="portfolio-caption">
								<div class="portfolio-caption-heading">Southwest</div>
								<div class="portfolio-caption-subheading text-muted">Diesel</div>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-sm-6">
						<!-- produits item 6-->
						<div class="portfolio-item">
							<a class="portfolio-link" data-bs-toggle="modal" href="#portfolioModal6">
								<div class="portfolio-hover">
									<div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
								</div>
								<img class="img-fluid" src="@/assets/img/portfolio/6.jpg" alt="..." />
							</a>
							<div class="portfolio-caption">
								<div class="portfolio-caption-heading">Diesel</div>
								<div class="portfolio-caption-subheading text-muted">Branding</div>
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
					<h2 class="section-heading text-uppercase">About US</h2>
					<h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
				</div>
				<ul class="timeline">
					<li>
						<div class="timeline-image"><img class="rounded-circle img-fluid" src="@/assets/img/about/1.jpg" alt="..." /></div>
						<div class="timeline-panel">
							<div class="timeline-heading">
								<h4>1992-2021</h4>
								<h4 class="subheading">Our Humble Beginnings</h4>
							</div>
							<div class="timeline-body"><p class="text-muted">DIL  is the foremost diesel laboratory in Haiti. It is specialized in testing, repairing and calibrating pumps, injectors, turbo chargers and most types of other diesel injectors (marine and generators applications). </p></div>
						</div>
					</li>
					<li class="timeline-inverted">
						<div class="timeline-image"><img class="rounded-circle img-fluid" src="@/assets/img/about/2.jpg" alt="..." /></div>
						<div class="timeline-panel">
							<div class="timeline-heading">
								<h4>March 2011</h4>
								<h4 class="subheading">An Agency is Born</h4>
							</div>
							<div class="timeline-body"><p class="text-muted">Diesel Injection Laboratory SA ( Fomer Precision Injection Shop ) is a well established haitian diesel workshop company. The company has been operating in Haiti since 1992. </p></div>
						</div>
					</li>
					<li>
						<div class="timeline-image"><img class="rounded-circle img-fluid" src="@/assets/img/about/3.jpg" alt="..." /></div>
						<div class="timeline-panel">
							<div class="timeline-heading">
								<h4>December 2015</h4>
								<h4 class="subheading">Transition to Full Service</h4>
							</div>
							<div class="timeline-body"><p class="text-muted">Highest standard of performance in delivering services is one of the key of success of the company. PIS keeps an open eye on the latest development of the latest technologies and equipment available worldwide in the field of diesel systems. The company is also interested in the development of clean energy such biodiesel, solar and wind energies. </p></div>
						</div>
					</li>
					<li class="timeline-inverted">
						<div class="timeline-image"><img class="rounded-circle img-fluid" src="@/assets/img/about/4.jpg" alt="..." /></div>
						<div class="timeline-panel">
							<div class="timeline-heading">
								<h4>July 2020</h4>
								<h4 class="subheading">Phase Two Expansion</h4>
							</div>
							<div class="timeline-body"><p class="text-muted">One of its goals is to meet the needs of its customers in the respect of the environment. The company  purchased new Hartridge equipment Sabre CRI Master and  EU INJECTOR TESTER AND ACCESSORIES and Motortool MT-5600D, .
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
					<h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
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
		<div class="py-5">
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
		</div>
		<!-- Contact-->
		<section class="page-section" id="contact">
			<div class="container">
				<div class="text-center">
					<h2 class="section-heading text-uppercase">Contact Us</h2>
					<h3 class="section-subheading text-muted">DIL is located at 29, chareron street, Port-au-Prince, Haiti in  a two stages built facility of 600 m2. At this time, the company operates also at 29 Lafleur Ducheine street  for the administration and storage and the modern workshop in a hall of 200 m2.</h3>
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
					<div class="text-center"><button class="btn btn-primary btn-xl text-uppercase disabled" id="submitButton" type="submit">Send Message</button></div>
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
	export default {
		name: 'HelloWorld',
		props: {
			msg: String
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
		},
		watch:{
			
		},
		computed: {
			products() {
				return this.$store.getters.products;
			},
		}
	}
</script>
