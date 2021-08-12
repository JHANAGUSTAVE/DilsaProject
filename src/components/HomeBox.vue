<template>
	<div class="wrapper">
		<div v-if="tmp.name.toLowerCase() !== 'antifraud'" class="wrapper mb-md-3 mb-5 mb-lg-0 box-shadow-right" @click="$bvModal.show('bv-modal-'+tmp.abbrev)">
			<b-card class="card-box-shadow card-hover hasdark" style="text-align:center;position: relative;"><!-- Card -->

				<!-- Overlay Icon -->
				<div style="position: absolute;top: 5px;left: 10px;" class="mt-1 mb-2 overlay-icon"><span style="font-size: 7.5rem" :class="'fa fa-' + tmp.icon"></span>
				</div>

				<b-row class="">
					<b-col cols='12'>
						<!-- Title -->
						<div class="boxName d-flex align-items-center justify-content-center text-center" style="height: 45px">
							<h3 class="grey snf" style="text-transform: uppercase;font-weight: bold;font-size: 1.2rem">{{tmp.name}} </h3>
						</div>

						<!-- Icon -->
						<div class="mt-1 mb">
							<div :class="'gradient-text gradient-' + tmp.id"><span :class="'fa fa-4x fa-' + tmp.icon"></span></div>
						</div>

						<!-- value in digits -->
						<div v-if='typeof tmpData.total_revenue !== undefined && tmpData.total_revenue' class="mb-2 d-flex align-items-center justify-content-center text-center box-digits" style="height: 50px">
							<span v-bind:class="'details text-css gradient-text gradient-' + tmp.id">{{(tmpData.total_revenue).substr(0,(tmpData.total_revenue).length - 5)}}<span v-bind:class="'sup text-css-2 ' + tmp.id">.{{extractFloatRemaining(tmpData.total_revenue).slice(1)}} </span>{{tmpData.total_revenue.slice(-1)}}</span>
							<span class="color-grey text-size-medium">
								<var>
									<span class="sup">{{tmp.currency}}</span>
								</var>
							</span>
						</div>
						<!-- end value in digits -->
					</b-col>

					<b-col cols="12 box-digits">
						<div :class="'body p-2 bg-gradient-' + tmp.id">
							<b-progress
							height="8px" style=""
							:variant="tmpData.total_trend > 0? 'success' :'danger'"
							:value="Math.abs(tmpData.total_trend )> 100 ? 100:Math.abs(tmpData.total_trend )"
							></b-progress>

							<div class="row justify-content-between prev">
								<b-col cols='4' class="text-left">
									<p class="" style="font-size: 14px;">Trend<br>
									{{tmpData.total_trend ? Math.round(tmpData.total_trend) : 0}}%</p>
								</b-col>
								<b-col cols='8' class="text-right">
									<p class="" style="font-size: 14px;">Previous<br>
										<span :class="tmp.id" style="font-weight: bold;">{{tmpData.total_previous}}</span></p>
								</b-col>
							</div>
						</div>
					</b-col>
				</b-row>
			</b-card>
		</div>
		<section v-else class="box-shadow-right card-box-shadow bg-white py-2 hasdark fraud-box" @click="$bvModal.show('bv-modal-'+tmp.abbrev)">
			<div class="text-center" style="">
				<h3 class="grey snf" style="text-transform: uppercase;font-weight: bold;font-size: 1.2rem">{{tmp.name}}</h3>
			</div>
			<div class="row no-gutters justify-content-center">
				<div v-for="st in sub_templates" class="col-4 text-center">
					<div class="wrapper mb-md-3 mb-5 mb-lg-0 hasdark" style="position: relative;">
						<div class="px-3 py-2 " >
							<div style="position: absolute;top: -10px;left: 10px;" class="mt-1 mb-2 overlay-icon"><span style="font-size: 7.5rem;" :class="'fa fa-' + st.icon"></span>
							</div>
							<b-row>
								<b-col cols='12'>
									<h3 class="grey" style="text-transform: uppercase;font-weight: bold;font-size: 0.7rem">{{st.title}}</h3>
									<div :class="'gradient-text gradient-' + tmp.id"><span :class="'fa fa-4x fa-' + st.icon"></span></div>

									<!-- value in digits -->
									<div v-if='typeof tmpData["total_" + st.key] !== undefined && tmpData["total_" + st.key]' class="mb-2 d-flex align-items-center justify-content-center text-center box-digits" style="height: 50px">
										<span v-bind:class="'details text-css gradient-text gradient-' + tmp.id">{{tmpData["total_" + st.key]}}</span>
										
									</div>
									<!-- end value in digits -->

									<b-progress height="8px" style="" :variant="tmpData['total_' + st.key + '_trend'] > 0 ? 'success' :'danger'" :value="Math.abs(tmpData['total_' + st.key + '_trend'])> 100 ? 100:Math.abs(tmpData['total_' + st.key + '_trend'])"
									></b-progress>

									<div class="row justify-content-between prev mt-2">
										<b-col cols='4' class="text-left">
											<div class="" style="font-size: 14px;">Trend<br>
											{{tmpData["total_" + st.key + '_trend'] ? Math.round(tmpData["total_" + st.key + '_trend']) : 0}}%</div>
										</b-col>
										<b-col cols='8' class="text-right">
											<div class="" style="font-size: 14px;">Previous<br>
												<span :class="" style="font-weight: bold;">{{tmpData['total_' + st.key + "_previous"]}}</span>
											</div>
										</b-col>
									</div>
								</b-col>
							</b-row>
						</div>
					</div>
				</div>
			</div>
		</section>

		<b-modal :id="'bv-modal-'+tmp.abbrev" size="xl" @show="modalIsShown" @hidden="" @ok="" footer-bg-variant="light">
			<template v-slot:modal-title :modal-class="userDetail.data[0].Users.theme">
				Analytics for {{tmp.name}}
			</template>

			<div class="d-block">
				<AnalyticBox v-slot:custom="slotProps" :dataUpdate="widgetUpdate" chartType="custom" isEditing="never/nonotes"  @updateDone="widgetUpdate=$event" :functionName='tmp.functionName' :name='tmp.name' :callback='tmp.callback' :getter='tmp.getter' :chartColor='tmp.chartColor' toggleDark='hasdark' :boxIcon='tmp.icon' :chartCustom="getChartPeriod()" :reportPrintable='true' :official='true'>

					<Loading :active.sync="slotProps.dataUpdate" :can-cancel="true" :is-full-page=false key="das">
						<div class="after-icon" slot="after" v-if="error==null">
							<h4>Please Wait</h4>
						</div>

						<div class="after-errr" v-else>                 
							<div class="justify-content-md-center"><h4>{{error}}</h4></div>
							<div  class="justify-content-md-center">
								<b-button @click="callReportList()" size="md" style="background: rgb(60, 74, 131) none repeat scroll 0% 0%; color: white;" >Retry</b-button>
							</div>                  
						</div>
					</Loading>
				</AnalyticBox>
			</div>

			<template v-slot:modal-footer>
				<div class="w-100">
					<p class="float-left"></p>
					<b-button variant="secondary" class="float-right ml-2" @click="$bvModal.hide('bv-modal-'+tmp.abbrev)"><i class="fa fa-times"></i> Close</b-button>
					<b-button variant="info" class="" @click="goToPage('/analytics')"><i class="fa fa-chart-pie fa-fw"></i> Go to Analytics</b-button>
				</div>
			</template>
		</b-modal>
	</div>
