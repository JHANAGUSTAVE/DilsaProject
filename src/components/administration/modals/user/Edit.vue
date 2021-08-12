<template>
  <!-- Modal Component -->
  <b-modal id="edit-modal-user" :title="$t('Modals.User.edit.title')" :cancel-title="$t('Button.cancel')" @ok="handleSubmit" :modal-class="(userDetail !== null ? userDetail.data[0].Users.theme:'light')">
    <b-form>
      <b-form-group id="exampleInputGroup1" :label="$t('Modals.User.create.First_Name')" label-for="Input1">
        <b-form-input
          id="Input1"
          type="text"
          v-model="form.first_name"
          required
          placeholder="john"
        />
      </b-form-group>
      <b-form-group id="exampleInputGroup2" :label="$t('Modals.User.create.Last_Name')" label-for="Input2">
        <b-form-input id="Input2" type="text" v-model="form.last_name" required placeholder="Doe"/>
      </b-form-group>
      <b-form-group id="exampleInputGroup3" :label="$t('Modals.User.create.Email')" label-for="Input3">
        <b-form-input
          id="Input3"
          type="email"
          v-model="form.email"
          required
          placeholder="jdoe@example.com"
        />
      </b-form-group>
      <b-form-group id="exampleInputGroup4" :label="$t('Modals.User.create.Username')" label-for="Input4">
        <b-form-input id="Input4" type="text" v-model="form.username" required placeholder="jdoe"/>
      </b-form-group>

      <b-form-group id="languageInputGroup" :label="$t('Modals.User.create.Language')" > 
        <b-form-radio value="en" v-model="form.language"  >{{$t('Languages.English')}}</b-form-radio>
        <b-form-radio value="fr" v-model="form.language"  >{{$t('Languages.French')}}</b-form-radio> 
      </b-form-group>

      <b-form-group id="exampleInputGroup6" :label="$t('Modals.User.create.Password')" label-for="exampleInput6">
        <b-form-input
          id="exampleInput6"
          type="password"
          v-model="form.password"
          required
          :placeholder="$t('Modals.User.edit.your_password')"
        />
      </b-form-group>

      <b-form-group id="exampleInputGroup7" :label="$t('Modals.User.create.Role')" label-for="exampleInput7" >
        <b-form-select id="exampleInput7"  v-model="form.role" >
          <option  v-for="role in userRole.data"  :key="role.key" :value="extractID(role.DT_RowId)">{{$t('Modals.'+role.roles.role)}}</option>
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
  name: "EditUser",
   props: {
    idUser: { 
      required: true
    },
    tabIndex:{
      type:Number,
      required: true
    }
  },
  data() {
    return {
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
      }
    };
  },
  watch:{
    idUser(val){ 
      if(val !== null || val !== undefined){
        this.form.username = val.Users.username
        this.form.first_name= val.Users.first_name
        this.form.last_name= val.Users.last_name
        this.form.email= val.Users.email
        this.form.role= val.Users.role
        this.form.language= val.Users.language 
      }
    },
    userEdited(value){
      if(value != undefined && value != null){
        this.$store.dispatch("callUsers",{
            token: this.user.token
        })
        this.tabIndex === 0 ? this.$notify({
            group: "foo",
            type: "info",
            text: this.$t("Administration.tabs.userSaved")
        }): '';
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
     userEdited() {
        return this.$store.getters.edit;
    } 
  },
  methods:{
     handleSubmit() {   
          this.datatablesEdit("callUsers", this.form, this.idUser.DT_RowId)
      },
      extractID(str){
        // remode "row_" in front of row_id
        return str.substring(4)
      }
  }
};
</script>
  
  
 
