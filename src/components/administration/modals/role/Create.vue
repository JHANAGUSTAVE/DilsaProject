<template>
	<b-modal id="create-modal-role" ref="roleCreateModal" scrollable   :title="$t('Modals.Role.create.title')" :cancel-title="$t('Button.cancel')" @ok="handleOk" :modal-class="(userDetail !== null ? userDetail.data[0].Users.theme:'light')">
		<b-form>
			<b-form-group id="exampleInputGroup1" :label="$t('Modals.Role.create.role')" label-for="Input1">
				<b-form-input id="Input1" type="text" v-model="form.role" required :placeholder="$t('Modals.Role.create.rolename')"/>
			</b-form-group>
			<b-form-group id="exampleInputGroup2" :label="$t('Modals.Role.create.description')" label-for="Input2">
				<b-form-input id="Input2" type="text" v-model="form.description" required placeholder=" description "/>
			</b-form-group> 

			<b-form-group v-if='typeof privilege !== undefined && privilege' id="exampleInputGroup7" :label="$t('Modals.Role.create.privilege')" label-for="exampleInput7" >
				<b-form-select id="exampleInput7"  multiple :select-size="4" v-model="form.privilege" > 
					<option  v-for="privItem in privilege.data"  :key="privItem.key" :value="privItem.DT_RowId">{{$t('Modals.Role.info.'+privItem.privileges.name)}} > {{privItem.privileges.description}}</option>
				</b-form-select>
				<p class="my-2">Press and hold Ctrl(Windows) or ⌘(Mac) to select more than one</p>
			</b-form-group>
		</b-form>
	</b-modal>
</template>
<script>
	import methods from '@/mixins/methods'
	import datatables from '@/mixins/datatables'
	export default {
		mixins:[methods, datatables],
		name: "CreateRole",
		props: {
			tabIndex:{
				type:Number,
				required: true
			}
		},
		data() {
			return {
				show: this.showCardRole,
				form: {
					role: "",
					description: "",
					privilege:[]
				},
				callLaunched: false,
				callPrivilege:false,
				callPrivilegeCount: 0
			};
		},
		computed:{
			userDetail() {
				return this.$store.getters.userDetail;
			},
			roleCreated() {
        		// if(this.userCreate){
        		return this.$store.getters.create
       			 // }
		    },
			user() {
				//checking user object from state
				return this.$store.getters.user;
			},
			privilege() {
				//checking user object from state
				return this.$store.getters.privilege;
		  	}
  

		},
		watch:{
			roleCreated(value){
				if(value != undefined && value != null ){ 
					if (typeof value === 'object' && this.callLaunched) { 
						this.callLaunched = false
						this.setrolePrivileges(this.extractID(""+value.data[0].DT_RowId))
						this.$store.state.create = null
					}
					if (typeof value === 'object' && this.callPrivilege) {
						this.callPrivilege = false
						this.tabIndex === 1 ? this.$notify({
							group: "foo",
							type: "info",
							text: this.$t("Administration.tabs.RoleCreated")
						}) : '';

						this.$refs['roleCreateModal'].hide() 
					} 
					this.callPrivilege = false			
				}
			},
			callPrivilegeCount(value){
				if (value > 0 &&  this.callPrivilegeCount === this.form.privilege.length ) {
					this.$store.dispatch("callUserRole",{
						token: this.user.token
					})
					this.$store.dispatch("callRolePrivilege",{
						token: this.user.token
					})
				}
			}
		},
		methods:{
			handleOk(evt) {
		        // Prevent modal from closing
		        evt.preventDefault()
		        if (this.form.role !== null || this.form.role !== '') {
		        	
		        	this.handleSubmit()
		        } else {
		        	alert('Fields incomplete')
		        }
		    },
		    handleSubmit(){
		    	this.callLaunched = true
		    	var params = {
		    		role: this.form.role,
		    		description: this.form.description
		    	};
		    	this.datatablesCreate("callRole", params); 
		    	
		    	
		    },
		    setrolePrivileges(param){
		    	this.form.privilege.forEach(element => {
		    		let id = this.privilege.data.find(x => x.DT_RowId === element) 
		    		this.datatablesCreate("callRolePrivilege",{
		    			role:param, 
		    			priv: this.extractID(id.DT_RowId) 
		    		})
		    		this.callPrivilegeCount= this.callPrivilegeCount + 1
		    		this.callPrivilege = true

		    	});
		    },
		    extractID(str){ 
		        // remode "row_" in front of row_id
		        return str.substring(4)
		    }

		},
		mounted(){
			this.$store.dispatch("callPrivilege",{
				token: this.user.token
			})
			
		}

	};
</script>