</template>

<script lang="js">
	import moment from 'moment-timezone';
	import methods from "@/mixins/methods";
	import AnalyticBox from '@/components/AnalyticBox';
	import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';

	export default {  
		name: "HomeBox",
		mixins: [methods,],
		components:{AnalyticBox,Loading},
		props: {
			totalVal:{
				type: Object,
			},
			tmp:{
				type:Object,
				required:true,
			}
		},
		data(){
			return {
				tmpData: [],
				sub_templates:[
					{'title':"Calls Sent", 'icon':'phone', 'key':'sent'},
					{'title':"Calls Received", 'icon':'phone-square', 'key':'received'},
					{'title':"Fraudulent Numbers", 'icon':'user-secret', 'key':'fraudulent'},
				],
				widgetUpdate:false,
			}
		},
		created() {
			this.callWidgets();
		},
		mounted() {
			if(typeof this.widget !== undefined && this.widget){
				this.tmpData = this.getData(this.widget.info, this.tmp.fields);
			}
		},
		methods:{
			callWidgets() {
				if(this.user){
					var data_to_send = {
						token: this.user.token,
						type: "custom",
						start_date: this.getFirstDayOfMonth,
						end_date: this.getCurrentDayOfMonth
					}
					this.$store.dispatch(this.tmp.callback, data_to_send);
				}
			},
			extractFloatRemaining(str){
				let m;
				const regex = /-?\.\d+/gm;
				while ((m = regex.exec(str)) !== null) {
					// This is necessary to avoid infinite loops with zero-width matches
					if (m.index === regex.lastlllIndex) {
						regex.lastIndex++;
					} 
					return m[0]          
				}          
			},
			getData(response, fields) {
				const widget = [];
				let totals = {};
				for (let [key, value] of Object.entries(response)) {
					let widget_data = {};
					switch (key) {
						case "Afriwave":
						case "Airtel-Tigo":
						case "Glo":
						case "MTN":
						case "Vodafone":
							widget_data.widget = key;
							for(let k of Object.keys(fields)){
								widget_data[k] = typeof value !== undefined && value ? `${value[fields[k]]}` : '0';
							}
							widget.push(widget_data);
							break;
					}
				}
				if(typeof widget !== undefined && widget){
					widget.map(wd => {
						for(let[key,value] of Object.entries(wd)){
							if(typeof Number(value) !== undefined && Number(value)){
								var totalVal = "total_" + key;
								if(typeof totals[totalVal] == undefined || totals[totalVal] == null) totals[totalVal] = 0;
								totals[totalVal] += Number(value);
							}
						}
					});

					if(typeof totals['total_sent'] !== undefined && totals['total_sent']){// sent, received or fraudulent exists in antifraud
						totals.total_sent_trend = ((totals.total_sent *100) / totals.total_sent_previous) - 100;
						totals.total_received_trend = ((totals.total_received *100) / totals.total_received_previous) - 100;
						totals.total_fraudulent_trend = ((totals.total_fraudulent *100) / totals.total_fraudulent_previous) - 100;
					}else if(typeof totals['total_revenue'] !== undefined && totals['total_revenue']){// revenu exists in topup/prepaid/mobile/inter
						totals.total_trend = ((totals.total_revenue * 100) / totals.total_previous) - 100;
					}else 
						totals.total_trend = 0; // trend is zero
						
					for(var key in totals){
						var n = totals[key];
						if(Number(n) === n && n % 1 === 0){ // Integer
							totals[key] = this.formatNumber(totals[key],2);
						}
						else totals[key] = this.convertBigNumberIntoString(totals[key]);
					}
				}
				return totals;
			},
			modalIsShown(){
				
			},
			goToPage(path){      
				this.$bvModal.hide('bv-modal-'+this.tmp.abbrev)             
				this.$router.push(path);
	        },
	        getChartPeriod(){
	        	var str = "from " + this.getFirstDayOfMonth + " to " + this.getCurrentDayOfMonth;
	        	return str;
	        },
	        callReportList() {
				var payload = {
					token: this.user.token,
					type: 'custom',
					limit: 11,
				}
				this.$store.dispatch("Report/callReportList", payload);
			},
		},
		watch:{
			widget(value) {
				if(this.widget){
					this.tmpData = this.getData(this.widget.info, this.tmp.fields);
				}
			},
			error(value, oldvalue) {
				if (value !== null && value !== undefined) {
					this.$notify({
						group: "foo",
						type: "error", 
						text: value
					});
				}
			},
		},
		computed: {
			user() {
				return this.$store.getters.user;
			},
			widget() {
				return this.$store.getters[this.tmp.getter];
			},
			getFirstDayOfMonth() {
				return moment().utc().startOf('month').unix();
			},
			getCurrentDayOfMonth() {
				return (moment.utc().startOf('day')).add(1,'d').unix();
			},
			error(error) {
				if (this.$store.getters.error !== undefined) {
					return this.$store.getters.error;
				}
				return error
			},
		}

	}
