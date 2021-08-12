<template>
	<b-modal id="edit-modal-role" ref="editModalRole"  size="lg"  :title="$t('Modals.Role.edit.title')" :cancel-title="$t('Button.cancel')" @ok="editRole" :modal-class="(userDetail !== null ? userDetail.data[0].Users.theme:'light')">
		<b-form>
			<b-form-group id="exampleInputGroup1" :label="$t('Modals.Role.create.role')" label-for="Input1">
				<b-form-input
				id="Input1"
				type="text"
				v-model="form.role"
				required
				placeholder="rolename"
				/>
			</b-form-group>
			<b-form-group id="exampleInputGroup2" :label="$t('Modals.Role.create.description')" label-for="Input2">
				<b-form-input id="Input2" type="text" v-model="form.description" required placeholder=" description "/>
			</b-form-group>
			<b-row class="mb-3">
				<b-col cols="6"> <span>{{$t('Modals.Role.edit.privilege')}}</span></b-col>
				<b-col cols="6" style="text-align: right;" @click="showAddPrivilege = !showAddPrivilege"> <i class="fa fa-plus" style="color:blue"></i>{{showAddPrivilege ? $t('Modals.Role.edit.HideAddPrivilege'):$t('Modals.Role.edit.addPrivilege')}}</b-col>
			</b-row>
			<b-row   v-show="showAddPrivilege">
				<b-col md="7" class="ml-auto">
					<b-form-select multiple v-model="newPrivilege" class="mb-3"> 
          				<option   v-for="item in getRowPrivilege(form.role,2)" v-bind:key="item.DT_RowId" :value="item.privileges.name">{{$t('Modals.Role.info.'+item.privileges.name)}}</option> 
      				</b-form-select>
  				</b-col>
			</b-row>
			<b-row class="mb-3" v-show="showAddPrivilege">
				<b-col md="7" class="ml-auto">
					<b-button @click="addPrivilege()">{{$t('Modals.Role.edit.addSelectedPrivilege')}}</b-button>
				</b-col>
			</b-row>
			<b-row>
				<b-col md="6" v-for="privilege in getRowPrivilege(form.role,1)" :key="privilege.DT_RowId">
					<b-input-group>
						<b-input-group-prepend is-text>
							<input type="checkbox"  @change="logPrivilegeChange(privilege.DT_RowId)" aria-label="Checkbox for following text input">
						</b-input-group-prepend>
						<b-form-input disabled aria-label="Text input with checkbox" :value="$t('Modals.Role.info.'+privilege.privileges.name)"></b-form-input>
						<b-input-group-append  class="cursor-pointer" is-text v-show="privilegeCheck.length < 1" @click="deletePrivilege('single',privilege.DT_RowId)">
							<i class="fa fa-trash" style="color:red"></i>
						</b-input-group-append>
					</b-input-group>
				</b-col>
			</b-row>  
			<b-row>
				<b-col md="4"  align-h="end" v-if="privilegeCheck.length >0"> 
					<b-button variant="danger" @click="deletePrivilege('multiple',privilegeCheck)" >
						<i class="fa fa-trash" style="color:white"></i>Delete {{privilegeCheck.length}}  {{privilegeCheck.length >1 ? `privileges`: "privilege"}}
					</b-button>
				</b-col>
			</b-row>

		</b-form>
	</b-modal>
