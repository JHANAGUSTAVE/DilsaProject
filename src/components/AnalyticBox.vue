<template>
	<div style="width: 100%"> 
		<b-card :class="'card-border-shadow ' + toggleDark">
			<slot :name="chartType" v-bind:dataUpdate="isUpdating"></slot>

			<div class="d-flex justify-content-between">
				<h4 style="width:24%" ><span :class="'fa fa-fw fa-' + boxIcon"></span> {{name}}</h4>
				<!-- <h4 v-if="(!official || chartCustom != null) && chartType != 'custom'">{{getDateTest(chartType,chartPeriod)}}</h4> -->
                <h4 v-if="chartCustom != null && reportPrintable">{{getDateTest(chartType,chartPeriod)}}</h4>
				<h4 v-if="chartType == 'custom' && !reportPrintable">Dates:
					<VueCtkDateTimePicker :dark="userDetail.data[0].Users.theme === 'dark' ? true:false" v-model="date_range" only-date color="#17a2b8" :range="true" :auto-close="true"  formatted="L" :locale="$i18n.locale" :custom-shortcuts = "dateShortCutT" :shortcut="chartCustom != null?'':'thisMonth'" :format="`YYYY-MM-DDTHH:mm:ss`" :max-date="getMaxdate()"> 
					   <input type="text" style="width:155px" :placeholder="$t('Transaction.SelectDates')"/>
    				</VueCtkDateTimePicker>
    			</h4>     
    			<h6 v-if="chartType=='daily' || fakeChartType === 'daily'">DAILY AVERAGE VALUES (GHS)</h6>
    			<h4 v-else-if="chartType=='weekly' || chartType=='monthly' || chartType=='custom'" style="width:12%" >{{this.convertBigNumberIntoString(total)}} GHS</h4>    
    		</div>
			<b-row v-if="chartData!=null  && chartType!='daily' && fakeChartType != 'daily'">
				<LineCustom :key="chartType" @setTotal="total = $event" :chartData="chartData" :chartId="name.replace(/\s/g,'') + chartType" :chartType="chartType" :chartPeriod="getDateTest(chartType,chartPeriod,true)" :fakeChartType='fakeChartType'></LineCustom>               
			</b-row>
			<b-row v-if="chartData!=null ">
				<b-col >
					<DataTableReport :chartColor="chartColor" :data="chartData" :DataTitle="name" :header="getHeaderTitle(chartType)[name]" :editData="isEditing" @editval="editDataValidation($event)" :fakeChartType='fakeChartType'></DataTableReport>
				</b-col>
			</b-row> 
			<p v-if="chartType!='custom'" class="text-danger " > <span style="font-weight:bold" v-if="notes!=''">Note: </span> {{notes}}
				<b-button v-show="isEditing!='never'" @click="$emit('editval',['setNotes',null])" size="sm" style="background: rgb(60, 74, 131) none repeat scroll 0% 0%; color: white;"
				><i class="fas fa-edit" ></i> {{notes!=''?'Edit':'Add Notes'}}</b-button> 
			</p>        
		</b-card >
	</div>
</template>