</script>

<style scoped>
@import "../assets/css/style_dash.css";
.progress{
	border:solid 1px #ccc;
}
.text-size-medium {
	font-size: 14px;
}
div.card-box-shadow{
	border: none;
	border-bottom: solid 1px #eee;
	border-radius: 0;
	/*max-height: 300px;*/
}
.card-box-shadow, .card-box-bottom {
	-webkit-transition: .3s all ease;
	-o-transition: .3s all ease;
	transition: .3s all ease;
}
.card-box-shadow:hover, .card-box-bottom:hover {
	cursor:pointer;
	-webkit-box-shadow: -4px 4px 13px -1px rgba(128,125,128,1);
	-moz-box-shadow: -4px 4px 13px -1px rgba(128,125,128,1);
	box-shadow: -4px 4px 13px -1px rgba(128,125,128,1);
}
.card-box-shadow.bottom-box{
	/*background-color: #f82833;*/
	font-size: 14px;
}
.card-box-shadow .overlay-icon{
	color: #e9ecef57
}

.card-box-shadow  img{
	width: 45%;
	margin-top: 10px;
	margin-bottom: 10px;
}
.card .card-body{
	padding: 0;
}
.card-box-shadow  .details{
	font-size:20px;
}

.card-box-shadow  .progress{
	margin-bottom: 14px;
}
.card-box-shadow  p{
	margin-bottom: 0;
}

