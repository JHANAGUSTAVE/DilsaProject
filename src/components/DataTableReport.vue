<template>
    <b-container>
        <b-row v-show="enabled" class="justify-content-center">                
            <b-button class='mx-1'  size="sm"  @click="cancelEdit()">Cancel</b-button>        
            <b-button class='mx-1' :disabled="isEdited()" size="sm" style="background: rgb(60, 74, 131) none repeat scroll 0% 0%; color: white;" @click="emitData()">Save</b-button>         
        </b-row>
        <b-row>
            <div class="table-responsive">
                <table class="table table-borderless">
                    <thead>
                        <tr>
                            <th scope="col" ></th>
                            <th scope="col"  v-if="header['0'].includes('Daily')  || fakeChartType === 'daily'"></th>
                            <th scope="col" class="text-center" v-for="head in header" :key="head">
                                <pre v-html="head" v-if="head !== 'DailyLevy' && head !== 'DailyRevenue'" ></pre>
                            </th>                               
                        </tr>
                    </thead>
                    <tbody>
                        <tr :class="editData=='desactivate'?'editor':''" v-for="(el,key) in data" :key="key" @click="/*selectRow(key)*/" >
                            <th  key="test1" scope="row" id="operatorCol">{{el.operator}}</th>
                            <th key="test2" scope="row" id="progressTD"  v-if="header['0'].includes('Daily') || fakeChartType === 'daily'">
                                <div class="progress" style="height:2rem;border-radius:0;background:#fff" v-if="el['DailyLevy']!=null">
                                    <div class="progress-bar" role="progressbar" aria-valuenow="20"
                                        aria-valuemin="0" :aria-valuemax="maxValue" :style="{width:(Number(valueEdit[key].Minutes)*100/progress)+'%','background-color':chartColor}" >
                                    </div>
                                </div>
                                <div class="progress" style="height:2rem;border-radius:0;background:#fff" v-else-if="fakeChartType === 'daily' && (el['CustomRevenue']!=null || el['CustomLevy']!=null)">
                                    <div class="progress-bar" role="progressbar" aria-valuenow="20"
                                        aria-valuemin="0" :aria-valuemax="maxValue" :style="valueEdit[key].CustomRevenue ? {width:(Number(valueEdit[key].CustomRevenue)*100/progress)+'%','background-color':chartColor} : {width:(Number(valueEdit[key].CustomMinutes)*100/progress)+'%','background-color':chartColor}" >
                                    </div>
                                </div>
                                <div class="progress" style="height:2rem;border-radius:0;background:#fff" v-else>
                                    <div class="progress-bar" role="progressbar" aria-valuenow="20"
                                        aria-valuemin="0" :aria-valuemax="maxValue" :style="{width:(Number(valueEdit[key].DailyRevenue ? valueEdit[key].DailyRevenue : valueEdit[key].FraudCalls)*100/progress)+'%','background-color':chartColor}" >
                                    </div>
                                </div>
                            </th>
                            <td valign="bottom" v-for="(head,key2) in header" :key="key2" :prop="key3=head.replace(/<br\s?\/>|\s|\d|\.|%|\(.*\)/g,'')" :id="checkEditable(head) && editData=='desactivate' ?'custom':'regular'">
                                <div v-if = "key3 == 'Trend'" >
                                    <p class="text-danger" v-if="Math.round(el[key3]) < 0">
                                        <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.2 1.6C0.705573 0.940764 1.17595 0 2 0H7C7.82405 0 8.29443 0.940764 7.8 1.6L5.3 4.93333C4.9 5.46667 4.1 5.46667 3.7 4.93333L1.2 1.6Z"
                                            fill="#FF4742"
                                            ></path>
                                        </svg>
                                        {{Number(el[key3]).toLocaleString()}} %
                                    </p>
                                    <p class="text-success" v-else>
                                        <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.2 4.4C0.705573 5.05924 1.17595 6 2 6H7C7.82405 6 8.29443 5.05924 7.8 4.4L5.3 1.06667C4.9 0.533334 4.1 0.533333 3.7 1.06667L1.2 4.4Z" fill="#385723"
                                            ></path>
                                        </svg>
                                        {{convertBigNumberIntoString(el[key3])}} %
                                    </p>
                                </div>
                                <div key="test4" v-else-if = "checkEditable(head)" @dblclick="enabled=enableEdit">
                                    <span v-show="!enabled" v-if=''><span v-if="DataTitle && DataTitle.toLowerCase() == 'antifraud'">{{el[key3]}}</span><span v-else>{{convertBigNumberIntoString(el[key3])}}</span></span>
                                    <form v-show="enabled" ref="form" @submit.stop.prevent="emitData()">
                                        <b-form-group id="filtere"  size="sm" label-for="Filter">
                                        <b-form-input type="number" @focus="fousedBox=[key,head.replace(/<br\s?\/>|\s|\d|\.|%|\(.*\)/g,'')]" number step="0.01"  v-model="valueEdit[key][head.replace(/<br\s?\/>|\s|\d|\.|%|\(.*\)/g,'')]" trim> </b-form-input> 
                                        </b-form-group>
                                    </form>                         
                                </div>                 
                                <div key="test5" v-else><span v-if="DataTitle && DataTitle.toLowerCase() == 'antifraud'">{{el[key3]}}</span><span v-else>{{convertBigNumberIntoString(el[key3])}}</span></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div> 
            <!-- <b-modal 
                :id="DataTitle"
                ref="modal"
                :title="DataTitle" @submit.stop.prevent="" @ok="$emit('updateData', data[selectedUser])" v-if="selectedUser!=-1">
                <div class="d-flex justify-content-center">
                  <h3>{{data[selectedUser].operator}}</h3>
                </div>
                <form ref="form"> 
                    <b-row>
                        <b-col v-for="el in header" :key="el"  md="6">
                            <b-form-group :label="el.replace(/<br\s?\/>|\d|\.|%|\(.*\)/g,'')">
                                <b-form-input :id="el.replace(/<br\s?\/>|\s|\d|\.|%|\(.*\)/g,'')" v-model="data[selectedUser][el.replace(/<br\s?\/>|\s|\d|\.|%|\(.*\)/g,'')]" trim></b-form-input>
                            </b-form-group>
                        </b-col> 
                    </b-row>
                </form>
              
            </b-modal>  -->       
        </b-row>
    
    </b-container>
