<template>
	<b-tab :title="$t('Administration.tabs.Users')" :active='activeTable'>
		<b-card border-variant="white" style="border-radius: 0">
			<div class="row">
				<div class="mb-2 col-4">
					<div class="input-group mb-3">
						<input type="text" class="form-control" id="search" ref="search" placeholder="Search" v-on:input="searchHandler($event.target.value)" v-model='search'>
						<div class="input-group-append">
							<button class="btn btn-outline-secondary" @click='searchHandler($refs["search"].value)' type="button"><i class="fa fa-search"></i></button>
						</div>
					</div>
				</div>
			</div>
			<div>
				<span class="text-normal-title color-dark"></span>
				<b-table class="loto-table" responsive hover :items="allUsers" :fields="userFields" :current-page="currentPageUsers" :per-page="perPageUsers"
				> 
					<template v-slot:head(DT_RowId)="data">
						ID <a @click='orderUsersBy("DT_RowId")' title="Order by ID"><span :class="(orderedFields.DT_RowId === 'asc') ? 'fas fa-caret-down' : ((orderedFields.DT_RowId === 'desc') ? 'fas fa-caret-up' : 'fa fa-sort')"></span></a>
					</template>
					<template v-slot:head(Users.username)="data">
						{{$t('Modals.User.create.Username')}} <a @click='orderUsersBy("username")' title="Order by username"><span :class="(orderedFields.username === 'asc') ? 'fas fa-caret-down' : ((orderedFields.username === 'desc') ? 'fas fa-caret-up' : 'fa fa-sort')"></span></a>
					</template>
					<template v-slot:head(Users.first_name)="data">
						{{$t('Modals.User.create.First_Name')}} <a @click='orderUsersBy("first_name")' title="Order by first name"><span :class="(orderedFields.first_name === 'asc') ? 'fas fa-caret-down' : ((orderedFields.first_name === 'desc') ? 'fas fa-caret-up' : 'fa fa-sort')"></span></a>
					</template>
					<template v-slot:head(Users.last_name)="data">
						{{$t('Modals.User.create.Last_Name')}} <a @click='orderUsersBy("last_name")' title="Order by last name"><span :class="(orderedFields.last_name === 'asc') ? 'fas fa-caret-down' : ((orderedFields.last_name === 'desc') ? 'fas fa-caret-up' : 'fa fa-sort')"></span></a>
					</template>
					<template v-slot:cell(Users.image_url)="data">
						<img class="user_img" :src="data.value" alt>
					</template>
					<template v-slot:cell(actions)="row">
						<b-button-group> 
							<b-button  style="background: #6485f7" @click="setRowId(row.item)"  v-b-modal.edit-modal-user>
								<i class="fa fa-edit" style="color:white"></i>
							</b-button>
							<b-button variant="danger" @click="setRowId(row.item.DT_RowId)" v-b-modal.delete-modal-user >
								<i class="fa fa-trash" style="color:white"></i>
							</b-button>
						</b-button-group>

					</template>
					<template v-slot:table-caption>Showing {{(users && users.data.length > perPageUsers) ? perPageUsers + ' - ' + users.data.length : users.data.length}}</template>	
				</b-table>
				<b-row>
					<b-col md="6" class="my-1 ml-auto mr-auto">
						<b-pagination
						v-model="currentPageUsers"
						:total-rows="totalRowsUsers"
						:per-page="perPageUsers"
						class="my-0 ml-auto mr-auto"
						style="width: max-content;"
						></b-pagination>
					</b-col>
				</b-row>
				<delete-user :tabIndex="0" :idUser="idUser!== ''? idUser : null"></delete-user> 
				<create-user :tabIndex="0"></create-user>
				<edit-user :tabIndex="0" :idUser="idUser!== ''? idUser : null"></edit-user>

			</div>
		</b-card>
	</b-tab>
</template>

<script lang="js">
	import { ContentLoader } from "vue-content-loader"; 
	import methods from "@/mixins/methods"; 

	export default  {
		props: {
			activeTable:{
				type:Boolean,
				default:true,
			}
		},
		name: 'UsersTab',
		mixins: [methods],
		components: {ContentLoader,
			CreateUser:()=> import("@/components/administration/modals/user/Create"),
			EditUser:()=> import("@/components/administration/modals/user/Edit"),
			DeleteUser :()=> import("@/components/administration/modals/user/Delete"),
		},
		mounted() {
			this.refreshUsers()
		},
		data() {
			return {
				userFields: [
					//index,
					{ key: 'DT_RowId', label: 'ID' ,formatter: value =>{
						return  this.extractID(value)
					} },
					{ key: 'Users.image_url', label: 'Image'
					,formatter: value => {  
						return value !== null ? value : "https://image.flaticon.com/icons/svg/23/23171.svg"
					} },
					{ key: 'Users.username', label: this.$t('Modals.User.create.Username') },
					{ key: 'Users.email', label: 'Email' },
					{ key: 'Users.first_name', label:this.$t('Modals.User.create.First_Name') },
					{ key: 'Users.last_name', label: this.$t('Modals.User.create.Last_Name') },
					{ key: 'Users.role', label:'Role' ,formatter: value => {

						return (value == "1" ? this.$t('Modals.Admin') : (value=="2" ? this.$t('Modals.Monitor'): "") )
					} },
					{ key: 'Users.language', label:this.$t('Modals.User.create.Language'),formatter: value => {

						return (value == "en" ? this.$t("Navbar.English") : (value=="fr" ? this.$t("Navbar.French"): "") )
					} },
					{ key: "actions", label: "Details" }

				],
				totalRowsUsers:  1,
				currentPageUsers: 1,
				perPageUsers: 5,
				allUsers:[],
				idUser:"",
				search:'',
				orderedFields:{'DT_RowId':'desc', 'username':'', 'first_name':'', 'last_name':''}
			}
		},
		methods: {
			refreshUsers(){
				if(this.user){
					this.$store.dispatch("callUsers",{
						token: this.user.token
					})
				}
			},	
			setRowId(val){
      			this.idUser = val;         
      		},
      		orderUsersBy(field='username'){
      			if(field == 'DT_RowId'){
      				this.allUsers = _.orderBy(this.users.data, [b => Number(this.extractID(b.DT_RowId))], this.orderedFields[field]);
      			}else{
      				this.allUsers = _.orderBy(this.users.data, [b => b.Users[field].toLowerCase()], this.orderedFields[field]);
      			}
      			var target_field = this.orderedFields[field];
      			Object.keys(this.orderedFields).map(key => this.orderedFields[key] = '');
      			this.orderedFields[field] = target_field !== 'asc' ? 'asc' : 'desc';
      		},
      		searchHandler(search){
      			this.allUsers = this.users.data.filter(user => {	
					return user.Users.username.toLowerCase().includes(search.toLowerCase())
				});
				this.currentPageUsers = 1;
      		},
  		},
  		computed: {
  			user() {
				//checking user object from state
		 		return this.$store.getters.user;
			},
			users(){
				return this.$store.getters.users
			},
  		},
  		watch:{
  			user(value) {
				if (value !== null && value !== undefined) {
					return value;
				}
				else {
					this.$store.dispatch("callResetState");
					this.$router.push("/login");
				}
			}, 
			users(value) {
				if (typeof value !== undefined && value) {
					this.ContentLoader = false; 
					this.totalRowsUsers = value.data.length
					this.allUsers = value.data;

				}
			},
		}
	}
</script>

<style scoped>
	
	.user_img {
		max-width: 28px;
		height: auto;
		align-self: center;
		margin: 0px 10px 0px 10px;
		border-radius: 50%;
	}
</style>