.card-box-bottom .body{
	background-color: #fff;
	border-bottom: solid 1px #eee;
}
.card-border-shadow {
	background: #ffffff 0% 0% no-repeat padding-box;
	/*box-shadow: 0px 3px 6px #00000029;*/
	border-radius: 0 !important;
	opacity: 1;
	margin-bottom: 30px;
}
.after-icon {
	position: absolute;
	left: -20%;
	width: 200px;
}
.after-error {
	position: absolute;
	left: -100%;
	width: 200px;
}

.jumbotron {
	background-color: #fff;
}

.bg-color {
	background: linear-gradient(
		to top right,
		rgb(143, 224, 236),
		rgb(34, 159, 178)
		);
	opacity: 1;
}
.grey {
	color: #999;
}
.text-css {
	font-family: arial;

	font-style: normal;

	font-weight: bold;
	letter-spacing: 0;
	padding-top: 1rem;
}
.text-css-2 {
	/*font-size: 25px !important;*/
	letter-spacing: 0;
}
.gradient-text {
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
.gradient-1, .gradient-1 span {
	background: -webkit-linear-gradient(#9ff0d8, #4abb99);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
.gradient-2, .gradient-2 span {
	background: -webkit-linear-gradient(#c06083, #c94d7b);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
.gradient-3, .gradient-3 span {
	background: -webkit-linear-gradient(#8fe0ec, #229fb2);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
.gradient-4, .gradient-4 span {
	background: -webkit-linear-gradient(#eca946, #f09b67);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
.gradient-5, .gradient-5 span {
	background: -webkit-linear-gradient(#eca946, #0B3C6B);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
.bg-gradient-1 {
	background-image: linear-gradient(to top, #ffffff, #f3faff, #daf9ff, #c0f9fd, #b5f7e3);
}
.bg-gradient-2 {
	background-image: linear-gradient(to top, #ffffff, #f7f3fb, #f4e6f4, #f4d9e9, #f5cbda);  
}
.bg-gradient-3 {
	background-image: linear-gradient(to top, #ffffff, #f6f9ff, #e6f5ff, #d2f3ff, #bdf1f9);
}
.bg-gradient-4 {
	background-image: linear-gradient(to top, #ffffff, #fff7fe, #ffeff2, #ffe9dc, #ffe8c6);
}
.dark-blue {
	/*color: #09336d;*/
	color: #2ed0d0;
}
.text-css {
	font-family: arial;

	font-style: normal;

	font-weight: bold;

	font-size: 33px;

	letter-spacing: 0;
	padding-top: 1rem;
}
.fraud-box{
	background: linear-gradient(to bottom, transparent, transparent 0, #fff 0, rgba(255,255,255,0.9) 6px), url('../assets/bg.jpg');
}

.overlay-icon{
	color: #e9ecef57
}
.gradient-5, .gradient-5 span {
	background: -webkit-linear-gradient(#c06083, #0B3C6B);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}

.sup {
	font-size: 80%;
	color: #999;
	font-style: italic;
	font-weight: bold;
}
</style>