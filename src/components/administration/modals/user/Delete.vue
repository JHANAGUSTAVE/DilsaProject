<template>
  <!-- Modal Component -->
  <b-modal id="delete-modal-user"  size="sm"  :title="$t('Modals.User.delete.title')" :cancel-title="$t('Button.cancel')" @ok="handleSubmit" :modal-class="(userDetail !== null ? userDetail.data[0].Users.theme:'light')">
    <p class="my-4">{{$t("Modals.User.delete.text")}} {{tabIndex}}</p>  
  </b-modal>
</template>
<script>

import datatables from '@/mixins/datatables'

export default {
  mixins:[datatables],
  name: "DeleteUser",
  props: ['idUser',"tabIndex"] ,
  data() {
    return {};
  },
  methods:{
    handleSubmit() {   
        this.datatablesDelete("callUsers", this.idUser)

       
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
    userDeleted() {
      return this.$store.getters.delete;
    } 
  },
  watch:{
    userDeleted(value){
      if(value != undefined && value != null){
        this.$store.dispatch("callUsers",{
                token: this.user.token
        })
        this.tabIndex === 0 ? this.$notify({
            group: "foo",
            type: "info",
            text: this.$t("Administration.tabs.userDeleted")
        }) : '';
      }
    }
  }
};
</script>
  
  
 
