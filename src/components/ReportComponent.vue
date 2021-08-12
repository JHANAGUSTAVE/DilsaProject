<template lang="html">
	<section class="report-component" v-if="typeof reportItems !== undefined && reportItems && reportItems.data">
		<div class="my-3" id="legends">
			<span>LEGENDS: </span>
			<span class="report daily "><i class="fa fa-square"></i> Daily</span>
			<span class="report weekly"><i class="fa fa-square"></i> Weekly</span>
			<span class="report monthly"><i class="fa fa-square"></i> Monthly</span>
			<span class="report custom"><i class="fa fa-square"></i> Custom</span>
		</div>


		<b-card border-variant="white" class="mb-3 widget__box-shadow mx-auto hasdark" style="border-radius: 0;" v-for="report in orderByDate(reportItems.data).slice((currentPage*perPage)-perPage,currentPage*perPage)" :key="report.DT_RowId"
		 :id="'report-'+report.DT_RowId">
		<b-row>
			<b-col md="8" class="d-flex">
				<!-- <img src="../assets/icon/report_img.jpg" style="width:70px;height:70px" class="mr-3" alt="Report image"> -->
				<div style="position: relative;">
					<i :class="'fa fa-file fa-5x fa-fw report-' + (report.report_info.report_type).toLowerCase()"></i>
				</div>
				<div>
					<h4 class="snf" style="font-size: 16px;text-transform:capitalize"> {{report.report_info.name}} <span class="ml-2">(Model {{report.report_info.model}})</span></h4>
					<p class="" v-if='report.report_info.description.length > 0' style="font-size: 16px">{{report.report_info.description}}</p>
					<p class="" style="font-style: italic;color:#ccc;font-size: 14px" v-else>No description</p>
					<p class="" style="font-size: 10px">
						<span><i class="fa fa-clock"></i> {{report.report_info.date_time}}</span>
					</p>
				</div>
			</b-col>
			<b-col md="4" class="d-flex justify-content-end">
				<div style="">
					<a v-if="checkPrivilege(userDetail,'PRIV_ACTION_REPORT')" class="btn btn-sm btn-info mx-1" @click="getReport(report)" :title="$t('Button.edit')">
						<i class="far fa-edit fa-fw"></i> 
					</a>
					<router-link v-if="checkPrivilege(userDetail,'PRIV_VIEW_REPORT')" :title="$t('Button.show')" :to="{ name: 'ReportPrintable',  params: {'id': report.DT_RowId.substring(4),'model':report.report_info.model,'type':report.report_info.report_type}}" 
					class="link btn btn-sm btn-secondary mx-1" target="_blank">
					<i class="fas fa-eye fa-fw"></i>
				</router-link>
				<a v-if="checkPrivilege(userDetail,'PRIV_ACTION_REPORT')" class="link text-white btn btn-sm btn-danger mx-1" :title="$t('Button.delete')" @click="getId(report.DT_RowId)" ><i class="fas fa-trash fa-fw" style=""></i> </a>
			</div>
		</b-col>
	</b-row>
      <!-- <b-row>
        <b-col md="2"></b-col>
        
         <p class="lead">{{report.reports.description}}</p>
     </b-row> -->
 </b-card>

 <div class="overflow-auto d-flex justify-content-center pt-2" v-if="typeof reportItems !== undefined && reportItems && reportItems.data">
 	<b-pagination base-url="#" :per-page="perPage" :total-rows="reportItems.data.length" v-model="currentPage"
 	/>
 </div>

 <div v-if="this.id">
 	<b-modal id="modalDelete" ref='delete' center hide-header hide-footer size="md" :modal-class="(userDetail !== null ? userDetail.data[0].Users.theme:'light')">
 		<p class="delete">{{$t("Report.confirm_delete")}}</p>
 		<div class="d-flex justify-content-end">
 			<a class="btn btn-danger mr-3" @click="hideModalDelete()">Cancel</a>
 			<a class="btn btn-success" @click="deleteReport()">Delete</a>
 		</div>
 	</b-modal>

 </div>

 <div v-if="this.report">
 	<ReportModal modalId='modalEdit' :report="report" :sendMail="sendMail"></ReportModal>
 </div>


