<template>

	<div class="container">
		<b-row>
			<b-col class="col" md="5">
				<div :id="chartId+'Pie'" style="width: 100%; height: 253px; "></div>
			</b-col>

			<b-col class='col' md="7"> {{setTotal}}    
				<div :id="chartId" style="width: 100%; height: 272px; "></div>
			</b-col>
		</b-row>    
	</div>

</template>

<script lang="js">
	import moment from 'moment-timezone'
	let am4core = null;
	let am4themes_animated = null;
	let am4charts = null;

	export default {  
		name: "LineCardMonth",
		props: {
			chartData:{
				type: Array,
				required: true
			}, 
			chartId:{
				type: String,
				required: true
			},
			chartType:{
				type: String,
				required: true
			},
			setTotal:{
				type: Number
			},
			chartPeriod:{
				type:Array,
			}

		},
		data() {
			return {
				chartLine: null,
				chartPie:null,
			};
		},  

		created(){
			am4core = this.$am4core;
			am4themes_animated = this.$am4themes_animated;
			am4charts = this.$am4charts;
			am4core.useTheme(am4themes_animated);
		},
		mounted(){
			if(_.size(this.chartData)>0){
				this.createPieChart()
				this.createLineChart()
			}      
		},
		watch:{
			chartData(value){
				if(this.chartPie ==null ||this.chartLine==null){
					this.createPieChart()
					this.createLineChart()
				}
				if(value){
					this.updatePieChart(value)
					for(let obj of Object.entries(value)){
						this.updateLineChart(obj[1].operator,obj[1].weeklyTrend)               
					}
					this.chartline.validateData()                
				}
			}
		},

		methods:{
			createLineChart(){


				am4core.useTheme(am4themes_animated);
				var data = [];

				if (this.chartline) this.chartline.dispose();        	
				this.chartline = am4core.create(this.chartId, am4charts.XYChart);
				this.chartline.colors.list= [
                    am4core.color('#00aa00'), am4core.color("#FF69B4"),
				    am4core.color('#ff0000'), am4core.color('#FFA500'),
				];            
                
				var Difference_In_Time = this.chartPeriod[1].unix() - this.chartPeriod[0].unix(); 
				let Difference_In_Days = Math.floor(Difference_In_Time / (3600 * 24) +1)
				let that = this;
				for (var i = 0; i < Difference_In_Days; i++) {
					var this_date = moment.utc([this.chartPeriod[0].year(), this.chartPeriod[0].month(), this.chartPeriod[0].date()]);
					data.push({
						date: this_date.clone().add(i,'d').format('YYYY-MM-DD')
					});
				}
				this.chartline.data = data;
				var dateAxis = this.chartline.xAxes.push(new am4charts.DateAxis());

				dateAxis.renderer.minGridDistance = 50;
				dateAxis.renderer.grid.template.location = 0.5;            
				dateAxis.renderer.labels.template.location = 0.5001;

				dateAxis.events.on("startchanged", valueAxisZoomed);
				dateAxis.events.on("endchanged", valueAxisZoomed);

				if(that.chartType == "weekly"){
					let day=['S2','M','T','W','T2','F','S']
					dateAxis.renderer.labels.template.adapter.add("textOutput", function(text,val) {  
						if(typeof text!='undefined'){
							let d = moment(val.dataItem.date).utc();
							return day[d.day()]
						}
						else
							return text                            
					});
				}
				else if(that.chartType == "monthly"){
					dateAxis.renderer.minGridDistance = this.chartType == "monthly" && Difference_In_Days==30?1:50;
					dateAxis.renderer.labels.template.adapter.add("textOutput", function(text,val) {
						if(typeof text != 'undefined'){ 
							let d = val.dataItem.date    
							d = moment(d).utc();                     
							let dat = d.date()
							if(dat!=1  && Difference_In_Days<31)
								return dat%5!=0?"":dat+"";
							else
								return dat+"";
						}
						else{
							return text                            
						}
					});
				}

				var valueAxis = this.chartline.yAxes.push(new am4charts.ValueAxis());
				valueAxis.renderer.labels.template.disabled = true
				valueAxis.min = 0;          

				function addSeries(operator,data) {
					that.updateLineChart(operator,data)
					var seriesId = that.chartline.series.length + 1;              

                // Create series
                var series = that.chartline.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = operator;
                series.dataFields.dateX = "date";
                series.name = operator;
                //series.tooltipText = `{${operator}}`
                //series.tensionX = 0.8;
                series.strokeWidth = 3;
                series.minBulletDistance = 15;

                // Drop-shaped tooltips
                series.tooltip.background.cornerRadius = 20;
                series.tooltip.background.strokeOpacity = 0;
                series.tooltip.pointerOrientation = "vertical";
                series.tooltip.label.minWidth = 40;
                series.tooltip.label.minHeight = 40;
                series.tooltip.label.textAlign = "middle";
                series.tooltip.label.textValign = "middle";

                // Make bullets grow on hover
                var bullet = series.bullets.push(new am4charts.CircleBullet());
                bullet.circle.strokeWidth = 2;
                bullet.circle.radius = 4;
                bullet.circle.fill = am4core.color("#fff");

                var bullethover = bullet.states.create("hover");
                bullethover.properties.scale = 1.3;

                that.chartline.exporting.menu = new am4core.ExportMenu();
				that.chartline.exporting.menu.align = "left";
				that.chartline.exporting.menu.verticalAlign = "top";

				that.chartline.exporting.menu.items = [
					{
						"label": "...",
						"menu": [
						{
							"label": "Image",
							"menu": [
							{ "type": "png", "label": "PNG" },
							{ "type": "jpg", "label": "JPG" },
							{ "type": "svg", "label": "SVG" },
							// { "type": "pdf", "label": "PDF" }
							]
						}, {
							"label": "Data",
							"menu": [
							{ "type": "json", "label": "JSON" },
							{ "type": "csv", "label": "CSV" },
							// { "type": "xlsx", "label": "XLSX" },
							{ "type": "html", "label": "HTML" },
							// { "type": "pdfdata", "label": "PDF" }
							]
						}, {
							"label": "Print", "type": "print"
						}
						]
					}
				];

               // series.stacked = true; //add space between between combined liens
                /* let bullet = series.bullets.push(new am4charts.CircleBullet());
                bullet.tooltipText = "[bold font-size: 17px]Date: {date}"+"\nvalue: {valueY}[/]";
                bullet.strokeWidth = 0;
                bullet.circle.fill = series.stroke; */
               // this.chartline.invalidateData();
           }
           function valueAxisZoomed(ev) {
                //enable or disable sclollbarx
                var start = new Date(ev.target.minZoomed)
                var end = new Date(ev.target.maxZoomed)
                start.setHours(0, 0, 0, 0);
                end.setHours(23, 59, 59, 0);
                
                if(+start!==+that.chartPeriod[0] || +end!==+that.chartPeriod[1]){
                	if(that.chartline.scrollbarX.disabled==true)
                		that.chartline.scrollbarX.disabled = false;
                }
                else if(!that.chartline.scrollbarX.disabled)
                	that.chartline.scrollbarX.disabled = true;
            }

            //create series
            for(let value of Object.entries(this.chartData)){
            	addSeries(value[1].operator,value[1].weeklyTrend)               
            }
            // Add cursor
            this.chartline.cursor = new am4charts.XYCursor();
            this.chartline.cursor.fullWidthLineX = true;
            this.chartline.cursor.xAxis = dateAxis;
            this.chartline.cursor.lineX.strokeWidth = 0;
            this.chartline.cursor.lineX.fill = am4core.color("#000");
            this.chartline.cursor.lineX.fillOpacity = 0.1;


            // Add scrollbar
            this.chartline.scrollbarX = new am4core.Scrollbar();
            this.chartline.scrollbarX.disabled = true;

            // Fix axis scale on load
            this.chartline.events.on("ready", function(ev) {
            	valueAxis.min = valueAxis.minZoomed;
            	valueAxis.max = valueAxis.maxZoomed;
            });
            
            this.chartline.legend = new am4charts.Legend();
        },
        createPieChart(){
        	if (this.chartpie) this.chartpie.dispose();
        	this.chartpie = am4core.create(this.chartId+"Pie", am4charts.PieChart);
        	this.chartpie.data=[]
        	this.updatePieChart(this.chartData)
        	this.chartpie.innerRadius = am4core.percent(30);

            // Add color
            var colors=[
            am4core.color('#00aa00'),
            am4core.color("#FF69B4"),
            am4core.color('#ff0000'),
            am4core.color('#FFA500')
            ];

            // Add and configure Series
            let pieSeries = this.chartpie.series.push(new am4charts.PieSeries());
            var colorSet = new am4core.ColorSet();
            colorSet.list = colors.map(function(color) {
            	return new am4core.color(color);
            });
            pieSeries.colors = colorSet;
            pieSeries.dataFields.value = "value";
            pieSeries.dataFields.category = "operator";
            
            // Disable ticks and labels
            pieSeries.labels.template.disabled = true;
            pieSeries.ticks.template.disabled = true;
            
            //show legend
            this.chartpie.legend = new am4charts.Legend();
            this.chartpie.legend.valueLabels.template.text = ""

            var markerTemplate = this.chartpie.legend.markers.template;
            markerTemplate.width = 15;
            markerTemplate.height = 15;       
        },
        updateLineChart(operator,data){
            for(var i = 0; i < this.chartline.data.length; i++) {
                let day = this.chartline.data[i].date;
                if(data && data[day]){
                	this.chartline.data[i][operator] = data[day].value;
                }
                else{ 
                	this.chartline.data[i][operator] = 0;                        
                }                    
            }
        },
        updatePieChart(value){
        	let type=this.chartType[0].toUpperCase() +this.chartType.slice(1)
        	let data = [];
        	let GuitTot = 0 
        	value.map(x => data.push({ operator: x.operator, value: x[type+"Revenue"] ? x[type+"Revenue"] : (x[type+"Levy"] ? x[type+'Levy'] : x['FraudCalls']) }))
        	data.forEach( x => {
        		if(x.value)
        			GuitTot += Number(x.value)
        	})
        	this.chartpie.data = data;
        	this.$emit('setTotal', GuitTot)
        },
        beforeDestroy() {
			if (this.chartpie) {
				this.chartpie.dispose();
			}
			if (this.chartPie) {
				this.chartPie.dispose();
			}
			if (this.chartline) {
				this.chartline.dispose();
			}
			if (this.chartLine) {
				this.chartLine.dispose();
			}
		}
    },
}
</script>

<style lang="scss" scoped>
.amcharts-amexport-item {
  border: 2px solid #777;
}

.amcharts-amexport-top .amcharts-amexport-item > .amcharts-amexport-menu {
  top: -3px!important;
  left: 2px
}
</style>
