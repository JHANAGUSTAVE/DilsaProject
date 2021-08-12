<template>
	<b-tab :title="$t('Administration.tabs.Roles')" :active='activeTable'>
		<b-card border-variant="white">
			<div>
				<span class="text-normal-title color-dark"></span>
				<b-table class="loto-table" responsive hover :items="(typeof userRole !== undefined && userRole) ? userRole.data: []" :fields="roleFields"> 
					<template v-slot:row-details="row">
						<b-card :title="$t('Modals.Role.create.privilege')">
							<b-row>
								<b-col md="3" v-for="privilege in getRowPrivilege(row.item.roles.role)" :key="privilege.DT_RowId">
									<i class="fa fa-check-double"></i><span> {{$t('Modals.Role.info.'+privilege.privileges.name)}}</span>
								</b-col>
							</b-row> 
						</b-card>
					</template>
					<template v-slot:cell(roles.role)="row">
						{{row.item.roles.role}}
					</template>
					<template v-slot:cell(actions)="row"> 
						<b-button-group> 
							<b-button style="background: #6485f7" @click="row.toggleDetails">
								<i class="fa fa-info" style="color:white"></i>
							</b-button>
							<b-button style="background: #6485f7" @click="setRowId(row.item)" v-b-modal.edit-modal-role>
								<i class="fa fa-edit" style="color:white"></i>
							</b-button>
							<b-button variant="danger" @click="setRowId(row.item)" v-b-modal.delete-modal-role>
								<i class="fa fa-trash" style="color:white"></i>
							</b-button>
						</b-button-group>
					</template>
				</b-table>

				<create-role :tabIndex="1"></create-role>
				<edit-role :tabIndex="1" :idRole="idRole"></edit-role>
				<delete-role :tabIndex="1"  :idRole="idRole"></delete-role>
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
		name: 'RolesTab',
		mixins: [methods],
		components: {ContentLoader,
			CreateRole:()=> import("@/components/administration/modals/role/Create"),
			EditRole:()=> import("@/components/administration/modals/role/Edit"),
			DeleteRole:()=> import("@/components/administration/modals/role/Delete"),  
		},
		mounted() {
			this.refreshRole()
			this.refreshRolePrivilege()
			this.refreshPrivilege()
		},
		data() {
			return {
				ContentLoader: true,
				roleFields:[ 
					{ key: 'DT_RowId', label: 'ID' ,formatter: value =>{
							return  this.extractID(value)
						} 
					}, 
					{ key: 'roles.role', label:this.$t('Modals.Role.create.role') },
					{ key: 'roles.description', label: this.$t('Modals.Role.create.description') }, 
					{ key: "actions", label: "Details" }
				]  ,
				idRole:"",     
			}
		},
		methods: {

			refreshRole(){

				if(this.user){
					this.$store.dispatch("callUserRole",{
						token: this.user.token
					})
				}
			},

			refreshRolePrivilege(){

				if(this.user){
					this.$store.dispatch("callRolePrivilege",{
						token: this.user.token
					}) 
				}
			},
			refreshPrivilege(){

				if(this.user){
					this.$store.dispatch("callPrivilege",{
						token: this.user.token
					}) 
				}
			},
			getRowPrivilege(role){
				if(this.rolePrivilege)
					return this.rolePrivilege.data.filter(x => x.roles.role === role)
			},
	        // ruleSelected(){
	        //   if(operator==false){
	        //     this.customer=true;
	        //   }
	        //   else{this.operator=true}
	        // },
	        extractID(str){
	        	let m;
	        	const regex = /[a-zA-Z]+_(\d+)/gm;
	        	while ((m = regex.exec(str)) !== null) {
		            // This is necessary to avoid infinite loops with zero-width matches
		            if (m.index === regex.lastIndex) {
		            	regex.lastIndex++;
		            } 
		            return m[1]          
		        }          
	    	},
    		
      		setRowId(val){
      			this.idRole = val;         
      		},
  		},
  		computed: {
		  	userDetail() {
		  		return this.$store.getters.userDetail;
		  	},
  			user() {
				//checking user object from state
		 		return this.$store.getters.user;
			},
			userRole(){
				return this.$store.getters.userRole
			},

			rolePrivilege(){
				return this.$store.getters.rolePrivilege
			}

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
		}
	}
</script>

  <style scoped lang="scss">
  @media (min-width: 576px) {
  }

  /* Medium devices (tablets, 768px and up)*/
  @media (min-width: 768px) {
  }

  /* Large devices (desktops, 992px and up)*/
  @media (min-width: 992px) {
  	.card-header {
  		height: 368px;
  	}
  }
  .loto-table thead {
  	background: #f2f4f7;

  	border-radius: 5px;

  	border: 5px solid #f2f4f7;
  }
  .text-normal-title {
  	font-family: Nunito;
  	font-style: normal;
  	font-weight: bold;
  	line-height: 32px;
  	font-size: 24px;
  }
  .btn-blue-color {
  	background: #6485f7;
  }
  .color-blue {
  	color: #6485f7 !important;
  }
  .color-dark {
  	color: #323b48;
  }
  .childtable{ width: 100%;}
  .childtable td{
  	border:none;
  }
  .rulescompliance{
  	background-color: initial;
  	color: initial;
  	border:none;
  	width: 100%;
  	text-align: left;
  }
  .rulescompliance:hover,.rulescompliance:focus,.rulescompliance:active{
  	background-color: initial;
  	color: initial;
  	border:none;
  }
  .iconrule{
  	text-align: right;
  }
  .user_img {
  	max-width: 28px;
  	height: auto;
  	align-self: center;
  	margin: 0px 10px 0px 10px;
  	border-radius: 50%;
  }
</style>
