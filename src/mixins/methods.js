import * as moment from 'moment';
import _ from "lodash";

export default {
	data() {
		return {
			PLATFORM_NAME:'Fx Matrix',
			templates:{
				'topup':{
					'id':1, // ID utilisé pour générer des couleurs CSS pour chaque box
                    'widget':'topup',
					'callback':'Report/callReportTopUp',
					'getter':'Report/reportTopUp',
					'name':'TOP UP',
					'functionName':'getTopup', // fonction à appeler pour récupérer les données traitées
					'chartColor':'#F3B265',
					'abbrev':'top',
					'icon':'wallet',
					'currency':'GHS',
					'fields':{
						revenue: "TOPUP Dav",
						previous: "TOPUP Previous",
						trend: "TOPUP Trend" 
					}
				},
				'prepaid':{
					'id':2,
                    'widget':'prepaid',
					'callback':'Report/callReportPrePaid',
					'getter':'Report/reportPrePaid',
					'name':'PRE-PAID',
					'functionName':'getPrepaid',
					'chartColor':'#C94D7B',
					'abbrev':'pre',
					'icon':'money-bill',
					'currency':'GHS',
					'fields':{
						revenue: "Prepaid Dar",
						previous: "Prepaid Previous",
						trend: "Prepaid Trend"
					}
				},
				'mobileMoney':{
					'id':3,
                    'widget':'mobileMoney',
					'callback':'Report/callReportMobileMoney',
					'getter':'Report/reportMobileMoney',
					'name':'MOBILE MONEY',
					'functionName':'getMobile',
					'chartColor':'#229FB2',
					'abbrev':'mob',
					'icon':'mobile-alt',
					'currency':'GHS',
					'fields':{
						revenue: "Mobile Money daa",
						previous: "Mobile Money Previous",
						trend: "Mobile Money Trend"
					}
				},
				'interIncom':{
					'id':4,
                    'widget':'interIncom',
					'callback':'Report/callReportInter',
					'getter':'Report/reportInter',
					'name':'INTERNATIONAL INCOMING',
					'functionName':'getInter',
					'chartColor':'#4ABB99',
					'abbrev':'inter',
					'icon':'globe',
					'currency':'USD',
					'fields':{
						revenue: "Int. Incoming tr",
						previous: "Int. Incoming Previous",
						trend: "Int. Incoming Trend"
					}
				},
				'antifraud':{
					'id':5,
                    'widget':'antifraud',
					'callback':'Report/callReportAntifraud',
					'getter':'Report/reportAntifraud',
					'name':'ANTIFRAUD',
					'functionName':'getAntifraud',
					'chartColor':'#0B3C6B',
					'abbrev':'anti',
					'icon':'user-secret',
					'currency':'',
					'fields':{
						sent: "sent",
						sent_previous: "sent_previous",
						sent_previous_percentage: "sent_previous_percentage",
						received: "received",
						received_previous: "received_previous",
						received_previous_percentage: "received_previous_percentage",
						fraudulent: "fraudulent",
						fraudulent_previous: "fraudulent_previous",
						fraudulent_previous_percentage: "fraudulent_previous_percentage"
					}
				},
                'Plaintext':{
                    'id':6,
                    'widget':'Plaintext',
                    'name':'Plaintext',

                }
			},
		}
	},
	methods: {
		dateShortCut() {
			let day = new Date().getDate() - 1

            // Méga patch en attendant une vraie solution. Car day = 0 (le premier du mois) ca fait un bug.
            if(day == 0)
            	day = 1
            let data = []
            if(this.RTimePeriod){
            	data =  [
            	{ label: this.$t('Period.week'), value: 'week', isSelected: this.RTimePeriod == 'week'? true  : false },
            	{ label: this.$t('Period.month'), value: day, isSelected: this.RTimePeriod == 'month'? true  : false  },
            	{ label: this.$t(`Period.day`), value: 'day', isSelected: this.RTimePeriod == 'day'? true  : false  },
            	{ label: this.$t('Period.yesterday'), value: '-day', isSelected: false }
            	]
            	if(day != 7)
            		data.push({ label: this.$t('Period.7days'), value: 7, isSelected: this.RTimePeriod == '7days'? true  : false  })

            }
            else{
            	data =  [
            	{ label: this.$t('Period.week'), value: 'week', isSelected:  true },
            	{ label: this.$t('Period.month'), value: day, isSelected:  false  },
            	{ label: this.$t(`Period.day`), value: 'day', isSelected: false  },
            	{ label: this.$t('Period.yesterday'), value: '-day', isSelected: false },
            	]
            	if(day != 7)
            		data.push(    { label: this.$t('Period.7days'), value: 7, isSelected:  false  })
            }
            return data 
        },
        validateName(name) {
        	if (!name.length) {
        		return { valid: false, error: "This field is required" };
        	}
        	return { valid: true, error: null };
        },

        validateEmail(email) {
        	let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        	return re.test(String(email).toLowerCase());
        },
        convertBigNumberIntoString(num) {
        	var suffixes = [" k", " M"," G"];

        	if (num < 99999) {
        		return ((num/1).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
        	} else if (num > 99999 && num < 999999) {
        		return (
        			(num / 1000)
        			.toFixed(2)
        			.toString()
        			.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + suffixes[0]
        			);
        	} else if (num > 999999 && num < 9999999999) {
        		return (
        			(num / 1000000)
        			.toFixed(2)
        			.toString()
        			.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + suffixes[1]
        			);
        	}
        	else {
        		return (
        			(num / 1000000000)
        			.toFixed(2)
        			.toString()
        			.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + suffixes[2]
        			);
        	}
        },
        formatNumber(num, digits) {
            var si = [
            { value: 1, symbol: "" },
            { value: 1E3, symbol: "k" },
            { value: 1E6, symbol: "M" },
            { value: 1E9, symbol: "G" },
            { value: 1E12, symbol: "T" },
            { value: 1E15, symbol: "P" },
            { value: 1E18, symbol: "E" }
            ];
            var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
            var i;
            for (i = si.length - 1; i > 0; i--) {
            if (num >= si[i].value) {
            break;
            }
            }
            return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
        },

        
        extractID(str){
        	let m;
        	const regex = /[a-zA-Z]+_(\d+)/gm;
        	while ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
            	regex.lastIndex++;
            } 
            return m[1]
        }            
    },
    goFullscreenMode(widgetName){
    	this.$store.dispatch("callFullscreenWidget",{
    		widgetName
    	})
          // this.$router.push("/fullscreenwidget");
          let routeData = this.$router.resolve({name: 'FullscreenWidget'}); 
          window.open(routeData.href, '_blank');
      },
      changeLanguage(locale){
      	if (locale !==null) {
      		this.$store.dispatch("callLocaleLang",locale )
      	}
      },

      getNotes(report){
      	return report.operator.notes;
      },

      getData(report){          
      	const data = []
      	const dataPrepaid = []
      	const dataMobile = []
      	const dataInter =  []
      	const dataTopup = []          
      	let weeklyTr=report.operator.trend
      	let type=report.type[0].toUpperCase() +report.type.slice(1)
      	for (let [key,value] of Object.entries(report.operator)){

      		switch(key){
      			case 'Airtel-Tigo':
      			case 'MTN': 
      			case 'Vodafone':                  
      			this.getMobile(dataMobile,key,value,weeklyTr, type);
      			break;
      			case 'Glo':                 
      			this.getPrepaid(dataPrepaid,key,value,weeklyTr, type);
      			this.getTopup(dataTopup,key,value,weeklyTr, type);
      			break;
      			case 'Afriwave':
      			this.getInter(dataInter,key,value,weeklyTr, type);
      			break;

      		}
      	}

      	data.push(dataTopup.sort((a,b) => (a.operator > b.operator) ? 1 : ((b.operator > a.operator) ? -1 : 0)))
      	data.push(dataPrepaid.sort((a,b) => (a.operator > b.operator) ? 1 : ((b.operator > a.operator) ? -1 : 0)))
      	data.push(dataMobile.sort((a,b) => (a.operator > b.operator) ? 1 : ((b.operator > a.operator) ? -1 : 0)))
      	data.push(dataInter.sort((a,b) => (a.operator > b.operator) ? 1 : ((b.operator > a.operator) ? -1 : 0)))
      	return data; 
      },
      getData2(report, widget, type){
            // report : data received from the backend;
            // widget : getter [getTop,getPrepaid,getMobile,getInter]
            // type : [daily,weekly,monthly,custom]
            const data = []
            const dataPrepaid = []
            const dataMobile = []
            const dataInter =  []
            const dataTopup = []          

            type = type[0].toUpperCase() + type.slice(1);
            if(report !== null){
            	let weeklyTr = report.trend;
            	for (let [key,value] of Object.entries(report.info)){                  
            		switch(key.toLowerCase()){

            			case 'afriwave':                    
            			if(widget=="getInter")
            				this[widget](data,key,value,weeklyTr, type)
            			break;
            			case 'glo': 
            			if(widget!="getMobile")
            				this[widget](data,key,value,weeklyTr, type)
            			break;
            			case 'airtel-tigo':
            			case 'mtn':
            			case 'vodafone':
            			this[widget](data,key,value,weeklyTr, type)
            			break;
            			
            		}
            	}
            }else{
            	for(let operator of this.getOperators(widget)){
            		switch(operator){
            			case 'Afriwave':                    
            			if(widget=="getInter")
            				this[widget](data,operator,null,report!=null?report.period:null, type)
            			break;
            			case 'Glo': 
            			if(widget!="getMobile")
            				this[widget](data,operator,null,report!=null?report.period:null, type)
            			break;
            			case 'Airtel-Tigo':
            			case 'MTN':
            			case 'Vodafone':
            			this[widget](data,operator,null,report!=null?report.period:null, type)
            			break;
            		}
            	}
            }       
            return data.sort((a,b) => (a.operator > b.operator) ? 1 : ((b.operator > a.operator) ? -1 : 0)); 
        },

        getTopup(data,key,value,weeklyTr, type){
        	let obj = {}
        	obj.operator = key
        	for(let el of this.getHeaderTitle(type.toLocaleLowerCase())['TOP UP']){
        		el = el.replace(/<br\s?\/>|\s|\d|\.|%|\(.*\)/g,'')

        		if(el == type+"Revenue")
        			obj[el] = `${ value != null && !isNaN(value['TOPUP Dav']) ? Number(value['TOPUP Dav']) : '0'}`
        		else if(el == "Trend")
        			obj[el] = `${ value != null && !isNaN(value['TOPUP Trend']) ? Number(value['TOPUP Trend']) : '0'}`
        		else if(el == "VAT")
        			obj[el] = `${ value != null && !isNaN(value['TOPUP VAT']) ? Number(value['TOPUP VAT']) : '0'}`
        		else if(el == "CST")
        			obj[el] = `${ value != null && !isNaN(value['TOPUP CST']) ? Number(value['TOPUP CST']) : '0'}`
        		else if(el == "NHIL")
        			obj[el] = `${ value != null && !isNaN(value['TOPUP NHL']) ? Number(value['TOPUP NHL']) : '0'}`
        		else if(el == "GETFund")
        			obj[el] = `${ value != null && !isNaN(value['TOPUP GET']) ? Number(value['TOPUP GET']) : '0'}`
        		else if(el == "MTDRevenue"  || el == "YTDRevenue")
        			obj[el] = `${ value != null && !isNaN(value['TOPUP_TD'] ) ? Number(value['TOPUP_TD']) : '0'}`
        	}
        	if(type=='Weekly')
        		obj.weeklyTrend = this.getCustomTrend(weeklyTr!=null && typeof weeklyTr=='object'  && weeklyTr['TOPUP']? weeklyTr['TOPUP'][key]:weeklyTr)
        	else if(type=='Monthly')
        		obj.weeklyTrend = this.getCustomTrend(weeklyTr!=null && typeof weeklyTr=='object' && weeklyTr['TOPUP']? weeklyTr['TOPUP'][key]:weeklyTr) 
        	else if(type=='Custom')
        		obj.weeklyTrend = this.getCustomTrend(weeklyTr!=null && typeof weeklyTr=='object'  && weeklyTr['TOPUP']? weeklyTr['TOPUP'][key]:weeklyTr)
        	data.push(obj)
        	return data;
        },

        getPrepaid(data,key,value,weeklyTr, type){
        	let obj = {}
        	obj.operator = key

        	for(let el of this.getHeaderTitle(type.toLocaleLowerCase())['PRE-PAID']){
        		el=el.replace(/<br\s?\/>|\s|\d|\.|%|\(.*\)/g,'')
        		if(el == type+"Revenue")
        			obj[el] = `${ value != null && !isNaN(value['Prepaid Dar']) ? Number(value['Prepaid Dar']) : '0'}`
        		else if(el == "Trend")
        			obj[el] = `${ value != null && !isNaN(value['Prepaid Trend']) ? Number(value['Prepaid Trend']) : '0'}`
        		else if(el == "MTDRevenue"  || el == "YTDRevenue")
        			obj[el] = `${ value != null && !isNaN(value['Prepaid_TD']) ? Number(value['Prepaid_TD']) : '0'}`
        	}

        	if(type=='Weekly')
        		obj.weeklyTrend = this.getCustomTrend(weeklyTr!=null && typeof weeklyTr=='object' && weeklyTr['Prepaid'] ? weeklyTr['Prepaid'][key]:weeklyTr)
        	else if(type=='Monthly')
        		obj.weeklyTrend = this.getCustomTrend(weeklyTr!=null && typeof weeklyTr=='object' && weeklyTr['Prepaid'] ? weeklyTr['Prepaid'][key]:weeklyTr) 
        	else if(type=='Custom')
        		obj.weeklyTrend = this.getCustomTrend(weeklyTr!=null && typeof weeklyTr=='object'  && weeklyTr['Prepaid']? weeklyTr['Prepaid'][key]:weeklyTr)
        	data.push(obj)
        	return data;
        },

        getMobile(data,key,value,weeklyTr, type){
        	let obj = {}
        	obj.operator = key
        	for(let el of this.getHeaderTitle(type.toLocaleLowerCase())['MOBILE MONEY']){
        		el=el.replace(/<br\s?\/>|\s|\d|\.|%|\(.*\)/g,'')
        		if(el == type+"Revenue")
        			obj[el] = `${value != null && !isNaN(value['Mobile Money daa']) ? Number(value['Mobile Money daa']) : '0'}`
        		else if(el == "Trend")
        			obj[el] = `${value != null && !isNaN(value['Mobile Money Trend']) ? Number(value['Mobile Money Trend']) : '0'}`
        		else if(el == "MTDRevenue"  || el == "YTDRevenue")
        			obj[el] = `${value != null && !isNaN(value['Mobile_TD']) ? Number(value['Mobile_TD']) : '0'}`
        		else if(el == "Fees")
        			obj[el] = `${value != null && !isNaN(value['Mobile Money daf']) ? Number(value['Mobile Money daf']) : '0'}`
        		else if(el == "Transactions")
        			obj[el] = `${value != null && !isNaN(value['Mobile Money dat']) ? Number(value['Mobile Money dat']) : '0'}`
        	}
        	if(type=='Weekly')
        		obj.weeklyTrend = this.getCustomTrend(weeklyTr!=null && typeof weeklyTr=='object' && weeklyTr['Mobile'] ? weeklyTr['Mobile'][key]:weeklyTr)
        	else if(type=='Monthly')
        		obj.weeklyTrend = this.getCustomTrend(weeklyTr!=null && typeof weeklyTr=='object' && weeklyTr['Mobile'] ? weeklyTr['Mobile'][key]:weeklyTr)      
        	else if(type=='Custom')
        		obj.weeklyTrend = this.getCustomTrend(weeklyTr!=null && typeof weeklyTr=='object'  && weeklyTr['Mobile']? weeklyTr['Mobile'][key]:weeklyTr)
        	data.push(obj)
        	return data;
        },

        getInter(data,key,value,weeklyTr, type){
        	let obj = {}   
        	obj.operator = key
        	for(let el of this.getHeaderTitle(type.toLocaleLowerCase())['INTERNATIONAL INCOMING']){
        		el=el.replace(/<br\s?\/>|\s|\d|\.|%|\(.*\)/g,'')

        		if(el == type+"Levy")
        			obj[el] = `${value != null && !isNaN(value['Int. Incoming tr']) ? Number(value['Int. Incoming tr']) : '0'}`
        		else if(el == "Trend")
        			obj[el] = `${value != null && !isNaN(value['Int. Incoming Trend']) ? Number(value['Int. Incoming Trend']) : '0'}`
        		else if(el == "MTDRevenue" || el == "YTDRevenue")
        			obj[el] = `${value != null && !isNaN(value['Int. Incoming trm']) ? Number(value['Int. Incoming trm']):'0'}`
        		else if(el == type+"Minutes" || el == 'Minutes')
        			obj[el] = `${value != null && !isNaN(value['Int. Incoming tm']) ? Number(value['Int. Incoming tm']):'0'}`
        		else if(el == "MTDMinutes")
        			obj[el] = `${value != null && !isNaN(value['Int. Incoming tmm']) ? Number(value['Int. Incoming tmm']):'0'}`               
        	}
        	if(type=='Weekly')
        		obj.weeklyTrend = this.getCustomTrend(weeklyTr!=null && typeof weeklyTr=='object' && weeklyTr['International'] ? weeklyTr['International'][key]:weeklyTr)
        	else if(type=='Monthly')
        		obj.weeklyTrend = this.getCustomTrend(weeklyTr!=null && typeof weeklyTr=='object' && weeklyTr['International'] ? weeklyTr['International'][key]:weeklyTr)      
        	else if(type=='Custom')
        		obj.weeklyTrend = this.getCustomTrend(weeklyTr!=null && typeof weeklyTr=='object'  && weeklyTr['International']? weeklyTr['International'][key]:weeklyTr)
        	data.push(obj)
        	return data;
        },
        getAntifraud(data,key,value,weeklyTr, type){
        	let obj = {}   
        	obj.operator = key
        	for(let el of this.getHeaderTitle(type.toLocaleLowerCase())['ANTIFRAUD']){
        		el=el.replace(/<br\s?\/>|\s|\d|\.|%|\(.*\)/g,'');
        		if(el == type+"CallsSent")
        			obj[el] = `${value != null && !isNaN(value['sent']) ? Number(value['sent']) : '0'}`
        		else if(el == "CallsReceived")
        			obj[el] = `${value != null && !isNaN(value['received']) ? Number(value['received']) : '0'}`
        		else if(el == "FraudCalls")
        			obj[el] = `${value != null && !isNaN(value['fraudulent']) ? Number(value['fraudulent']) : '0'}`
        		else if(el == "FraudNumbers")
        			obj[el] = `${value != null && !isNaN(value['fraudulent']) ? 0 : '0'}`
        		else if(el == "YTD" || el == "MTD"){
        			obj[el] = `${value != null && !isNaN(value['fraudulent_TD']) ? Number(value['fraudulent_TD']) : '0'}`
        		}
        		
        	}
        	if(type=='Weekly')
        		obj.weeklyTrend = this.getCustomTrend(weeklyTr!=null && typeof weeklyTr=='object' && weeklyTr['fraudulent'] ? weeklyTr['fraudulent'][key]:weeklyTr)
        	else if(type=='Monthly')
        		obj.weeklyTrend = this.getCustomTrend(weeklyTr!=null && typeof weeklyTr=='object' && weeklyTr['fraudulent'] ? weeklyTr['fraudulent'][key]:weeklyTr)      
        	else if(type=='Custom')
        		obj.weeklyTrend = this.getCustomTrend(weeklyTr!=null && typeof weeklyTr=='object'  && weeklyTr['fraudulent']? weeklyTr['fraudulent'][key]:weeklyTr)
        	data.push(obj)
        	return data;
        },        
        getWeeklyTrend(data){
        	let obj={}
        	if(data!=null){
        		if(typeof data=='object'){
        			for (let [key,value] of Object.entries(data)){
        				obj[new Date(key).getDay()]={'date':key,'value':value}
        			}

        		}
        		else {
        			let regex=/for\s([a-z]+)\s(\d{1,2})\sto\s?[a-z]*\s\d{1,2},\s(\d{4})/ig
        			let result = regex.exec(data);
        			let date=result[3]+"-"+((new Date(result[1]+" "+result[2])).getMonth()+1)+"-"+(result[2].length<2?'0'+result[2]:result[2])
        			obj[new Date(date).getDay()]={'date':date,'value':'0'}
        		}
        	}
        	else{
        		obj[0]={'date':'2019-11-18','value':'0'}
        	}
        	return obj;
        },
        getMonthlyTrend(data){
        	let obj={}
        	if(data!=null){
        		if(typeof data=='object'){
        			for (let [key,value] of Object.entries(data)){
        				obj[new Date(key.replace(/-/gi,'/')).getDate()]={'date':key,'value':value}
        			}
        		}
        		else{
        			let regex=/([a-z]+)\s(\d{4})/ig
        			let result = regex.exec(data.period);
        			let date=result[2]+"-"+((new Date(result[1]+" 01")).getMonth()+1)+"-01"
        			obj['1']={'date':date,'value':'0'}
        		}
        	}
        	else{
        		obj[1]={'date':'2019-11-01','value':'0'}
        	}
        	return obj;
        },
        getCustomTrend(data){
        	let obj={}
        	if(data!=null){
        		if(typeof data=='object'){
        			for (let [key,value] of Object.entries(data)){                
        				obj[key]={'date':key,'value':value}
        			}

        		}

        	}
        	else{
        		obj['2019-11-18']={'date':'2019-11-18','value':'0'}
        	}
        	return obj;
        },
        getHeaderTitle(type){
        	let dataHeader={}
        	if(type=="daily"){
        		dataHeader={
        			'TOP UP':['Daily Revenue<br /> ','Trend<br /> ','VAT<br />12.5%<br /> ','CST<br />9%<br /> ','NHIL<br />2.5%<br /> ','GET<br />Fund<br />2.5%'],
        			'PRE-PAID':['Daily Revenue','Trend'],
        			'MOBILE MONEY':['Daily Revenue','Trend','Fees','Transactions'],
        			'INTERNATIONAL INCOMING':['Daily Levy<br />(Mins x $0.06)','Trend','Minutes'],
        			'ANTIFRAUD':['Daily Calls<br />Sent','Calls<br />Received','Fraud<br />Calls', '% Fraud<br />Numbers'],
        		}
        	}
        	else if(type=="weekly"){
        		dataHeader={
        			'TOP UP':['Weekly<br />Revenue','Trend<br /> ','VAT<br />12.5%','CST<br />9%','NHIL<br />2.5%','GETFund<br />2.5%', '    MTD<br />Revenue'],
        			'PRE-PAID':['Weekly Revenue','Trend', 'MTD Revenue'],
        			'MOBILE MONEY':['Weekly Revenue','Trend','MTD Revenue','Fees','Transactions'],
        			'INTERNATIONAL INCOMING':['Weekly Levy<br />(Mins x $0.06)','Trend<br /> ','MTD Revenue<br />(Mins x $0.06)','Weekly Minutes<br /> ','MTD Minutes<br /> '],
        			'ANTIFRAUD':['Weekly Calls<br />Sent','Calls<br />Received','Fraud<br />Calls', '% Fraud<br />Numbers','MTD'],
        		}
        	}
        	else if(type=="monthly"){
        		dataHeader={
        			'TOP UP':['Monthly<br />Revenue','Trend<br /> ','VAT<br />12.5%','CST<br />9%','NHIL<br />2.5%','GETFund<br />2.5%', '    YTD<br />Revenue'],
        			'PRE-PAID':['Monthly Revenue','Trend', 'YTD Revenue'],
        			'MOBILE MONEY':['Monthly Revenue','Trend','MTD Revenue','Fees','Transactions'],
        			'INTERNATIONAL INCOMING':['Monthly Levy<br />(Mins x $0.06)','Trend<br /> ','MTD Revenue<br />(Mins x $0.06)','Monthly Minutes<br /> ','MTD Minutes<br /> '],
        			'ANTIFRAUD':['Monthly Calls<br />Sent','Calls<br />Received','Fraud<br />Calls', '% Fraud<br />Numbers','YTD'],
        		}
        	}
        	else if(type=="custom"){
        		dataHeader={
        			'TOP UP':['Custom<br />Revenue','Trend<br /> ','VAT<br />12.5%','CST<br />9%','NHIL<br />2.5%','GETFund<br />2.5%',],
        			'PRE-PAID':['Custom Revenue','Trend',],
        			'MOBILE MONEY':['Custom Revenue','Trend','MTD Revenue','Fees','Transactions'],
        			'INTERNATIONAL INCOMING':['Custom Levy<br />(Mins x $0.06)','Trend<br /> ','MTD Revenue<br />(Mins x $0.06)','Custom Minutes<br /> ','MTD Minutes<br /> '],
        			'ANTIFRAUD':['Custom Calls<br />Sent','Calls<br />Received','Fraud<br />Calls', '% Fraud<br />Numbers'],
        		}
        	}

        	else if(type=="editDaily"){
        		dataHeader={
        			'TOP UP':['Daily Revenue'],
        			'PRE-PAID':['Daily Revenue'],
        			'MOBILE MONEY':['Daily Revenue','Fees','Transactions'],
        			'INTERNATIONAL INCOMING':['Minutes']
        		}
        	}
        	return dataHeader;
        },
       /*  noValueFix(type, operators){
          for(let i=0; i<this.Operators.length; i++){
            obj={}                           
            obj.CST = '0'
            obj.GETFund = '0'
            obj.MTDRevenue = '0'
            obj.NHIL = '0'
            obj.Trend = '0'
            obj.VAT= '0'
            obj.WeeklyRevenue = '0'
            obj.operator=this.Operators[i]


            if(this.chartType=='weekly'){
                let regex=/for\s([a-z]+)\s(\d{1,2})\sto\s?[a-z]*\s\d{1,2},\s(\d{4})/ig
                let result = regex.exec(data.period);
                let date=result[3]+"-"+((new Date(result[1]+" "+result[2])).getMonth()+1)+"-"+(result[2].length<2?'0'+result[2]:result[2])
                let temp={}
                temp[new Date(date).getDay()]={'date':date,'value':'0'}
                obj.weeklyTrend=temp
            }
            else if(this.chartType=='monthly'){
                let regex=/([a-z]+)\s(\d{4})/ig
                let result = regex.exec(data.period);
                let date=result[2]+"-"+((new Date(result[1]+" 01")).getMonth()+1)+"-01"
                let temp={}
                temp['1']={'date':date,'value':'0'}
                obj.weeklyTrend=temp
            }

        } */

        widgetsList(){
        	return  [{ text: this.$t('Report.SelectWid'), value: null, disabled: true },
        	{ text:'TOP-UP' , value: 'topup'},
        	{ text: 'PREPAID', value: 'prepaid'},
        	{ text: 'MOBILE MONEY', value: 'mobileMoney'},
        	{ text: 'INTERNATIONAL INCOMING', value: 'interIncom'}, 
        	{ text: 'ANTIFRAUD', value: 'antifraud'}, 
        	{ text: this.$t('Text.plain_text'), value: 'Plain text'},

        	]
        },
        getOperators(widget){
        	if(widget=="getTopup" || widget=="getPrepaid" || widget == 'getAntifraud')
        		return ['Airtel-Tigo','Glo', 'MTN','Vodafone']
        	else if(widget=="getMobile")
        		return ['Airtel-Tigo', 'MTN','Vodafone']
        	else if(widget=="getInter")
        		return ['Afriwave','Airtel-Tigo','Glo', 'MTN','Vodafone']
        },
        getDateTest(type,date,test=false){
        	let dateVal=null
        	if(date==null)         
        		return null

        	let realDate;
        	if(type=='daily'){
        		realDate = moment.utc(date,'YYYYY-MM-DD')
                // realDate = new Date(realDate.setDate(realDate.getDate()-1));
                if(test)
                	dateVal = [realDate]
                else{
                	moment.locale(this.$i18n.locale)
                	dateVal = this.$t('for') + " " + realDate.format('ll');
                    // dateVal=this.$t('for') + " " + realDate.format(this.$i18n.locale, { day:'numeric', month: 'long',year:'numeric'})
                }

            }
            else if(type=="weekly"){  
            	realDate = moment.utc(date,'YYYYY-MM-DD')   
            	let start = realDate.clone().subtract(7,'d')  
            	let end = realDate.clone().subtract(1,'d')

            	let option  = [
            	{ day:'D', month: 'MMMM',year:'YYYY' },
            	{ day:'D', month: 'MMMM',year:'YYYY' },
            	]

            	if(start.year( )== end.year()){
            		option[0].year = '';
            		if(start.month() == end.month()){
            			if(this.$i18n.locale=="fr")
            				option[0].month = ''
            			else
            				option[1].month = ''
            		}
            	} 

            	if(test)
            		dateVal = [start,end]
            	else{
            		moment.locale(this.$i18n.locale)
            		dateVal = this.$t('for') + " " + start.format(option[0].day + " " + option[0].month + " " + option[0].year) + 
            		" to "+ end.format(option[1].day + " " + option[1].month + " " + option[1].year);
                    // dateVal=this.$t('for')+" "+ start.toLocaleString(this.$i18n.locale, option[0])+" to "+ end.toLocaleString(this.$i18n.locale,option[1] )
                    /* var n = dateVal.lastIndexOf(' ');
                    dateVal = dateVal.slice(0, n) + dateVal.slice(n).replace(" ", ", "); */
                }
            }
            else if(type=="monthly"){
            	realDate = moment.utc(date,'YYYYY-MM-DD');
            	let  oneDayBefore = realDate.clone().subtract(1,'d'); 
            	let  firstDay = oneDayBefore.clone().startOf('month');
                // let month = new Date(realDate.setDate(realDate.getDate()-1))
                // let firstDay=new Date(month.getFullYear(), month.getMonth(), 1)


                if(test){
                	dateVal = [firstDay, oneDayBefore]
                }
                else{
                	moment.locale(this.$i18n.locale);
                	dateVal = this.$t('for') + " " + oneDayBefore.format('MMMM');
                }

            }
            else{
            	let regex = /from\s(\d+)\sto\s(\d+)/ig
            	let result= regex.exec(date);

            	let start = moment.utc(parseInt(result[1]), 'X');
            	let end   = moment.utc(parseInt(result[2]), 'X');


            	let option=[
            	{ day:'numeric', month: 'long',year:'numeric' },
            	{ day:'numeric', month: 'long',year:'numeric' }
            	]

            	if(start.year()== end.year()){
            		delete option[0]['year'];
            		if(start.month() == end.month()){
            			if(this.$i18n.locale=="fr")
            				delete option[0]['month'];
            			else
            				delete option[1]['month'];
            		}
            	}
            	moment.locale(this.$i18n.locale)
            	dateVal=this.$t('for') + " " + start.format('ll')+" to "+ end.clone().subtract(1,'d').format('ll');
                // dateVal=this.$t('for') + " " + start.toLocaleString(this.$i18n.locale, option[0])+" to "+ end.toLocaleString(this.$i18n.locale,option[1] )

                if(test){
                	dateVal=[start,end]
                }

            }
            return dateVal;
        },

        getDatesObj(period){
        	let regex=/((?:for)|(?:pour)\s)?([a-z]+\s?\d{0,2}),?\s?(to\s)?([a-z]*\s?\d{0,2})?,?\s(\d{4})/ig
        	let result = regex.exec(period);
        	let dates=[]

        	if(result[1]){
        		dates[0]=new Date(result[5]+'/'+result[2].replace(/\s/g,'/'))
        		if(result[4].match(/[a-z]+\s\d{1,2}/))
        			dates[1]=new Date(result[5]+'/'+result[4].replace(/\s/g,'/'))

        		else{
        			dates[1]=new Date(result[5]+'/'+result[2].replace(/\s/g,'/'))
        			dates[1].setDate(Number(result[4].replace(/\s/g,'')))
        		}
        	}
        	else if(result[2].match(/from/ig)){
        		regex=/from\s(\d+)\sto\s(\d+)/ig
        		result = regex.exec(period);
        		dates[0]=new Date(Number(result[1])*1000)
        		dates[1]=new Date(Number(result[2])*1000)
        	}
        	else{
        		dates[0]=new Date(result[5]+'/'+result[2]+"/01")
        		dates[1]=new Date(dates[0].getFullYear(), dates[0].getMonth()+1, 0)
        	}
        	dates[0].setHours(0, 0, 0, 0);
        	dates[1].setHours(0, 0, 0, 0);
        	return dates
        },
        getPeriodDates(start,end){
        	let date1= new Date(start*1000)
        	let date2= new Date(end*1000)
        	let period=''
        	if(start*1000!=end){
        		if(date1.getFullYear()==date2.getFullYear()){
        			if(date1.getMonth()==date2.getMonth())
        				period = date1.toLocaleDateString('en-us', {month: "long", day: "numeric"})+' to '+date2.getDate()+', '+date2.getFullYear()
        			else
        				period = date1.toLocaleDateString('en-us', {month: "long", day: "numeric"})+' to '+date2.toLocaleDateString('en-us', {month: "long", day: "numeric", year:'numeric'})
        		}
        		else
        			period = date1.toLocaleDateString('en-us', {month: "long", day: "numeric", year:'numeric'})+' to '+date2.toLocaleDateString('en-us', {month: "long", day: "numeric", year:'numeric'})
        	}
        	else
        		period = date1.toLocaleDateString('en-us', {month: "long", day: "numeric", year:'numeric'})
        	return period;        
        },
        compareValues(key, order = 'asc') {
        	return function innerSort(a, b) {
        		if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key))
        			return 0;
        		const comparison = a[key].localeCompare(b[key]);

        		return (
        			(order === 'desc') ? (comparison * -1) : comparison
        			);
        	};
        },
        checkPrivilege(userDetail,priv){
        	if(userDetail){
        		let role_id = userDetail.data[0].Users.role;
        		if(this.$store.getters.rolePrivilege)
        			return this.$store.getters.rolePrivilege.data.filter(x=> x.role_priv.role == role_id && x.privileges.name === priv).length > 0;
        		return false;
        	}
        },
        convertDateToUTC(datetime,separator='T'){
        	if(typeof datetime === 'string'){
        		var datetimeArray = datetime.split(separator);
        		var date = datetimeArray[0];
        		var time = datetimeArray[1];

        		var dateArray = date.split('-');
        		var year = dateArray[0],
        		month = parseInt(dateArray[1]) - 1,
        		day = dateArray[2];

        		if(time){
        			var timeArray = time.split(':');

        			var hour = timeArray[0],
        			minute = timeArray[1],
        			second = timeArray[2];
        			return Date.UTC(year,month,day,hour,minute,second);
        		}
        	}else if(typeof datetime === 'number'){
        		datetime = new Date(datetime);
        		return Date.UTC(datetime.getFullYear(),datetime.getMonth(),datetime.getDate(),
        			datetime.getHours(),datetime.getMinutes(),datetime.getSeconds());
        	}
        	return Date.UTC(year,month,day);            
        },

        formatDate(datetime,format='ll'){
        	if(datetime == undefined || datetime == null)
        		return moment().format(format);
        	else if (typeof datetime === 'string'){

        		datetime = datetime.substring(0,10);
        	}
        	return moment(datetime,'YYYY-MM-DD').format(format);
        }
    }
}

