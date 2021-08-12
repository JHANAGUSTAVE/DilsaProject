<template>
	<div class="wrapper" v-if="user">
		<ul class="dots">
    <li>
      <a href="#">
      <span class="glyphicon glyphicon-envelope"><mark class="big swing">7</mark></span>
      </a>  
    </li>
    
  </ul> 
		<b-navbar toggleable="lg" type="dark" fixed='top' variant='info' class='box-shadow-navbar' style="height: 55px">
			<b-navbar-brand href="#"></b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav class="ml-auto hasdark">
					<b-nav-text class="mr-4" v-if="checkPrivilege(userDetail,'PRIV_VIEW_NOTIFICATION')">
						<span class="dots">
							<span class="spana fa-stack ml-3 mb-lg-0" data-toggle='popover' id="popover-non-validate-report">
								<i class="fas fa-bell fa-stack-1x fa-inverse"></i>
								<span v-if="totalNotifications() > 0"><mark :class="'big swing ' + (totalNotifications() > 99) ? 'reach100' : ''">{{totalNotifications() > 99 ? '99+' : totalNotifications()}}</mark></span>
							</span> 
						</span>

						<b-popover target="popover-non-validate-report" triggers="click" :show.sync="popoverShow" placement="auto"container="my-container" :custom-class="(userDetail && userDetail.data[0].Users.theme !== 'light' ? 'dark':'')" ref="popover" style="max-width: 290px">

							<template v-slot:title>
								<b-button @click="onClose" class="close" aria-label="Close">
									<span class="d-inline-block" aria-hidden="true">&times;</span>
								</b-button>
								<h5 class="">Notifications</h5> 
							</template>
							<div v-if="totalNotifications() <= 0">
								<div class="empty-content text-center" style="color: #777">
									<p><i class="fas fa-bell-slash mb-2"></i></p>
									<h4>No notifications</h4>
								</div>
							</div>
							<b-list-group flush>
								<template v-if='totalReports() > 0'>
									<p class="text-center">Non-Validate Reports</p> 
									<b-list-group-item class="nb-notification-group px-2 py-1 mb-3" v-for="report in reportListNonValidate.reports.slice(0,2)" :key="report.id" >
										<!-- <router-link :to="{ name: 'ValidationView', params: {'paramReportStatus': report.validated, 'paramReportType': report.type , 'paramReportId': report.id }}" :key='$route.fullPath'>
											<div class="text-left" style="font-size:12px">
												<h4>Period: {{ report.period }}</h4>
												<p class="mb-0">Generated on {{report.date}} <span class="float-right"><i class="fas fa-file" style="color:#17a2b8"></i></span></p>
											</div>
										</router-link> -->
										<a :href="'/#/validation/?id='+report.id+'&status='+report.validated+'&type='+report.type">
											<div class="text-left" style="font-size:12px">
												<h4>Period: {{ report.period }}</h4>
												<p class="mb-0">Generated on {{report.date}} <span class="float-right"><i class="fas fa-file" style="color:#17a2b8"></i></span></p>
											</div>
										</a>
									</b-list-group-item>
									<p class="text-center"><router-link style="color: #17a2b8" to="/validation">{{$t("STransactionAlert.View_more")}} ({{totalReports() > 2 ? totalReports() - 2: ""}})</router-link></p>
								</template>

								


								<template v-if='totalAlerts() > 0'>
									<hr class="my-1"> 
									<p class="text-center">Alerts </p> 
									<b-list-group-item class="nb-notification-group px-2 py-1 mb-3" v-for="notificationItem in notification.notifications.slice(0,2).reverse()" :key="notificationItem.id" :title="notificationItem.name" >

										<div class="text-left" style="font-size:12px">
											<h4>{{$t('Notification.'+notificationItem.description)}} ({{notificationItem.detail}})</h4>
											<p class="mb-0">{{notificationItem.date_time}} <span class="float-right"><i class="fas fa-bell" style="color:#17a2b8"></i></span></p>
										</div>
									</b-list-group-item>

									<p class="text-center"><router-link style="color: #17a2b8" to="/notifications">{{$t("STransactionAlert.View_more")}} ({{totalAlerts() > 2 ? totalAlerts() - 2: ""}})</router-link></p>
								</template>
							</b-list-group>

						</b-popover>
					</b-nav-text>
					<b-nav-item-dropdown right>
						<template v-slot:button-content>
							<img v-if="userDetail" class="user_img float-left" :src="profilePic()" alt>
							<div v-if="userDetail" class="float-lg-right float-left user_roles ml-2 mb-4 mb-lg-0">
								<h6 style="margin:0">
									{{ userDetail.data[0].Users.first_name +  " " + userDetail.data[0].Users.last_name }}
								</h6>
								<small>{{userDetail.data[0].Users.role == "1" ? "Admin" : userDetail.data[0].Users.role == "2" ? "Monitor" : "" }}</small>
								<span class="fas fa-caret-down float-right d-none d-lg-inline mt-1" style="margin-right: 2px"></span>
							</div>
						</template>
						<b-dropdown-item v-if="userDetail && userDetail.data[0].Users.role == '1'" @click="goToPage('/administration')"><i class="fa fa-users fa-fw text-secondary"></i> {{$t("Navigation.Administration")}}</b-dropdown-item>
						<b-dropdown-divider v-if="userDetail && userDetail.data && userDetail.data[0].Users.role == '1'"></b-dropdown-divider> 

						<b-dropdown-item  @click="goToPage('/setting')"><i class="fa fa-cog fa-fw text-secondary"></i> {{ $t("Navbar.setting")}}</b-dropdown-item> 
						<b-dropdown-divider></b-dropdown-divider>

						<b-dropdown-item @click="goToPage('/notifications')"><i class="fa fa-bell fa-fw text-secondary"></i> Notifications</b-dropdown-item> 
						<b-dropdown-divider></b-dropdown-divider>

						<b-dropdown-item  @click="goToPage('/logs')"><i class="fa fa-tasks fa-fw text-secondary"></i> {{$t("Navbar.Log") }}</b-dropdown-item> 
						<b-dropdown-divider></b-dropdown-divider>
						<b-dropdown-item v-on:click="logout()"><i class="fa fa-power-off fa-fw text-secondary"></i> {{$t("Navbar.Logout")}}</b-dropdown-item>
					</b-nav-item-dropdown>
				</b-navbar-nav>
			</b-collapse>  
		</b-navbar>
	</div>