</template>

<script lang="js">
import methods from "@/mixins/methods"

export default {
    mixins: [methods],
    props: {
        data:{
            type: Array,
            required: true
        },
        header:{
            type: Array,
            required: true
        },
        DataTitle:{
            type: String,
        },
         chartColor:{
            type: String
        },
        editData:{
            type:String
        },
        fakeChartType:{
            type:String
        },
        widget:{
            type:String,
        },
    },
    data(){
        return {
            selectedUser: -1,
            clickCount:0,
            maxValue:0,
            enabled:false,
            valueEdit:JSON.parse(JSON.stringify(this.data)),
            fousedBox:[],
            updated:{},
        }
    },
    mounted(){
    },
    watch:{
        data(value){
            this.valueEdit= JSON.parse(JSON.stringify(value))
            this.enabled=false
            this.$emit('editval',"desactivate")
        }
        
    },
    methods:{
        checkEditable(val){
            let replaceaVal=val.replace(/<br\s?\/>|\s|\d|\.|%/gi,'')
            if(this.editData!="never"){
                //07405:14:50
                if(replaceaVal == 'DailyRevenue' || replaceaVal == 'DailyLevy' || replaceaVal=='Fees' || replaceaVal=='Transactions' || replaceaVal=='Minutes' || replaceaVal== 'FraudCalls')
                    return true;
                else
                    return false
            }
            else
                return false
        },
        
        emitData(user){
            //this.enabled=false;
            this.$emit('editval',[this.valueEdit,this.updated])
            this.updated = {}
        },
        cancelEdit() {
           this.enabled=false;
           this.updated = {}
           this.$emit('editval',"desactivate")
           this.valueEdit= JSON.parse(JSON.stringify(this.data))
        }, 
        isEdited(){
            if(this.fousedBox.length>0){
                let row=this.fousedBox[0]
                let col=this.fousedBox[1]
                if(row in this.updated){
                    if(this.valueEdit[row][col]!=this.data[row][col] && !this.updated[row].includes(col)){
                        this.updated[row].push(col)                
                    }                    
                    else if(this.valueEdit[row][col]==this.data[row][col] && this.updated[row].includes(col)){                    
                        this.updated[row].splice(this.updated[row].indexOf(col),1)
                        if(this.updated[row].length==0){
                            delete this.updated[row]
                        }
                    }
                }
                else if(this.valueEdit[row][col]!=this.data[row][col]){
                    this.updated[row]=[]
                    this.updated[row].push(col)
                }
            }
            
            return _.size(this.updated)==0
        },
               
    },
    computed:{
       
        progress(){
            
            this.maxValue=0;
            
            this.valueEdit.map(x =>{
                if(x.DailyRevenue){
                    if(Number(x.DailyRevenue)>this.maxValue){
                        this.maxValue=Number(x.DailyRevenue)
                    }
                }
                else if(x.FraudCalls){
                    if(Number(x.FraudCalls)>this.maxValue){
                        this.maxValue=Number(x.FraudCalls)
                    }
                }
                else if(this.fakeChartType === 'daily' && (x.CustomRevenue !== null || x.CustomLevy !== null)){
                    if(Number(x.CustomRevenue)>this.maxValue || Number(x.CustomMinutes)>this.maxValue){
                        this.maxValue= x.CustomRevenue ? Number(x.CustomRevenue) : Number(x.CustomMinutes)
                    }
                }
                else{
                    if(Number(x.Minutes)>this.maxValue){
                        this.maxValue=Number(x.Minutes)
                    }
                }
            });
            if(this.maxValue==0)
                return 100
                
            return this.maxValue;
        },
         enableEdit(){
             let edit=false;
            if(this.editData=="desactivate"){
                edit=true
                this.$emit('editval',"activate") 
            }            
            return edit
        }
    }
}
</script>

<style lang="scss" scoped>
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0; 
}
input[type=number]{
    height:30px;
}
.table th,td{
    border-bottom: 0;
    border-top: 0;
    text-align: center;
    
}

tbody tr{
    border-bottom: solid 1px #E6E6E6;
    margin:0px;
}

td{
    font-size: .8rem;
    padding: .3rem; 
}

th{
    font-size: 1.2rem;
     padding: .3rem;
     
}

#operatorCol{
    width:20%;
}

#progressTD{
    width:250px;
}

#custom{
    width:10%
}

tbody .editor:hover{
     cursor: pointer;
}
tbody:hover .editor #custom {    
     background-color:#dee2e6
}
.highlight{
     background-color:#b8daff;
     border:1px solid #71a4f8;
}

</style>