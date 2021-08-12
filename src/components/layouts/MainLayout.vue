<template>
    <div>
         <Sidebar class="sidebar__size" v-on:resize_content_wrapper="eventResize"></Sidebar>
    <Navbar :class="{
                'nav__size_max': !resize,
                'nav__size_min': resize
              }"></Navbar>
    <router-view
      :class="{
                'content-wrapper__size_max': !resize,
                'content-wrapper__size_min': resize
              }"
    ></router-view>
    </div>
</template>

<script> 

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import getCookie from "@/mixins/utils" ; 
export default {
  components: {
    Sidebar,
    Navbar
  },
  mixins:[getCookie],
  data() {
    return {
      resize: true,
    };
  },
  created(){
    this.getResize();
  },
  methods: {
    eventResize(valResize) { 
      this.resize = valResize;
    },
    reportTemplateRegex(str){
      //const regex = /\/reports\/\d+/gm;
      const regex =/\/reports\/[a-z]+/gm; 
      let m; 
      while ((m = regex.exec(str)) !== null) {
          // This is necessary to avoid infinite loops with zero-width matches
          if (m.index === regex.lastIndex) {
              regex.lastIndex++;
          } 
          // The result can be accessed through the `m`-variable.  
              return m[0] ? true : false  
      }
    },
    getResize(){
      this.resize = this.getCookie('is_clps') !== null;
    }
  },
  computed: {
     userDetail() {
       return this.$store.getters.userDetail;
    },
     versionCheck(){
       return this.$store.getters.versionCheck
     },
  },
};
</script>

<style lang="scss">
// @import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';


.help{
  background-color:#f7f7f7;
  border-radius:50%;
  color:#000; 
  text-align:center; 
  width:15px; 
  height:15px; 
  font-size:10px;
  cursor:default; 
}

.popover,.popover-header,.popover-body{
  background-color: #f7f7f7;
  color: #000 !important;
  // border: 1px inset #fff;
}
.bs-popover-right > .arrow::after, .bs-popover-auto[x-placement^="right"] > .arrow::after{
    
    border-right-color: #f7f7f7!important;
}

.date-time-picker {
  display: inline;
}

.date-time-picker input {
    border-color: lightgray;
    border-style: solid;
    border-radius: 5px;
    padding-left: 5px;
    width: 165px;
    color: #6485f7;
    border: none;
    font-family: Nunito;
    font-weight: bold;
    font-size: 12px;
}

.fa.fa-info-circle{
  padding-left: 5px;
}
.fa-1x{
font-size: 10px;
color: #e8cc23;
}

@media (max-width: 577px) {

}


// Small devices (landscape phones, less than 768px)
@media (max-width: 768px) {
  .content-wrapper__size {
    margin-left: 80px;
  }
  .sidebar__size {
    position: fixed;
    height: 100%;
    width:80px !important;
  } 
  .content-wrapper__size_max {
    margin-left: 200px;
  }

}

// Medium devices (tablets, less than 992px)
@media (max-width: 991px) {
  .sidebar__size {
    position: fixed;
    height: 100%;
    width:80px !important;
  } 
  #sidebar ul li a span {
    display:none;
  }
  .content-wrapper__size_max {
    margin-left: 80px;
  }
  .nav__size_max .navbar{
    margin-left: 80px;
    width: calc(100vw - 80px);
  }
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
  
  .content-wrapper__size_max {
    margin-left: 200px;
  }
  .content-wrapper__size_min {
    margin-left: 75px;
  }
  .sidebar__size {
    height: 100%;
  } 
  .breadcrumb{
    margin-left:-15px;
  }
  #sidebar ul li a span {
    display: inline;
  }
}
</style>