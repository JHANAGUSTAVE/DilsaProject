<template>
	<div  class="row justify-content-center align-items-center"> 
		<div v-for="i in reportWidgets" :key="i.name" v-if="i.name !== 'Plaintext'" :class="(i.name == 'antifraud') ? 'col-12 mt-3':'col-lg-3 col-md-6 col-12'">
			<ReportSectionCard 
			:ReportType="ReportType"
			:ReportSectionCardType="getSectionCardType(i.name)[0]"
			:ReportSectionCardField="getSectionCardType(i.name)[1]"
			:ReportSectionCardRestiction="i.typeOrDate"
			>
			</ReportSectionCard>       
		</div>
	</div> 
</template>

<script lang="js">
	import ReportSectionCard from '@/components/widgets/FourReportsSection/ReportSectionCard'
	export default {
		name:"FourReportsSection",
		props:['ReportType','reportWidgets'],
		components:{
		    ReportSectionCard,
		},
		methods:{
			getSectionCardType(index){
				let val = ''
				let field = {}
				switch (index) {
					case 'topup':
						val = 'TopUp'
						field = { 
							revenue: "TOPUP Dav",
							previous: "TOPUP Previous",
							trend: "TOPUP Trend",
							weeklyRevenue:"TOPUP"
						}

						break;
					case 'prepaid':
						val = 'PrePaid'
						field  = {
							revenue: "Prepaid Dar",
							previous: "Prepaid Previous",
							trend: "Prepaid Trend",
							weeklyRevenue:"Prepaid"
						}
						break;
					case 'mobileMoney':
						val = 'MobileMoney'
						field =  {
							revenue: "Mobile Money daa",
							previous: "Mobile Money Previous",
							trend: "Mobile Money Trend",
							weeklyRevenue:"Mobile"                        
						}
						break;
					case 'interIncom':
						val = 'Inter'
						field =  {
							revenue: "Int. Incoming tr",
							previous: "Int. Incoming Previous",
							trend: "Int. Incoming Trend",
							weeklyRevenue:"International"
						}
						break;  
					case 'antifraud':
						val = 'Antifraud'
						field =  {
							sent: "sent",
							sent_previous: "sent_previous",
							sent_previous_percentage: "sent_previous_percentage",
							received: "received",
							received_previous: "received_previous",
							received_previous_percentage: "received_previous_percentage",
							fraudulent: "fraudulent",
							fraudulent_previous: "fraudulent_previous",
							fraudulent_previous_percentage: "fraudulent_previous_percentage",
							weeklyRevenue:"Antifraud",
						}
						break;      
					default:
						break;
				}
				return [val,field]
			},			
		},
	}
</script>

<style lang="css" scoped> 
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
		/*font: Regular 20px/24px Helvetica Neue;*/
		letter-spacing: 0;
		font-family: 'Helvetica';
		font-size: 20px;
		font-weight: regular;
		letter-spacing: 0
		
	}
	.text-css {
		font-family: Helvetica;
		font-style: normal;
		font-weight: bold; 
		font-size: 25px;
		/*	font: Bold 48px/58px Helvetica Neue;*/
		letter-spacing: 0;
	}
	.text-normal{
		/*	font: Regular 18px Helvetica Neue;*/
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
		/*color: white;*/
		max-height: 226px;
		min-height: 226px;
		/*max-width: 244.5px;*/
		/*min-width: 244.5px;*/
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