</section>
</template>

<script lang="js">

	import datatables from "@/mixins/datatables";
	import ReportModal from "@/components/reports/modals/Create";
	import checkPrivilege from "@/mixins/methods" 
	export default {

		mixins: [datatables,checkPrivilege],
		name: 'ReportComponent',
		components: {ReportModal},
		props:["reportItems"],

		data() {
			return {
				currentPage: 1,
				showDelete:false,
				draw: 1,
				id: -1,
				report: {},
				perPage: 5,
				cols: [
				{ key: "name", name: "reports.name", search: ""},
				{ key: "date", name: "reports.date_time", search: ""}
				],
				filter: {
					draw: 1,
					columns: [],
					order: [{ column: 0, dir: "desc" }],
					search: { value: "", regex: "false" },
					start: 0,
					length: 1
				},
				order: { "0": { column: "1", dir: "asc" } },
				sendMail : true
			}
		},


		methods: {
			refreshReport() {
				if(this.user){
					//this.buildFilter();
					this.$store.dispatch("Report/callReportInfo", {
						token: this.user.token 
					});
				}
  			},
  deleteReport(){
  	this.datatablesDelete("Report/callReportInfo", this.id);
  	let reportDiv = document.getElementById("report-"+this.id);
  	if(reportDiv) reportDiv.style.display = 'none';
  	this.hideModalDelete()
  	this.refreshReport()
  	this.$notify({
  		group: "foo",
  		type: "info",
  		text:  this.$t("Report.report")+this.$t("NotificationMessage.deleteSuccess")
  	});
  },

  showModalDelete(){
  	this.showDelete = true
  },

  hideModalDelete(){
  	this.$refs['delete'].hide()
  },

  getId(id){
  	this.id = id
  	this.$bvModal.show('modalDelete')
  },

  getReport(report){
  	this.report = report
  	this.$bvModal.show('modalEdit')
      this.sendMail = true //this.getCurrentUserPrivileges()
  },

  getCurrentUserPrivileges(){
  	const result = this.rolePrivilege.data.filter(el=>el.role_priv.role == this.userDetail.data[0].Users.role)
  	const privileges = result.map(el => el.privileges.name)
  	return privileges.includes("PRIV_ACTION_SEND_EMAIL")
  },
    // allItems(){
    //   var nbPages = 0;
    //   var paginated_items=[]
    //   if(this.reportItems !== undefined){
    //   for (let i = 0; i < this.reportItems.length; i = i + this.perPage) {
    //   paginated_items[nbPages] = this.reportItems.slice(
    //   i,
    //   i + this.perPage
    //   );
    //   nbPages++;
    //   }
    //   this.items=paginated_items;
    //   }

    //   return this.items;
    // }

    orderByDate: function(list) {
    	return _.orderBy(list, 'report_info.date_time', 'desc');
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
  currentPageItems() {
  	return this.items[this.currentPage-1];
  },
  userDetail() {
  	return this.$store.getters.userDetail;
  },

  rolePrivilege() {
      //checking user object from state
      return this.$store.getters.rolePrivilege;
  }
},

watch:{
	id(value){
		this.id = value
	},
  //   page_number(value) {
  //   if (value !== null && value !== undefined) {
  //     this.page_number = value;
  //     this.refreshReport();
  //   }
  // },
//   reportItems(value){
//     if (value !== null && value !== undefined){
//     this.allItems();
// }
// }
}
}
</script>

<style scoped>
	#legends .report{
		margin: 0 10px;
	}
	#legends .report.weekly i, .report-component i.report-weekly{
		color:#87ccd7;
	}
	#legends .report.daily i, .report-component i.report-daily{
		color:#95e685;
	}
	#legends .report.monthly i, .report-component i.report-monthly{
		color:#f0d3d3;
	}
	#legends .report.custom i, .report-component i.report-custom{
		color:#bbb;
	}
</style>