<script lang="js">
	import methods from '@/mixins/methods'
	import LineCustom from '@/components/LineCustom'
	import DataTableReport from '@/components/DataTableReport'
	import moment from 'moment-timezone';
	import Loading from 'vue-loading-overlay';

	export default {  
		name: "AnalyticBox",
		components: {
			DataTableReport,
			LineCustom,
			Loading,
		},
		props: {
            isEditing:{ //this is to know if the report can be edited or not.(edit is enable only on report validation with a double click)
            	type:String,
            	default:'never'
            },
            ID:{//id of the report if not present default will be load 
            	type:String,
            	default:"notSet"
            },
            name:{//name of the report if not present default will be load 
            	type:String,
            	default:"Unknown"
            },
            chartType:{//the chat type
            	type:String,
            },
            official:{//to know if the report is official or not, if not set in parent, will get default value.
            	type: Boolean,
            	default:true
            },   
            reportPrintable:{ // Rapports à imprimer
            	type: Boolean,
            	default:false
            },        
            dataUpdate:{// if the user change the value from parent(type, period,...)
            	type: Boolean
            },
            chartCustom:{// this if for custom report. will receive the start and the end date and applied to the data_range
            	type:String,
            	default:null
            },
            chartRowId:{
            	type:String,
            	default:"TopUp"
            },
            isValidate:{
            	type:Boolean,
            	default:false
            },
            toggleDark:{
            	type:String,
            	default:'nodark'
            },
            functionName:{
            	type:String,
            	default:null,
            },
            callback:{
            	type:String,
            	required:true,
            },
            getter:{
            	type:String,
            	required:true,
            },
            chartColor:{
            	type:String,
            },
            boxIcon:{
            	type:String,
            },
            widget:{
            	type:String,
            },
            tmp:{
            	type:Object,
            },
        },
		mixins: [methods],

		data() {
			return {
				total: 0,
				notes:'',   
				chartData:null,
				chartPeriod:this.chartCustom,
				max_date:"",
				date_range:null,
				type:this.chartType,
				start:'',
				end:'',
		        isUpdating:false,// is true when finish updating, and false when start updating,
		        fakeChartType:false,
		    };
		},
		mounted(){  
			this.callReportAnalyticBox();
		},    
		updated() {
			if(this.isUpdating != this.dataUpdate) {             
				this.$nextTick(function () {
					if(this.isUpdating==false){
						setTimeout(() => { this.$emit('updateDone', this.isUpdating) }, 500)
					}
					else{
						this.$emit('updateDone', true);
					}
				})
			}
		},

		methods:{
			getFirstDayOfMonth() {
				return moment().startOf('month').unix();
			},

			getCurrentDayOfMonth() {
				return moment.utc().unix();
			},
			callReportAnalyticBox(){                 
				if(this.ID!=null){                                                                
					if(!isNaN(this.ID)){
						this.isUpdating=true
						var payload = {
							token: this.user.token,
							id:this.ID,
						}
						if(this.callback == 'Report/callReportAntifraud'){
							// payload.start_date = this.getFirstDayOfMonth();
							// payload.end_date = this.getCurrentDayOfMonth();
						}
						this.$store.dispatch(this.callback, payload)
					}            
					else if(this.ID=="notSet"){ 

		                //if no id is sent(default val will be notset)
		                if(this.chartType != 'custom'){
		                    //then check if the type is not custom
		                    if(this.isValidate){
		                    	this.$store.dispatch(this.callback, {
		                    		token: this.user.token,
		                    		type:this.chartType,
		                    		validated:0,
		                    		start_date: this.getFirstDayOfMonth(),
		                    		end_date: this.getCurrentDayOfMonth(),
		                    	})
		                    }
		                    else{
		                    	this.$store.dispatch(this.callback, {
		                    		token: this.user.token,
		                    		type:this.chartType,
		                    		start_date: this.getFirstDayOfMonth(),
		                    		end_date: this.getCurrentDayOfMonth(),
		                    	})
		                    }
		                    this.isUpdating=true 
		                }
		                else if(this.chartCustom != null){
		                	let periods =   this.getDateTest(this.chartType,this.chartPeriod,true)
		                	let objectValues = {
		                		token: this.user.token,
		                		type:'custom',
		                		start_date:moment.utc(periods[0]).unix(),
		                		end_date:moment.utc(periods[1]).unix(),
		                        // start:new Date(periods[0]).getTime() / 1000,
		                        // end:new Date(periods[1]).getTime() / 1000,
		                    };
		                    this.$store.dispatch(this.callback, objectValues)
		                    this.isUpdating=true 

		                }
		                else if(this.date_range !=null && this.date_range.start && this.date_range.end){
		                    //if its custom then will call webservice with a start and an end  
		                   
		                    
		                    let objectValues = {
		                    	token: this.user.token,
		                    	type:'custom',
		                    	start_date:moment(this.date_range.start+"+0000").unix(),
		                    	end_date:moment(this.date_range.end+"+0000").add(1,'s').unix(),
		                        // start:new Date(this.date_range.start).getTime() / 1000,
		                        // end:new Date(this.date_range.end).getTime() / 1000,
		                    }
		                    // if(this.date_range.start.substr(0,10) == this.date_range.end.substr(0,10)){
		                        // objectValues.end = moment(this.date_range.end+"+0000").add(1,'s').unix(); // One second added
		                    // }  
		                    this.$store.dispatch(this.callback, objectValues)
		                    this.isUpdating=true 
		                }
		                
		            }
		        }       
		    },
		    getMydata(data,exist=true){ 	
		    	if(data==null){
		    		if(!exist){ // si le widget n'existe pas encore dans le passe. Exemple antifraud
		    			this.chartData = this.getData2(null,this.functionName,this.chartType);
		    			this.fakeChartType = this.date_range && this.date_range.start.substr(0,10) == this.date_range.end.substr(0,10) ? 'daily':null;
		    			this.isUpdating = false;
		    			return;
		    		}
		            //if no data is sent then will set isUpdating to true(haven't finished updating)
		            this.isUpdating = true
		            return
		        }
		        else if(data.type == this.chartType){ 
		            //if theres data, then check if the data type is the same as this.chartType     
		            if(!this.official && typeof this.chartPeriod !== undefined && this.chartPeriod != data.period){
		                //non offical report will enter here if the chartperiod is set and its diferent to the data period
		                //return this.chartData //return the last value of this.chartData.
		                this.isUpdating=true 
		                return                  
		            }
		            this.chartData = this.getData2(data,this.functionName,data.type);
		            if(data.period) this.chartPeriod = data.period;
		            this.notes = typeof data.notes !== undefined && data.notes ? data.notes:'';
		            this.$emit('editval',["setNotes",this.notes]) //this emit the notes to the parent for update.              
		            this.$emit('editval',["setReports",this.chartData])
		            this.isUpdating = false
		            this.type = this.chartType 
		        }
		        else if(this.official){
		            //if its an offical report, then there will be only one of each report, so if the
		            //chartType is not equal to the data type, then will set value to null for the chart and others.
		            //this.isUpdating = false
		            this.chartData = this.getData2(null,this.functionName,this.chartType)
		        }
		        this.fakeChartType = this.date_range && this.date_range.start.substr(0,10) == this.date_range.end.substr(0,10) ? 'daily':null;
		        //return this.chartData;
		    },

		    setTimePeriod(time_period) {       
		    	if (this.start && this.end && this.start !== 0 && this.end!== 0) { 
		    		this.chartPeriod = "From "+this.start+" to "+this.end
		    		this.$emit('updateDone',true);
		    	}               
		    },

		    getMaxdate(){
		        //set the max date to today in date picker
		        return new Date().toISOString().substr(0,10);
		    },

		    editDataValidation(val){
		    	if(typeof val=='object'){
		    		this.isUpdating=true 
		    		let dataEdited = {}                        
		    		for(let [key, value] of Object.entries(val[1])){
		    			dataEdited = {
		    				token: this.user.token,
		    				id: this.ID,
		    				action: "edit",
		    			} 
		    			dataEdited.operator = val[0][key].operator;
		    			if(this.tmp.widget == 'mobileMoney'){
		    				if(value.includes("Fees"))
								dataEdited['Mobile Money daf']= val[0][key].Fees
							if(value.includes("Transactions"))
								dataEdited['Mobile Money dat']= val[0][key].Transactions
							if(value.includes("DailyRevenue"))
								dataEdited['Mobile Money daa']= val[0][key].DailyRevenue
		    			}else if(this.tmp.widget == 'interIncom'){
		                	dataEdited['Int Incoming tm']= val[0][key].Minutes
		                }else{
		                	dataEdited[this.tmp.fields.revenue] = val[0][key].DailyRevenue
		                }
		                this.$store.dispatch("Report/callDailyReport", dataEdited);    
		            }
		        }
		        else
		        	this.$emit('editval',val) 
		    }
		},

		computed:{
			user() {
		        //checking user object from state
		        return this.$store.getters.user;
		    },
		    reportAnalyticBox(){
		    //if(this.$store.getters.report.report){
		    	return this.$store.getters[this.getter]
		    //}
		    },
		    userDetail(){
		    	return this.$store.getters.userDetail;
		    },
		    edit(){
		    	return this.$store.getters['edit']
		    },
		    dateShortCutT() {
		    	let today = moment.utc();
		    	let day = today.date() - 1;
		    	var firstDay = moment().startOf('month');
		    	let Difference_In_Time = today.unix() - firstDay.unix(); 
		    	let Difference_In_Days = Math.floor(Difference_In_Time / (3600 * 24) +1)

		        // Méga patch en attendant une vraie solution. Car day = 0 (le premier du mois) ca fait un bug.
		        if(day == 0)
		        	day = 1

		        let data =  [
		        { key: 'thisWeek', label: this.$t('Period.week'), value: 'isoWeek' },
		        { key: 'thisMonth', label: this.$t('Period.month'), value: Difference_In_Days-1 },
		        { key: 'today', label: this.$t(`Period.day`), value: 'day' },
		        { key: 'yesterDay', label: this.$t('Period.yesterday'), value: '-day' }
		        ];
		        if(this.chartCustom != null)               
		        	this.date_range = {start:this.chartCustom[0],end:this.chartCustom[1]}
		        return data 
		   	}
		},

		watch:{
			reportAnalyticBox(value){
				if(this.isUpdating){
					// En attendant qu'Hervé ajoute les champs manquants, on les ajoute manuellement pour Antifraud
		            if((typeof value.period === undefined || !value.period) && value.trend){
		                let period;
		                if(this.chartType === 'custom'){
		                    period = this.chartPeriod;
		                }else{
		                    // Recupération de la dernière date dans les trends pour n'importe quelle opérateur
		                    if(typeof value.trend.sent !== undefined && value.trend.sent){
			                    var datesValuesObject = Object.values(value.trend.sent).filter(dateObject => Object.keys(dateObject).length > 0)[0]; 
			                    var datesArray = Object.keys(datesValuesObject);
			                    var lastDateString = datesArray[Object.keys(datesArray).length - 1];
			                    if(datesArray.length == 1){ // Une seule date est probablement du type daile,
			                        period =  moment.utc(lastDateString,'YYYY-MM-DD').format("YYYY-MM-DD") // format: YYYY-MM-DD
			                    }else{
			                        // On ajoute une journée, pour avoir la période exacte;
			                        period = moment.utc(lastDateString,'YYYY-MM-DD').add(1,'d').format("YYYY-MM-DD");
			                    }
			               	}else{
			               		this.getMydata(null,false);
			               		return;
			               	}
		                }
		                value.period = period;

					}
					this.getMydata(value);
				}
			},
			edit(val){
				if(this.isUpdating){
					this.$emit('editval',"desactivate")
				}
			},
			dataUpdate(value){
				if(value){
					if(this.type!=this.chartType){
						this.chartData = this.getData2(null,this.functionName,this.chartType)           
		            }
					if(this.type == 'custom'){
						if(this.start && this.end){
							this.callReportAnalyticBox();
						}
						return;
					}  
					this.callReportAnalyticBox();  
				}
			},
			date_range() {
				let day = moment.utc().date() - 1;  
				this.start = this.date_range && this.date_range.start != null ? moment(this.date_range.start+"+0000").unix() : null;
				this.end = this.date_range && this.date_range.end != null ? moment(this.date_range.end+"+0000").add(1,'s').unix() : null;

		        if (this.date_range != null) {
		        	switch(this.date_range.shortcut){
		        		case 'day' :
		            		this.setTimePeriod("day")
		            		break
		        		case 'week' :
		            		this.setTimePeriod("week")
		            		break
		        		case day :
		            		this.setTimePeriod("month")
		            		break
		        		default :
		                    this.setTimePeriod("custom")
		        	}
		        }
		        if(this.widget){
			        this.$emit('updateWidgetDate',{
			            "widget":this.widget,
			            "date_range":[ moment(this.date_range.start+"+0000"),moment(this.date_range.end+"+0000")]
			        });
			   	}
		    },      
		}
	}
</script>

<style scoped>

.mt-cus1{
	margin-top: 1.4rem;
}
.mt-cus2{
	margin-top: 3rem;
}
.mt-cus3{
	margin-top: 4.5rem;
}
</style>