<template>
	<!-- Modal Component -->
	<b-modal id="delete-modal-role" size="sm"  :title="$t('Modals.Role.delete.title')" :cancel-title="$t('Button.cancel')" @ok="handleSubmit" :modal-class="(userDetail !== null ? userDetail.data[0].Users.theme:'light')">  
		<p class="my-4">{{$t("Modals.Role.delete.text")}} {{tabIndex}}</p>  
	</b-modal>
</template>
<script>
	import datatables from '@/mixins/datatables'
	export default {
		mixins:[datatables],
		name: "DeleteRole",
		props: {
			idRole: { 
				required: true
			} ,
			tabIndex:{
				type:Number,
				required: true
			}
		},
		data() {
			return {
				rolePrivilegeCount: 0,
				executionCounter:0
			};
		},
		methods:{
			handleSubmit() {   
				this.datatablesDelete("callRole", this.idRole.DT_RowId)
				this.getRowPrivilege(this.idRole.roles.role).forEach(element => {
					this.datatablesDelete("callRolePrivilege",element.DT_RowId)
					this.executionCounter++
				});

			},
			getRowPrivilege(role){
				let t = this.rolePrivilege.data.filter(x => x.roles.role === role)
				this.rolePrivilegeCount =  t.length
				return t
			},
		},
		computed:{
			userDetail() {
				return this.$store.getters.userDetail;
			},
			user() {
				//checking user object from state
				return this.$store.getters.user;
			} ,
			rolePrivilege(){
				return this.$store.getters.rolePrivilege
			},
			roleDeleted() {
				return this.$store.getters.delete;
			} 
		},
		watch:{
			roleDeleted(value){
				if(value != undefined && value != null){
					this.$store.dispatch("callUserRole",{
						token: this.user.token
					})

				}
			},
			executionCounter(value){
				if (value >0 && value === this.rolePrivilegeCount) {
					this.tabIndex === 1? this.$notify({
						group: "foo",
						type: "info",
						text: this.$t("Administration.tabs.RoleDeleted")
					}): '';
				} 
			}

		}
	};
</script>



