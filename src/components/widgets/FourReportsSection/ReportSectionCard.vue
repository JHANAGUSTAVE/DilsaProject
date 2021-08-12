<template>

	<b-card   
		style="text-align: center;"
		border-variant="light" 
		:class="{
			'fs-card-bg__topup1 nodark':  ReportSectionCardType  === 'TopUp' && reportModel== '1',
			'fs-card':reportModel =='1'|| reportModel =='2',
			'fs-card-color__white': reportModel =='3',
			'fs-card-color__black': reportModel=='1' || reportModel =='2',
			'fs-card-bg__prepaid1':  ReportSectionCardType  === 'PrePaid' && reportModel== '1',
			'fs-card-bg__mobilemoney1':  ReportSectionCardType === 'MobileMoney' && reportModel== '1',
			'fs-card-bg__international1':  ReportSectionCardType === 'Inter' && reportModel== '1',
			'fs-card-bg__antifraud':  ReportSectionCardType === 'Antifraud' && reportModel== '1',
			'fs-card-bg__all2':reportModel =='2',
			'fs-card-bg__all3': reportModel =='3'
		}" v-if="dataVal || antifraudVal"> 
		<b-row class='align-items-end' style="height: 220px">
			<b-col cols="12" :class="{'mt-12': ReportType !=='weekly'}" >
				<span class="text-normal-title" v-if="ReportSectionCardType === 'TopUp'">TOP UP</span>
				<span class="text-normal-title" v-else-if="ReportSectionCardType === 'PrePaid'">PRE-PAID</span>
				<span class="text-normal-title" v-else-if="ReportSectionCardType === 'MobileMoney'">MOBILE MONEY</span>
				<span class="text-normal-title" v-else-if="ReportSectionCardType === 'Inter'">INTERNATIONAL</span>
				<span class="text-normal-title" v-else-if="ReportSectionCardType === 'Antifraud'">ANTIFRAUD</span>
			</b-col>

			<b-col v-if="ReportSectionCardType === 'Antifraud' && antifraudVal" cols="12">
				<section>
					<b-row>
						<b-col cols='4'>
							<span class="text-normal-subtitle">CALLS SENT</span>
							<p :class="'text-css ' + {'mb-14': ReportType !=='weekly'}">{{ this.getAntifraudTotals(this.antifraudVal).total_sent}}</p>
							
							<b-row>
								<b-col sm="6">
									<b-row>
										<b-col cols="12"><span :class="{'fs-card-color__blue': reportModel =='2'}" >Previous</span></b-col>
										<b-col cols="12"><span class="text-normal ">{{ this.getAntifraudTotals(this.antifraudVal).total_sent_previous }}</span></b-col>
									</b-row>
									
								</b-col>
								<b-col sm="6" >
									<b-row>
										<b-col cols="12"><span :class="{'fs-card-color__blue': reportModel =='2'}">Trend</span></b-col>
										<b-col cols="12">
											<p class="text-normal color-red" v-if="Math.round(this.getAntifraudTotals(this.antifraudVal).total_sent_previous_percentage) < 0">
												<svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg" >
													<path fill-rule="evenodd" clip-rule="evenodd" d="M1.2 1.6C0.705573 0.940764 1.17595 0 2 0H7C7.82405 0 8.29443 0.940764 7.8 1.6L5.3 4.93333C4.9 5.46667 4.1 5.46667 3.7 4.93333L1.2 1.6Z" fill="#FF4742">
														
													</path>
												</svg>
												{{ parseFloat(this.getAntifraudTotals(this.antifraudVal).total_sent_previous_percentage).toFixed(2) }} %
											</p>
											<p class="text-normal color-green" v-else>
												<svg
												width="9"
												height="6"
												viewBox="0 0 9 6"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												>
												<path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M1.2 4.4C0.705573 5.05924 1.17595 6 2 6H7C7.82405 6 8.29443 5.05924 7.8 4.4L5.3 1.06667C4.9 0.533334 4.1 0.533333 3.7 1.06667L1.2 4.4Z"
												:fill="(reportModel === '1' || reportModel === '2' ) ? '#385723':'#a8ff6e'"
												></path>
												</svg>
												{{ parseFloat(this.getAntifraudTotals(this.antifraudVal).total_sent_previous_percentage).toFixed(2) }} %
											</p>
										</b-col>
									</b-row>                           
								</b-col>
							</b-row>
							<div class="testtt"  v-if=" ReportType ==='weekly'">
								<div class="weeklyChartId" id="initialChartId" style="height:60px"></div>
							</div>
						</b-col>
						<b-col cols='4'>
							<span class="text-normal-subtitle">CALLS RECEIVED</span>
							<p :class="'text-css ' + {'mb-14': ReportType !=='weekly'}">{{ this.getAntifraudTotals(this.antifraudVal).total_received}}</p>
							
							<b-row>
								<b-col sm="6">
									<b-row>
										<b-col cols="12"><span :class="{'fs-card-color__blue': reportModel =='2'}" >Previous</span></b-col>
										<b-col cols="12"><span class="text-normal ">{{ this.getAntifraudTotals(this.antifraudVal).total_received_previous }}</span></b-col>
									</b-row>
									
								</b-col>
								<b-col sm="6" >
									<b-row>
										<b-col cols="12"><span :class="{'fs-card-color__blue': reportModel =='2'}">Trend</span></b-col>
										<b-col cols="12">
											<p class="text-normal color-red" v-if="Math.round(this.getAntifraudTotals(this.antifraudVal).total_received_previous_percentage) < 0">
												<svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg" >
													<path fill-rule="evenodd" clip-rule="evenodd" d="M1.2 1.6C0.705573 0.940764 1.17595 0 2 0H7C7.82405 0 8.29443 0.940764 7.8 1.6L5.3 4.93333C4.9 5.46667 4.1 5.46667 3.7 4.93333L1.2 1.6Z" fill="#FF4742">
														
													</path>
												</svg>
												{{ parseFloat(this.getAntifraudTotals(this.antifraudVal).total_received_previous_percentage).toFixed(2) }} %
											</p>
											<p class="text-normal color-green" v-else>
												<svg
												width="9"
												height="6"
												viewBox="0 0 9 6"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												>
												<path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M1.2 4.4C0.705573 5.05924 1.17595 6 2 6H7C7.82405 6 8.29443 5.05924 7.8 4.4L5.3 1.06667C4.9 0.533334 4.1 0.533333 3.7 1.06667L1.2 4.4Z"
												:fill="(reportModel === '1' || reportModel === '2' ) ? '#385723':'#a8ff6e'"
												></path>
												</svg>
												{{ parseFloat(this.getAntifraudTotals(this.antifraudVal).total_received_previous_percentage).toFixed(2) }} %
											</p>
										</b-col>
									</b-row>                           
								</b-col>
							</b-row>
							<div class="testtt"  v-if=" ReportType ==='weekly'">
								<div class="weeklyChartId" id="initialChartId" style="height:60px"></div>
							</div>
						</b-col>

						<b-col cols='4'>
							<span class="text-normal-subtitle">FRAUDULENT NUMBERS</span>
							
							<p :class="'text-css ' + {'mb-14': ReportType !=='weekly'}">{{ this.getAntifraudTotals(this.antifraudVal).total_fraudulent}}</p>
							
							<b-row>
								<b-col sm="6">
									<b-row>
										<b-col cols="12"><span :class="{'fs-card-color__blue': reportModel =='2'}" >Previous</span></b-col>
										<b-col cols="12"><span class="text-normal ">{{ this.getAntifraudTotals(this.antifraudVal).total_fraudulent_previous }}</span></b-col>
									</b-row>
									
								</b-col>
								<b-col sm="6" >
									<b-row>
										<b-col cols="12"><span :class="{'fs-card-color__blue': reportModel =='2'}">Trend</span></b-col>
										<b-col cols="12">
											<p class="text-normal color-red" v-if="Math.round(this.getAntifraudTotals(this.antifraudVal).total_fraudulent_previous_percentage) < 0">
												<svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg" >
													<path fill-rule="evenodd" clip-rule="evenodd" d="M1.2 1.6C0.705573 0.940764 1.17595 0 2 0H7C7.82405 0 8.29443 0.940764 7.8 1.6L5.3 4.93333C4.9 5.46667 4.1 5.46667 3.7 4.93333L1.2 1.6Z" fill="#FF4742">
														
													</path>
												</svg>
												{{ parseFloat(this.getAntifraudTotals(this.antifraudVal).total_fraudulent_previous_percentage).toFixed(2) }} %
											</p>
											<p class="text-normal color-green" v-else>
												<svg
												width="9"
												height="6"
												viewBox="0 0 9 6"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												>
												<path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M1.2 4.4C0.705573 5.05924 1.17595 6 2 6H7C7.82405 6 8.29443 5.05924 7.8 4.4L5.3 1.06667C4.9 0.533334 4.1 0.533333 3.7 1.06667L1.2 4.4Z"
												:fill="(reportModel === '1' || reportModel === '2' ) ? '#385723':'#a8ff6e'"
												></path>
												</svg>
												{{ parseFloat(this.getAntifraudTotals(this.antifraudVal).total_fraudulent_previous_percentage).toFixed(2) }} %
											</p>
										</b-col>
									</b-row>                           
								</b-col>
							</b-row>
							<div class="testtt"  v-if=" ReportType ==='weekly'">
								<div class="weeklyChartId" id="initialChartId" style="height:60px"></div>
							</div>
						</b-col>
					</b-row>
				</section>
			</b-col>
			<b-col v-else-if='dataVal != null' cols="12">
				<b-row>
					<b-col cols="12" :class="{'mb-14': ReportType !=='weekly'}">
						<span class="text-css">{{ this.getTotals(this.dataVal).totalRevenue}}</span>
					</b-col>
					<b-col cols="12">
						<b-row>
							<b-col sm="6">
								<b-row>
									<b-col cols="12"><span :class="{'fs-card-color__blue': reportModel =='2'}" >Previous</span></b-col>
									<b-col cols="12"><span class="text-normal ">{{ this.getTotals(this.dataVal).totalPrevious }}</span></b-col>
								</b-row>
								
							</b-col>
							<b-col sm="6" >
								<b-row>
									<b-col cols="12"><span :class="{'fs-card-color__blue': reportModel =='2'}">Trend</span></b-col>
									<b-col cols="12">
										<p class="text-normal color-red" v-if="Math.round(this.getTotals(this.dataVal).totalTrend) < 0">
											<svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg" >
												<path fill-rule="evenodd" clip-rule="evenodd" d="M1.2 1.6C0.705573 0.940764 1.17595 0 2 0H7C7.82405 0 8.29443 0.940764 7.8 1.6L5.3 4.93333C4.9 5.46667 4.1 5.46667 3.7 4.93333L1.2 1.6Z" fill="#FF4742">
													
												</path>
											</svg>
											{{ parseFloat(this.getTotals(this.dataVal).totalTrend).toFixed(2) }} %
										</p>
										<p class="text-normal color-green" v-else>
											<svg
											width="9"
											height="6"
											viewBox="0 0 9 6"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											>
											<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M1.2 4.4C0.705573 5.05924 1.17595 6 2 6H7C7.82405 6 8.29443 5.05924 7.8 4.4L5.3 1.06667C4.9 0.533334 4.1 0.533333 3.7 1.06667L1.2 4.4Z"
											:fill="(reportModel === '1' || reportModel === '2' ) ? '#385723':'#a8ff6e'"
											></path>
											</svg>
											{{ parseFloat(this.getTotals(this.dataVal).totalTrend).toFixed(2) }} %
										</p>
									</b-col>
								</b-row>                           
							</b-col>
						</b-row>
					</b-col>
				</b-row> 
			</b-col>

			<b-col class="testtt" cols="12"  v-if=" ReportType ==='weekly'">
				<div class="weeklyChartId" id="initialChartId" style="height:60px"></div>
			</b-col>
		</b-row> 
	</b-card>