</template>
<script>
	import datatables from '@/mixins/datatables'
	export default {
		mixins:[datatables],
		name: "EditRole",
		props: {
			idRole: { 
				required: true
			},
			tabIndex:{
				type:Number,
				required: true
			}
		},
		data() {
			return {
				form:{
					role: '',
					description:''
				},
				newPrivilege:[],
				privilegeCheck:[],
				privilegeId: '0',
				firstCall: true,
				showAddPrivilege: false


			};
		},
		mounted(){
			this.refreshRolePrivilege()
		},
		methods:{
			refreshRolePrivilege(){
				this.$store.dispatch("callRolePrivilege",{
					token: this.user.token
				})
			},
			refreshRole(){
				this.$store.dispatch("callUserRole",{
					token: this.user.token
				})
			},
			refreshPrivilege(){
				this.$store.dispatch("callPrivilege",{
					token: this.user.token
				}) 
			},
			getRowPrivilege(role, type){
				let noPrivBool= true
				let x= []
				let f = this.extractID(this.privilegeId)
				if (type !== 1 && typeof this.rolePrivilege !== undefined && this.rolePrivilege) { 
					const result = this.rolePrivilege.data.filter(el=>el.role_priv.role == f) 
					const privileges = result.map(el =>el.role_priv.priv) 
					x =this.privilege.data.filter(o1 => !privileges.some(o2 => o1.DT_RowId === "row_"+o2 ))
				}
				type === 1 && typeof this.rolePrivilege !== undefined && this.rolePrivilege ? x = this.rolePrivilege.data.filter(x => x.roles.role === role) : ''
				return x
			},

			logPrivilegeChange(id){
		        //this function log the changes on the cehcboxes to opmitze update for only changed values
		        if (this.privilegeCheck.includes(id)) { 
		        	this.privilegeCheck.splice(this.privilegeCheck.indexOf(id), 1) 
		        }else{ 
		        	this.privilegeCheck.push(id) 
		        } 
		    },
			addPrivilege(){
				let t;
				this.newPrivilege.forEach(element => { 
					if(typeof this.privilege !== undefined && this.privilege){
						let x = this.privilege.data.find(x => x.privileges.name === element) 
						if (x !== undefined ) {
							t = {
								role: this.extractID(this.idRole.DT_RowId),
								priv: this.extractID(x.DT_RowId )
							}
						} 
					}
					this.datatablesCreate("callRolePrivilege",t)
				});
				this.refreshRole()
				this.refreshPrivilege()
				this.refreshRolePrivilege()
			},
			editRole(){
				this.datatablesEdit("callRole", this.form, this.idRole.DT_RowId)
			},
			extractID(str){
			    // remode "row_" in front of row_id
			    return str.substring(4)
			},
			deletePrivilege(type,value){
				if (type === 'single') { 
					this.datatablesDelete("callRolePrivilege",value)
				}else{
					value.forEach(element => { 
						this.datatablesDelete("callRolePrivilege",element)
						this.privilegeCheck.splice(this.privilegeCheck.indexOf(element), 1) 
					});
				}
				this.refreshRole()
				this.refreshPrivilege()
				this.refreshRolePrivilege()
			}, 
		},
		
		computed:{
			userDetail() {
				return this.$store.getters.userDetail;
			},
			user() {
			  //checking user object from state
			  return this.$store.getters.user;
			}, 
			roleEdited() {
				return this.$store.getters.edit;
			} , 
			privCreated() {
				return this.$store.getters.created;
			} , 
			privDeleted(){
				return this.$store.getters.deleted;
			},
			rolePrivilege(){
				return this.$store.getters.rolePrivilege
			},
			privilege(){
				return this.$store.getters.privilege
			}
		},
		watch:{
			idRole(value){
				if (value !== null && value !== undefined) {
			        //tracking last opened role privileges
			        this.form.role = value.roles.role
			        this.form.description = value.roles.description
			        this.privilegeId !== value.DT_RowId ? this.privilegeCheck = []: ''
			        this.privilegeId= value.DT_RowId 
			    }
			},
			roleEdited(value){
				if(value != undefined && value != null){
					this.$store.dispatch("callUserRole",{
						token: this.user.token
					})
					this.tabIndex === 1 ?  this.$notify({
						group: "foo",
						type: "info",
						text: this.$t("Administration.tabs.RoleSaved")
					}): '';
				}
			},
			privDeleted(value){
				if(value != undefined && value != null){
					this.tabIndex === 1 ?  this.$notify({
						group: "foo",
						type: "info",
						text: this.$t("Administration.tabs.PrivilegeDeleted")
					}): '';

				}
			},
			privCreated(value){
				if(value != undefined && value != null ){   
					this.tabIndex === 1 ? this.$notify({
						group: "foo",
						type: "info",
						text: this.$t("Administration.tabs.PrivilegeCreated")
					}) : '';
					this.$store.state.create = null
				}
			},
		},
	};
</script>