</template>

<script lang="js"> 
	import debounce from 'lodash.debounce'
	import layoutMixin from '@/mixins/layoutMixin'
	import checkPrivilege from '@/mixins/methods'
	import throttle from 'lodash.throttle' 
	import moment from "moment";

	export default  {
		name: 'navbar',
		components:{},
		mixins:[layoutMixin,checkPrivilege],
		data() {
			return { 
				testval:null,
				search: "", 
				idInterval:null,
				popoverShow: false,
			}
		},
		created(){
			this.refreshNotifications();
			this.launchInterval();
		},
		methods: {
			logout(){
				this.$store.dispatch("Auth/logout",{token:this.user.token})
			}
			,
			muserDetail(){
				this.$store.dispatch("callUsers",{token: this.user.token,user: this.user.user_id})

			},
			profilePic(){
				if (this.$store.getters.userDetail && this.$store.getters.userDetail.data) {
					return ( this.userDetail.data[0].Users.image_url !== null 
						? this.userDetail.data[0].Users.image_url: 'https://image.flaticon.com/icons/svg/23/23171.svg')
				}
			},
			changeLanguage(locale){
				if (locale !==null) {
					this.$store.dispatch("callLocaleLang",locale )
				}
			},
			refreshRole(){
				this.$store.dispatch("callUserRole",{token: this.user.token})
			},
			goToPage(path){
				this.$router.push(path)
			},
			launchInterval(){
				let that= this 
				this.idInterval = setInterval(function() { 
					that.callNonValidatedReportList() 
				}, 5* 30 * 1000);
			},
			callNonValidatedReportList: throttle(function(){   
				this.refreshNotifications()
			} ,5* 30 * 1000) ,
			onClose() {
				this.popoverShow = false
			},
			refreshNotifications(){
				this.callRolePrivilege();
				if(this.user){
					this.$store.dispatch("Report/callReportListNonValidate", {
						token: this.user.token,
						validated: 0
					})


					this.$store.dispatch("Report/callNotification", {
						token: this.user.token
					});
				}

			},
			
			callRolePrivilege() {
				if(this.user){
					this.$store.dispatch("callRolePrivilege", {
						token: this.user.token,
					})
				}
			},
			totalNotifications(){
				return this.totalReports() + this.totalAlerts();
			},
			totalReports(){
				let total = 0;
				if(typeof this.reportListNonValidate !== undefined && this.reportListNonValidate) // total of non validated reports
					total += Number(this.reportListNonValidate.length)
				return total
			},
			totalAlerts(){
				let total = 0;
				if(typeof this.notification !== undefined && this.notification && this.notification.notifications) // total of notifications
					total += Number(this.notification.notifications.length)
				return total
			},
		},
		computed: {
			user() {
				return this.$store.getters.user;
			},
			userDetail(){
				const val = this.$store.getters.userDetail;
				if(val != undefined && val != null)
					this.changeLanguage(val.data[0].Users.language)

				return val 
			},
			userRole(){
				return this.$store.getters.userRole;
			}, 
			globalSearch() {
				return this.$store.state.globalSearch
			},
			reportListNonValidate(){
				return this.$store.getters['Report/reportListNonValidate']
			},
			notification(){
				return this.$store.getters['Report/notification']
			},
			rolePrivilege() {
				return this.$store.getters.rolePrivilege;
			},
		},

		watch: {
			user(value) {
				if (typeof value !== undefined && value) { 
					this.$router.push("/");

				}else{
					this.$store.dispatch("callResetState");
					this.setLayout("FullScreenLayout");
					this.$router.push("/login");
				} 
			},
			//getting error from computed values
			error(value) {
				if (value) {
    				this.ContentLoader = false;
    				this.$notify({
    					group: "foo",
    					type: "error",
    					text: value
    				});
    			}
  			}, 
			globalSearch(value) {
				this.search = value
			},
		  	search: debounce(function(value) {
		  		this.$store.dispatch("callGlobalSearch", value)
		  		if(value != null && value != undefined && value != ""){
		  			this.$router.push({ name: 'Transactions', search: value}) 
		  		}
		  	}, 1000),
		},
		beforeDestroy(){
			clearInterval(this.idInterval)
		}
	}
