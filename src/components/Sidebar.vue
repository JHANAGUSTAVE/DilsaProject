<template>
	<div v-if="user" id="sidebar" :style="isCollapsed ? { width: '60px' } : {}" class="box-shadow-right">
		<div class="sidebar-header" v-bind:class="{  'remove-header':isCollapsed }">
			<div class="d-flex justify-content-between align-items-center" style="height:55px;position: relative;padding-left: 15px;">
				<div style="cursor:pointer;">
					<img @click='$router.push("/")' class="d-md-inline d-lg-none" :src="getLogo()" alt  :style="!isCollapsed ? { 'max-width': '30px' } : {height :'28.333px'}">
					<img @click='$router.push("/")' class="d-none d-lg-inline" :src="getLogo(this.userDetail)" alt  :style="!isCollapsed ? { 'max-width': '98px' } : {height :'48.333px'}">
				</div>
				<span class="d-none d-lg-inline" @click="toggleCollapse()" :style="!isCollapsed ? { 'position':'absolute','right':'10px'}:{ 'position':'absolute','right':'-25px','color':'#ccc' }">
					<i :style="'font-size:' + (isCollapsed ? '26px':'16px')" aria-hidden="true" :class="{'fa fa-bars': !isCollapsed, 'fa fa-caret-right arrow-small': isCollapsed}"></i>
				</span>
			</div>
		</div>
		<ul class="list-unstyled components" v-bind:class="{ 'remove-margin__top':isCollapsed }" >
			<li @click="!isNavCollapsed ? isNavCollapsed = true : ''">
				<router-link to="/" exact :title='$t("Navigation.Home")'>
					<i class="fa fa-home fa-fw"></i>
					<span v-show="!isCollapsed">{{ $t("Navigation.Home") }}</span>
				</router-link>
			</li>

			<li  @click="!isNavCollapsed ? isNavCollapsed = true : ''">
				<router-link to="/analytics" :title='$t("Navigation.Analytics")'>
					<i class="fa fa-chart-pie fa-fw"></i>
					<span v-show="!isCollapsed">{{ $t("Navigation.Analytics") }}</span>
				</router-link>
			</li>
			<li v-if="checkPrivilege(userDetail,'PRIV_VIEW_REPORT')"  @click="!isNavCollapsed ? isNavCollapsed = true : ''">
				<router-link to="/reports" :title='$t("Navigation.Reports")'>
					<i class="fa fa-list fa-fw"></i>
					<span v-show="!isCollapsed">{{ $t("Navigation.Reports") }} </span>
				</router-link>
			</li>

			<li @click="!isNavCollapsed ? isNavCollapsed = true : ''">
				<router-link to="/validation" :title='"Periods Validation"'>
					<i class="fa fa-calendar-alt fa-fw"></i>
					<span v-show="!isCollapsed">Periods Validation </span>
				</router-link>
			</li>
		</ul>
		<div class="d-none d-lg-block" style="position: absolute;bottom: 20px;width:100%;text-align: center">
			<span>Copyright © {{formatDate(null,'YYYY')}}</span>
		</div>
	</div>
</template>

<script lang="js">
	//import EventBus from '@/eventBus/event-bus';
	import logo from "../assets/logo/fx-100.png";
	import logo_wt from "../assets/logo/fx-wt-100.png";
	import icon from "../assets/logo/icon-30.png"

	import Navbar from "@/components/Navbar";
	import checkPrivilege from "@/mixins/methods" ; 
	import formatDate from "@/mixins/methods" ; 
	import setCookie from "@/mixins/utils" ; 
	import getCookie from "@/mixins/utils" ; 
	import deleteCookie from "@/mixins/utils" ; 
	
	export default  {
		name: 'sidebar',
		components:{
			Navbar
		},
		mixins: [checkPrivilege,formatDate,setCookie,getCookie,deleteCookie],
		data() {
			return {
				isCollapsed: false,
				isNavCollapsed: true,
				logo:{"dark": logo_wt, "light": logo, "default": icon}
			}
		},
		created(){
			this.getResize()
		},	
		methods: {
			toggleCollapse() {
				this.isCollapsed = !this.isCollapsed;
				//EventBus.$emit('resize_content_wrapper', this.isCollapsed ? '100px'  : '200px')  
				this.isNavCollapsed = false
				let  valResize =  this.isCollapsed
				this.$emit('resize_content_wrapper',valResize)
				this.isCollapsed ? this.setCookie("is_clps",1):this.deleteCookie("is_clps")
			},
			toggleNavCollapse() {
				this.isNavCollapsed = !this.isNavCollapsed
			},
			getLogo(userDetail=null){
				if(!userDetail || this.isCollapsed)
					return this.logo.default
				else
					return this.logo[userDetail.data[0].Users.theme];
			},
			getResize(){
				this.isCollapsed = this.getCookie('is_clps') !== null;
		    }
		},
		computed: {
			user() {
				//checking user object from state
				return this.$store.getters.user;
			},
			userDetail() {
				return this.$store.getters.userDetail;
			},
		},
	}
</script>

<style scoped>
#sidebar {
	background: linear-gradient(
		to bottom, transparent, transparent 0, #fff 0, rgba(255,255,255,0.9) 6px), url(../assets/bg.jpg);
	background-size:cover;
	color: #9ca4ab;
	transition: all 0.3s;
	border-right:solid 1px #eee;
	z-index:1031;
	position:fixed;
	width:190px;
	top:0;
	left:0;
}

#sidebar.active {
	margin-left: -200px;
}

#sidebar .sidebar-header {
	background: #fff;
	position: relative;
	border-bottom:solid 1px #eee;
	height:55px;
}

#sidebar .sidebar-header.remove-header {
	padding: 0;
	width:60px;
	border-bottom: 0;
}


#sidebar ul li a {
	padding: 10px;
	font-size: 1.1em;
	display: block;
}

#sidebar li img {
	margin-top:-10px;
	background-color: #9ca4ab;
}
#sidebar .remove-header img {
	width:30px;
}


a.router-link-active, .svg {
	fill: #17a2b8;
	color: #17a2b8;
}

#sidebar li {
	transition: all 0.3s;
	border-bottom:solid 1px #eee ;
} 
#sidebar li a{
	margin-left:10px;
}
#sidebar li a.router-link-active{
	margin-left:0;
	border-left: 5px solid #17a2b8;
	background: #d2e7ea;
	color: #17a2b8
}
#sidebar li a.router-link-active i{
	margin-left:5px;
}
#sidebar li i {
	margin-right:5px;
} 
#sidebar li:hover {
	color: #17a2b8;
} 

@media screen and (max-width: 767px) {  
	.hide {
		display: none;
	}
}
@media screen and (max-width: 992px) {  
	.hamburger {
		box-sizing: inherit;
		position: absolute;
		/*top: 0;*/
		right: 20px;
	}
	.hamburger i {
		font-size: 2.5em;
		color: #3d4982;
	}


	.Desk-hamburger {
		display: none;
		width: 0px;
	}
}

/* Medium devices (tablets, 768px and up)*/
@media (min-width: 768px) {
}

/* Large devices (desktops, 992px and up)*/
@media (min-width: 992px) {
	.Desk-hamburger i {
		font-size: 2em;
		/*color: #3d4982;*/
		margin-top: 50%;
	}
	.hamburger {
		display: none;
		width: 0px;
	}
	#sidebar li img {
		margin-right: 18px;
		margin-left: 20px;
	}
}

</style>
