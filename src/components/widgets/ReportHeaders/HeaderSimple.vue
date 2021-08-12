<template>
    <div class="text-center" style="margin:auto">
      <b-row align-v="end" class="rh-base" :class="{'rh-base_color': reportModel== '2','rh-base_border__bottom': reportModel== '1'}">
        <b-col md="7" sm="12">
          <h1 class="rh-title">Common Platform</h1>
          <h2 class="rh-subtitle" :class="{'rh-color_grey':  reportModel== '1'}">Executive Financial Report </h2>
        </b-col>
        <b-col md="5" sm="12" style="padding-right:0px;text-align: right">
          <h3  v-if='ReportPeriod !== ""' class="rh-subtitle" :class="{'rh-color_grey':  reportModel== '1'}">Period: <span style=";font: Bold 20px/24px Helvetica ;">{{ReportPeriod}}</span></h3>
        </b-col>
      </b-row> 
    </div>
</template>

<script> 
export default {
  name: "HeaderSimple",
  props: {
    ReportPeriod: {
      type: String,
      required: true
    }, 
    ReportDateGenerated: {
      type: String,
      required: false,
    }, 
    ReportType: {
      type: String,
      required: true
    }, 
  },
  components: {},
  data() {
    return { 
    };
  }, 
  computed:{
     reportModel(){
        return this.$store.getters['Report/reportModel']
      },
  },
  watch:{
     reportModel(value){
        return value
      },
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    
.rh-base{ 
   opacity: 1;
   margin: auto;
   text-align: left;
   
} 
.rh-title{
  font: Bold 48px/58px Helvetica;
  letter-spacing: 0;
  
  margin-top: 22px;
  margin-bottom: 0px
}
.rh-subtitle{ 
  font: Regular 20px/24px Helvetica ;
  font-size: 23px; 
  // font-family: Helvetica, Regular;
  letter-spacing: 0; 
  opacity: 1; 
  margin-right: 1%;
}
.rh-base_color{ 
  color: #fff !important;
  border-radius: 8px;
  background: transparent linear-gradient(180deg, #0079B9 0%, #056095 46%, #0D3B5E 100%) 0% 0% no-repeat padding-box;
} 
.rh-base_border__bottom{
  color: #000;
  border-bottom: 1px solid  black
}
.rh-color_grey{
  color: #86888a;
}
</style>
