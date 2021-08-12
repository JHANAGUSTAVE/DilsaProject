<template>
    <div class="text-center" style="margin:auto">
      <b-row class="rh-base" >
        <b-col md="6" sm="12">
          <h1 class="rh-title">Common Platform</h1>
          <h2 class="rh-subtitle">Executive Financial Report</h2> 
          <h3 v-if='ReportPeriod !== ""' class="rh-subtitle">Period: <span style="font: Bold 20px/24px Helvetica ;">{{ReportPeriod}}</span></h3>
        </b-col>
        <b-col md="6" sm="12" style="padding-right:0px">
          <b-img :src="require('../../../assets/report-header-img1.png')" fluid-grow center class="rh-img"></b-img> 
        </b-col>
      </b-row> 
    </div>
</template>

<script> 
export default {
  name: "HeaderImg",
  props: {
    ReportPeriod: {
      type: String,
      required: true
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
  mounted(){
    document.title = "Report " + this.ReportPeriod + " - Fx Matrix";
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .rh-base{
   border-radius: 8px;
   background: transparent linear-gradient(180deg, #0079B9 0%, #056095 46%, #0D3B5E 100%) 0% 0% no-repeat padding-box;
  opacity: 1;
  margin: auto;
  text-align: left;
}
.rh-base__color{ 
   background: transparent linear-gradient(180deg, #0079B9 0%, #056095 46%, #0D3B5E 100%) 0% 0% no-repeat padding-box; 
}
.rh-title{
  font: Bold 48px/58px Helvetica;
  letter-spacing: 0;
  color: #FFFFFF;
  margin-top: 22px;
  margin-bottom: 0px
}
.rh-subtitle{ 
  font: Regular 20px/24px Helvetica ;
  font-size: 23px; 
  // font-family: Helvetica, Regular;
  letter-spacing: 0;
  color: #FFFFFF;
  opacity: 1;
  margin-bottom:0px;
}

.rh-img{
  border-radius: 0px 8px 8px 0px;
}
</style>