</script>

<style scoped>
	b-form-input {
		width: 500px;
		margin: 0 auto;
	}

	.wrapper{
		margin-left:190px;
	}

	.navbar{
		position: fixed;
		top: 0;
		width: calc(100vw - 190px);
		margin-left: 190px;
		height:55px;
	}
	.nav__size_min .navbar{
		position: fixed;
		top: 0;
		width: calc(100vw - 60px);
		margin-left: 60px;
	}

	
	.round {
		background: #f3f6f8;
		border: 1px solid rgba(173, 177, 182, 0.1);
		box-sizing: border-box;
		box-shadow: 0px 5px 12px rgba(221, 228, 237, 0.5);
		border-radius: 60px;
	}
	.lighter {
		width: 95%;
	}
	.user_img {
		max-width: 35px;
		height: auto;
		align-self: center;
		border-radius: 50%;
	}
	@media only screen and (max-width: 768px) {
		/* For mobile phones: */
		[class*="col-"] {
			width: 100%;
		}
		.no-display{
			display: none;
		}

	} 

	.nb-notification-group{
		padding: 0;
	}

	.color-blue {
		color: #6485f7;
	}

	.dots * {
	  /* disable border-box from bootstrap */
	  box-sizing: content-box;
	  list-style-type: none;  
	}
	.dots .spana {
	  text-decoration: none;
	  font-size: 14px;
	  color: #34495e;
	  margin-top: 3px;
	  padding-bottom: -3px;
	}


	.dots mark {
	  -webkit-border-radius: 20px;
	  -moz-border-radius: 20px;
	  border-radius: 20px;   
	  border: 2px solid #FFF;
	  width: 20px;
	  height: 20px;  
	  background-color: #dc3545;
	  position: absolute;
	  top: -10px;
	  left: 20px;
	  font-size: 10px;
	  line-height: 20px;
	  font-family: 'Roboto', sans-serif;
	  font-weight: 400;
	  color: #FFF;
	  font-weight: 700;
	}
	.dots mark.reach100{
		padding-left:4px;
	}
	
	.dots > .spana > span > mark {
	  -webkit-animation-name: bounceIn;
	          animation-name: bounceIn;
	  -webkit-transform-origin: center bottom;
	      -ms-transform-origin: center bottom;
	          transform-origin: center bottom;
	  -webkit-animation-duration: 1s;
	          animation-duration: 1s;
	  -webkit-animation-fill-mode: both;
	          animation-fill-mode: both;   
	-webkit-animation-iteration-count: 1;
	        animation-iteration-count: 1;  
	}
	.dots:hover > .spana > span > mark {
	  -webkit-animation-name: bounce;
	          animation-name: bounce;
	}


	.dots:hover > .spana > span > mark.swing {
	  -webkit-transform-origin: top center;
	      -ms-transform-origin: top center;
	          transform-origin: top center;
	  -webkit-animation-name: swing;
	          animation-name: swing;
	}
	
	@-webkit-keyframes swing {
	  20% {
	    -webkit-transform: rotate3d(0, 0, 1, 15deg);
	            transform: rotate3d(0, 0, 1, 15deg);
	  }

	  40% {
	    -webkit-transform: rotate3d(0, 0, 1, -10deg);
	            transform: rotate3d(0, 0, 1, -10deg);
	  }

	  60% {
	    -webkit-transform: rotate3d(0, 0, 1, 5deg);
	            transform: rotate3d(0, 0, 1, 5deg);
	  }

	  80% {
	    -webkit-transform: rotate3d(0, 0, 1, -5deg);
	            transform: rotate3d(0, 0, 1, -5deg);
	  }

	  100% {
	    -webkit-transform: rotate3d(0, 0, 1, 0deg);
	            transform: rotate3d(0, 0, 1, 0deg);
	  }
	}

	@keyframes swing {
	  20% {
	    -webkit-transform: rotate3d(0, 0, 1, 15deg);
	            transform: rotate3d(0, 0, 1, 15deg);
	  }

	  40% {
	    -webkit-transform: rotate3d(0, 0, 1, -10deg);
	            transform: rotate3d(0, 0, 1, -10deg);
	  }

	  60% {
	    -webkit-transform: rotate3d(0, 0, 1, 5deg);
	            transform: rotate3d(0, 0, 1, 5deg);
	  }

	  80% {
	    -webkit-transform: rotate3d(0, 0, 1, -5deg);
	            transform: rotate3d(0, 0, 1, -5deg);
	  }

	  100% {
	    -webkit-transform: rotate3d(0, 0, 1, 0deg);
	            transform: rotate3d(0, 0, 1, 0deg);
	  }
	}

	/* animation keyframes */
	@-webkit-keyframes bounce {
	  0%, 20%, 53%, 80%, 100% {
	    -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
	            transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
	    -webkit-transform: translate3d(0,0,0);
	            transform: translate3d(0,0,0);
	  }

	  40%, 43% {
	    -webkit-transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
	            transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
	    -webkit-transform: translate3d(0, -30px, 0);
	            transform: translate3d(0, -30px, 0);
	  }

	  70% {
	    -webkit-transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
	            transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
	    -webkit-transform: translate3d(0, -15px, 0);
	            transform: translate3d(0, -15px, 0);
	  }

	  90% {
	    -webkit-transform: translate3d(0,-4px,0);
	            transform: translate3d(0,-4px,0);
	  }
	}

	@keyframes bounce {
	  0%, 20%, 53%, 80%, 100% {
	    -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
	            transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
	    -webkit-transform: translate3d(0,0,0);
	            transform: translate3d(0,0,0);
	  }

	  40%, 43% {
	    -webkit-transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
	            transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
	    -webkit-transform: translate3d(0, -30px, 0);
	            transform: translate3d(0, -30px, 0);
	  }

	  70% {
	    -webkit-transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
	            transition-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
	    -webkit-transform: translate3d(0, -15px, 0);
	            transform: translate3d(0, -15px, 0);
	  }

	  90% {
	    -webkit-transform: translate3d(0,-4px,0);
	            transform: translate3d(0,-4px,0);
	  }
	}

	@-webkit-keyframes bounceIn {
	  0%, 20%, 40%, 60%, 80%, 100% {
	    -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
	            transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
	  }

	  0% {
	    opacity: 0;
	    -webkit-transform: scale3d(.3, .3, .3);
	            transform: scale3d(.3, .3, .3);
	  }

	  20% {
	    -webkit-transform: scale3d(1.1, 1.1, 1.1);
	            transform: scale3d(1.1, 1.1, 1.1);
	  }

	  40% {
	    -webkit-transform: scale3d(.9, .9, .9);
	            transform: scale3d(.9, .9, .9);
	  }

	  60% {
	    opacity: 1;
	    -webkit-transform: scale3d(1.03, 1.03, 1.03);
	            transform: scale3d(1.03, 1.03, 1.03);
	  }

	  80% {
	    -webkit-transform: scale3d(.97, .97, .97);
	            transform: scale3d(.97, .97, .97);
	  }

	  100% {
	    opacity: 1;
	    -webkit-transform: scale3d(1, 1, 1);
	            transform: scale3d(1, 1, 1);
	  }
	}

	@keyframes bounceIn {
	  0%, 20%, 40%, 60%, 80%, 100% {
	    -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
	            transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
	  }

	  0% {
	    opacity: 1;
	    -webkit-transform: scale3d(.3, .3, .3);
	            transform: scale3d(.3, .3, .3);
	  }

	  20% {
	    -webkit-transform: scale3d(1.1, 1.1, 1.1);
	            transform: scale3d(1.1, 1.1, 1.1);
	  }

	  40% {
	    -webkit-transform: scale3d(.9, .9, .9);
	            transform: scale3d(.9, .9, .9);
	  }

	  60% {
	    opacity: 1;
	    -webkit-transform: scale3d(1.03, 1.03, 1.03);
	            transform: scale3d(1.03, 1.03, 1.03);
	  }

	  80% {
	    -webkit-transform: scale3d(.97, .97, .97);
	            transform: scale3d(.97, .97, .97);
	  }

	  100% {
	    opacity: 1;
	    -webkit-transform: scale3d(1, 1, 1);
	            transform: scale3d(1, 1, 1);
	  }
	}
</style>