</template>

<script>
	import methods from "@/mixins/methods";
	import moment from 'moment-timezone';

	let am4core = null;
	let am4themes_animated = null;
	let am4charts = null;

	export default {
		name: "ReportSectionCard",
		mixins: [methods],
		props: {
			ReportType: {
				type: String,
				required: true
			},
			ReportSectionCardType: {
				type: String,
				required: true
			},
			ReportSectionCardField:{
				type:Object,
				required:true
			},
			ReportSectionCardRestiction:{
				type:Array,
				required:true
			}
		},
		components: {},
		data() {
			return {
				chartId: this.generateChartId(7),
				dataVal:[{revenue:0, previous:0, trend:0,weeklyRevenue:["0","0","0","0","0","0","0"]}],
				dataSaved:[],
				ReportSectionCardData:[0,0,0,0,0,0,0],
				chart:null,
				antifraudVal:[{sent:0,sent_previous:0,sent_previous_percentage:0,received:0,received_previous:0,received_previous_percentage:0,fraudulent:0,fraudulent_previous:0,fraudulent_previous_percentage:0}],
			};
		},
		created() {
			am4core = this.$am4core;
			am4themes_animated = this.$am4themes_animated;
			am4charts = this.$am4charts;
			am4core.useTheme(am4themes_animated);
		},
		mounted(){
			if(this.ReportType=="weekly"){
				let element = document.getElementById('initialChartId') ;
				if(element){
					element.id = this.chartId; 
					this.createWeeklyGraph(this.chartId);
				}
			}
			
		},
		computed:{
			reportModel(){
				return this.$store.getters['Report/reportModel']
			},
			reportWidget(){
				let theWidget = this.$store.getters['Report/report'+this.ReportSectionCardType];
				if(theWidget != null){
					// Backend n'envoie pas la period pour ANTIFRAUD, on genere la period depuis le trend
					theWidget = this.generateMissingPeriod(theWidget,this.ReportSectionCardRestiction);
					this.addValue(theWidget);
				}
				return theWidget
			}
		},
		watch:{
			reportModel(value){
				return value
			},
			reportWidget(value){
				value = this.generateMissingPeriod(value,this.ReportSectionCardRestiction);
				this.addValue(value)
			}
		},

		methods: {
			generateMissingPeriod(value,default_period){
				if((typeof value.period === undefined || !value.period) && value.trend){
	                let period;
	                if(value.type === 'custom'){
	                    period = default_period[0];
	                }else{
	                    // Recupération de la dernière date dans les trends pour n'importe quelle opérateur
	                    var datesValuesObject = Object.values(value.trend.sent).filter(dateObject => Object.keys(dateObject).length > 0)[0]; 
	                    var datesArray = Object.keys(datesValuesObject);
	                    var lastDateString = datesArray[Object.keys(datesArray).length - 1];
	                    if(datesArray.length == 1){ // Une seule date est probablement du type daile,
	                        period =  moment.utc(lastDateString,'YYYY-MM-DD').format("YYYY-MM-DD") // format: YYYY-MM-DD
	                    }else{
	                        // On ajoute une journée, pour avoir la période exacte;
	                        period = moment.utc(lastDateString,'YYYY-MM-DD').add(1,'d').format("YYYY-MM-DD");
	                    }
	                }
	                value.period = period;
				}
				return value;
			},
			generateChartId(length){ 
				let result           = '';
				let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
				const charactersLength = characters.length;
				for ( var i = 0; i < length; i++ ) {
					result += characters.charAt(Math.floor(Math.random() * charactersLength));
				}
				return result; 
			},
			addValue(value){
				let newval=this.getData(value.info, this.ReportSectionCardField, value.trend);
				if(this.ReportSectionCardRestiction.includes(value.period) || this.ReportSectionCardRestiction.includes(value.type)){
					if((value.type=='custom' && !this.dataSaved.includes(value.period)) || (value.type!='custom' && !this.dataSaved.includes(value.type))){
							
						newval.map((x,y) => {
							if(this.ReportSectionCardType === 'Antifraud'){
								if(this.antifraudVal[y]==null){
									this.antifraudVal.push({sent:0,sent_previous:0,sent_previous_percentage:0,received:0,received_previous:0,received_previous_percentage:0,fraudulent:0,fraudulent_previous:0,fraudulent_previous_percentage:0});
								}
								let antifraudVal_copy = this.antifraudVal[y];
								for(var j of Object.keys(antifraudVal_copy)){
									this.antifraudVal[y][j] += Number(x[j])
								}	
							}else{
								if(this.dataVal[y]==null){
									this.dataVal.push({revenue:0, previous:0, trend:0})
								}
								this.dataVal[y].revenue+=Number(x.revenue)
								this.dataVal[y].previous+=Number(x.previous)
								this.dataVal[y].trend+=Number(x.trend)
								if(this.ReportType=="weekly"){
									x.weeklyRevenue.map((x,key) =>{
										this.ReportSectionCardData[key] +=Number(x) 
									})
								} 
								this.dataVal[y].weeklyRevenue=x.weeklyRevenue
							}
						});

						if(value.type=='custom')
							this.dataSaved.push(value.period)  
						else{
							if(this.ReportType=="weekly" && typeof this.chart !== undefined && this.chart){
								this.ReportSectionCardData.forEach((element,index) => {
									this.chart.data[index].value = element
								});
								this.chart.validateData() 
							}
							this.dataSaved.push(value.type)
						}
					}
				}
			},
			getData(widgets, fields, trend) {
				const data = [];
				if(typeof widgets !== undefined && widgets){
					for (let [key, value] of Object.entries(widgets)) {
						switch (key) {
							case "Afriwave":
							case "Airtel-Tigo":
							case "Glo":
							case "MTN":
							case "Vodafone":
								this.ReportSectionCardType === 'Antifraud' ? this.getAntifraudWidgetData(data, key, value, trend, fields): this.getWidgetData(data, key, value, trend, fields);
								break;
						}
					}
				}
				return data;
			},

			getWidgetData(data, key, value, trend, fields) {
				let obj = {};
				obj.widget = key;
				obj.revenue = `${value[fields.revenue]}`;
				obj.previous = `${value[fields.previous]}`;
				obj.trend =`${value[fields.trend]}` != "null" ? `${value[fields.trend]}` : "0";
				if(trend!=null){
					obj.weeklyRevenue=[0,0,0,0,0,0,0];
					if(typeof trend[fields.weeklyRevenue] !== undefined && trend[fields.weeklyRevenue] && typeof Object.entries(trend[fields.weeklyRevenue][key] !== undefined && Object.entries(trend[fields.weeklyRevenue][key]))){
						for(let [keyItem,item] of Object.entries(trend[fields.weeklyRevenue][key])){
							obj.weeklyRevenue[new Date(keyItem).getDay()]=item
						}
					}
				}
				data.push(obj);
				return data;
			},

			getAntifraudWidgetData(data, key, value, trend, fields) {
				let obj = {};
				obj.widget = key;
				obj.sent = typeof value !== undefined && value ? `${value[fields.sent]}`:'0';
				obj.sent_previous = typeof value !== undefined && value ? `${value[fields.sent_previous]}`:'0';
				obj.sent_previous_percentage = typeof value !== undefined && value ? `${value[fields.sent_previous_percentage]}`:'0';

				obj.received = typeof value !== undefined && value ? `${value[fields.received]}`:'0';
				obj.received_previous = typeof value !== undefined && value ? `${value[fields.received_previous]}`:'0';
				obj.received_previous_percentage = typeof value !== undefined && value ? `${value[fields.received_previous_percentage]}`:'0';

				obj.fraudulent = typeof value !== undefined && value ? `${value[fields.fraudulent]}`:'0';
				obj.fraudulent_previous = typeof value !== undefined && value ? `${value[fields.fraudulent_previous]}`:'0';
				obj.fraudulent_previous_percentage = typeof value !== undefined && value ? `${value[fields.fraudulent_previous_percentage]}`:'0';
				data.push(obj);
				return data;
			},

			getTotals(widget) {
				let totals = {};
				let totalRevenue = 0;
				let totalPrevious = 0;
				let totalTrend = 0;
				widget.map(x => {
					totalRevenue += Number(x.revenue);
					totalPrevious += Number(x.previous);
				});
				
				totalTrend = ((totalRevenue*100) / totalPrevious)-100
				totalTrend =  isNaN(totalTrend) ? 0 : totalTrend
				totalRevenue = this.convertBigNumberIntoString(totalRevenue);
				totalPrevious = this.convertBigNumberIntoString(totalPrevious);
				totals = { totalRevenue, totalPrevious, totalTrend }
				
				return totals;
			},
			getAntifraudTotals(widget) {
				let totals = {};
				let total_sent = 0;
				let total_sent_previous = 0;
				let total_sent_previous_percentage = 0;
				let total_received = 0;
				let total_received_previous = 0;
				let total_received_previous_percentage = 0;
				let total_fraudulent = 0;
				let total_fraudulent_previous = 0;
				let total_fraudulent_previous_percentage = 0;

				widget.map(x => {
					total_sent = Number(x.sent)
					total_sent_previous = Number(x.sent_previous)
					total_sent_previous_percentage = Number(x.sent_previous_percentage)
					total_received = Number(x.received)
					total_received_previous = Number(x.received_previous)
					total_received_previous_percentage = Number(x.received_previous_percentage)
					total_fraudulent = Number(x.fraudulent)
					total_fraudulent_previous = Number(x.fraudulent_previous)
					total_fraudulent_previous_percentage = Number(x.fraudulent_previous_percentage)
				});

				total_sent_previous_percentage = ((total_sent*100) / total_sent_previous)-100
				total_received_previous_percentage = ((total_received*100) / total_received_previous)-100
				total_fraudulent_previous_percentage = ((total_fraudulent*100) / total_fraudulent_previous)-100

				total_sent_previous_percentage =  isNaN(total_sent_previous_percentage) ? 0 : total_sent_previous_percentage
				total_received_previous_percentage =  isNaN(total_received_previous_percentage) ? 0 : total_received_previous_percentage
				total_fraudulent_previous_percentage =  isNaN(total_fraudulent_previous_percentage) ? 0 : total_fraudulent_previous_percentage
				
				total_sent = this.convertBigNumberIntoString(total_sent)
				total_sent_previous = this.convertBigNumberIntoString(total_sent_previous)
				total_sent_previous_percentage = this.convertBigNumberIntoString(total_sent_previous_percentage)
				total_received = this.convertBigNumberIntoString(total_received)
				total_received_previous = this.convertBigNumberIntoString(total_received_previous)
				total_received_previous_percentage = this.convertBigNumberIntoString(total_received_previous_percentage)
				total_fraudulent = this.convertBigNumberIntoString(total_fraudulent)
				total_fraudulent_previous = this.convertBigNumberIntoString(total_fraudulent_previous)
				total_fraudulent_previous_percentage = this.convertBigNumberIntoString(total_fraudulent_previous_percentage)

				totals = { total_sent,total_sent_previous,total_sent_previous_percentage,total_received,total_received_previous,total_received_previous_percentage,total_fraudulent,total_fraudulent_previous,total_fraudulent_previous_percentage,
				}
				
				return totals;
			},

			createWeeklyGraph(chartId){
				let data = [];
				this.chart = am4core.create(chartId, am4charts.XYChart);
				// Add data 
				this.ReportSectionCardData.forEach((element,index) => {
					data.push({
						'day': 'day '+(index+1),
						'value': element
					})
				}); 
				this.ReportSectionCardData !=[] ? this.chart.data =data : this.chart.data =[]

				// Create axes

				let categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
				categoryAxis.dataFields.category = "day";
				categoryAxis.renderer.grid.template.location = 0;
				categoryAxis.renderer.minGridDistance = 30;
				categoryAxis.renderer.labels.template.disabled= true
				categoryAxis.renderer.grid.template.disabled= true



				let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
				valueAxis.renderer.labels.template.disabled= true
				valueAxis.renderer.grid.template.disabled= true

				// Create series
				let series = this.chart.series.push(new am4charts.ColumnSeries());
				series.dataFields.valueY = "value";
				series.dataFields.categoryX = "day"; 
				series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
				series.columns.template.fillOpacity = .8;


				let columnTemplate = series.columns.template;
				columnTemplate.strokeWidth = 0;
				columnTemplate.strokeOpacity = 1;
				columnTemplate.fill = am4core.color("white");
		  	}
		},

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped> 
.text-normal-bold {
	font-family: Nunito;
	font-style: normal;
	font-weight: bold;
	line-height: 24px;
	font-size: 12px;
}
.color-blue {
	color: #6485f7;
}
.color-dark {
	color: #323b48;
}

.color-purple {
	color: #844d9e;
}
.color-green {
	color: #385723;
	font-weight: bold;
}
.color-red {
	color: #ff4742; 
}
.text-normal-title {
	// font: Regular 20px/24px Helvetica Neue;
	letter-spacing: 0;
	font-family: 'Helvetica';
	font-size: 20px;
	font-weight: regular;
	letter-spacing: 0
	
}
.text-normal-subtitle {
	letter-spacing: 0;
	font-family: 'Helvetica';
	font-size: 15px;
	font-weight: regular;
	letter-spacing: 0
}
.text-css {
	font-family: Helvetica;
	font-style: normal;
	font-weight: bold; 
	font-size: 25px;
	// font: Bold 48px/58px Helvetica Neue;
	letter-spacing: 0;
}
.fs-card .card-body .text-css{
	color:#000;
}
.text-normal{
	// font: Regular 18px Helvetica Neue;
	font-family: 'Helvetica';
	font-size: 18px;
	font-weight: regular;
	letter-spacing: -0.13px;
}
.up-progress-bar {
	display: inline-block;
	vertical-align: bottom;
	margin-left: 7.53px;
	width: 4px;
	background: linear-gradient(360deg, #6485f7 0%, #a2c1e6 100%);
	border-radius: 8px;
	transform: matrix(-1, 0, 0, 1, 0, 0);
}

div.card-body{
	padding: 5px;
}

.fs-card{
	// color: white;
	max-height: 226px;
	min-height: 226px;
	// max-width: 244.5px;
	// min-width: 244.5px;
	border-radius: 8px;
	opacity: 1;
	border-right:solid 1px;
}
.fs-card-color__white, #app.dark div.fs-card-color__white{
	color:#fff; 
}
.fs-card-color__white .color-green{
	color:#a8ff6e;
}
.fs-card-bg__topup1 .card-body, #app.dark div.fs-card-bg__topup1 .card-body{
	background: linear-gradient(to top right, #DDC8AA,#F09B67);
}
.fs-card-bg__prepaid1 .card-body, #app.dark div.fs-card-bg__prepaid1 .card-body{
	background:linear-gradient(to top right,#ca9fa5, #e1c6d0);
}
.fs-card-bg__mobilemoney1 .card-body, #app.dark div.fs-card-bg__mobilemoney1 .card-body{
	background:linear-gradient(to top right, rgb(143, 224, 236),rgb(34, 159, 178) );
}
.fs-card-bg__international1 .card-body, #app.dark div.fs-card-bg__international1 .card-body{
	background:linear-gradient(to top right, rgb(159, 240, 216),rgb(74, 187, 153));
}
.fs-card-bg__antifraud .card-body, #app.dark div.fs-card-bg__antifraud .card-body{
	background:linear-gradient(to top right, #d07d9b, #8bc1f5)
}
.fs-card-bg__all2 .card-body, #app.dark div.fs-card-bg__all2 .card-body{
	background: #A7D9E9;
}
.fs-card-color__blue, #app.dark div.fs-card-color__blue{
	color: #0D3B5E;
}
.fs-card-bg__all3, #app.dark div.fs-card-bg__all3{
	background: transparent linear-gradient(180deg, #0079B9 0%, #056095 46%, #0D3B5E 100%) 0% 0% no-repeat padding-box;
	border-right:solid 1px; 
	border-left:solid 1px; 
	opacity: 1;
	border-radius:0;
}
.mt-12{
	margin-top: 12px
}
.mb-14{
	margin-bottom: 14px;
}
</style>