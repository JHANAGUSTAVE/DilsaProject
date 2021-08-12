<template>
	<b-modal id="create-modal-user" ref="userCreateModal" scrollable :title="$t('Modals.User.create.title')" v-model="showCardUser" :cancel-title="$t('Button.cancel')" @ok="handleOk" :modal-class="(userDetail !== null ? userDetail.data[0].Users.theme:'light')">
		<b-form>
			<b-form-group id="exampleInputGroup1" :label="$t('Modals.User.create.First_Name')" label-for="Input1">
				<b-form-input id="Input1" type="text" v-model="form.first_name" required :placeholder="$t('Modals.User.create.First_Name')"/>
			</b-form-group>
			<b-form-group id="exampleInputGroup2" :label="$t('Modals.User.create.Last_Name')" label-for="Input2">
				<b-form-input id="Input2" type="text" v-model="form.last_name" required :placeholder="$t('Modals.User.create.Last_Name')"/>
			</b-form-group>
			<b-form-group id="exampleInputGroup3" :label="$t('Modals.User.create.Email')" label-for="Input3">
				<b-form-input id="Input3" type="email" v-model="form.email" required :placeholder="$t('Modals.User.create.Email')"/>
			</b-form-group>
			<b-form-group id="exampleInputGroup4" :label="$t('Modals.User.create.Username')" label-for="Input4">
				<b-form-input id="Input4" type="text" v-model="form.username" required :placeholder="$t('Modals.User.create.Username')"/>
			</b-form-group>

			<b-form-group id="editLanguageInputGroup" :label="$t('Modals.User.create.Language')" > 
				<b-form-radio value="en" v-model="form.language"  >{{$t('Languages.English')}}</b-form-radio>
				<b-form-radio value="fr" v-model="form.language"  >{{$t('Languages.French')}}</b-form-radio> 
			</b-form-group>

			<b-form-group id="exampleInputGroup6" :label="$t('Modals.User.create.Password')" label-for="exampleInput6">
				<b-form-input id="exampleInput6" type="password" v-model="form.password" required :placeholder="$t('Modals.User.edit.your_password')"/>
			</b-form-group>

			<b-form-group id="exampleInputGroup7" :label="$t('Modals.User.create.Role')" label-for="exampleInput7" >
				<b-form-select id="exampleInput7"  v-model="form.role" >
					<option  v-for="role in userRole.data"  :key="role.key" :value="extractID(role.DT_RowId)">{{role.roles.role}}</option>
				</b-form-select>
			</b-form-group>
		</b-form>
	</b-modal>
</template>
<script>
	import methods from '@/mixins/methods'
	import datatables from '@/mixins/datatables'
	export default {
		mixins:[methods, datatables],
		name: "CreateUser",
		props: {
			showCardUser: {
				type: Boolean,
				required: false
			},
			tabIndex:{
				type:Number,
				required: true
			},
		},
		data() {
			return {
				show: this.showCardUser,
				form: {
					username: null,
					first_name: "",
					last_name: "",
					email: null,
					role: null,
					language: "",
					district: "",
					password: null,
					image: ""
				},
				userCreate: false
			};
		},
		methods: {
			//ok validattion bby user
			handleOk(evt) {
				// Prevent modal from closing
				evt.preventDefault()
				if (this.form.username !== null && this.form.email !== null && this.form.password !==null) {
					this.handleSubmit()
				} else {
					alert('Fields incomplete')
				}
			},
			handleSubmit() {
				this.userCreate = true
				this.datatablesCreate("callUsers", this.form)
			},
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
			}
		},
		computed:{
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
			userCreated() {
				if(this.userCreate){
					return this.$store.getters.create
				}
			}
		},
		watch: {
			userCreated(value){
				if(value != undefined && value != null ){
					this.userCreate = false
					
					this.tabIndex === 0 ? this.$notify({
						group: "foo",
						type: "info",
						text: this.$t("Administration.tabs.userCreated")
					}) : '';

					this.$store.state.create = null

					this.$store.dispatch("callUsers",{
						token: this.user.token
					})
				}
			}

		}
	};
</script>


