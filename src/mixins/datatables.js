import _ from 'lodash';

function formatParam (service, param){
    let data = null
    switch(service){
        case "callUsers":
            data = [{ 
                "Users":{
                    "username": param.username,
                    "first_name": param.first_name,
                    "last_name":param.last_name,
                    "email": param.email,
                    "role": param.role,
                    "language": param.language, 
                    "password": param.password,
                    "image_url": param.image_url,
                    "theme": param.theme,
                    "model": param.model
                }
            }] 
            break
        case "callRolePrivilege":
            data=[]
            if(Array.isArray(param)){
                param.forEach(element => {
                    data.push({
                        "role_priv":{
                            "role":element.role, //integer
                            "priv":element.priv // integer
                         }
                    })
                });
            }
            else{
                data.push({
                    "role_priv":{
                        "role":param.role, //integer
                        "priv":param.priv // integer
                     }
                })
            }
            break  
        case "callRole":
            data = [{  
                    "roles":{
                    "role":param.role,
                    "description":param.description
                    }  
            }] 
            break 
        case "callWidgetDisplay":
            data = [{  
                "user_widgets":{
                    "widget":param.widget,
                    "status":param.status
                 }
            }] 
            break
 
                
        // default -> param are already formated ...    
        default:
            data = param
            break
    }
    return data
}
export default {
    methods: {
       
        // Build datatables filter 
        buildFilter() {
            let that=this
            this.filter.draw = this.draw;
            this.filter.columns = [];
            _.each(this.cols, function (value) {
                var search = "";
                if(value.search !== null)
                    search = eval(value.search)

                that.filter.columns.push({
                    'data': value.name,
                    'name': '',
                    'searchable': "true",
                    'orderable' : 'true',
                    'search': { 'value': search === undefined ? "" : search, 'regex': 'false' }
                });
            })
            this.filter.start = (this.page_number-1)*this.perPage;
            this.filter.length = this.perPage;
            this.filter.search.value = this.searchTerm === undefined ? "" : this.searchTerm;
            this.filter.order = this.order;
        },
        datatablesCreate(service, param){
            let data = formatParam(service, param);
            let payload = {
                token: this.$store.getters.user.token,
                action: "create",
                data: data
            }
            this.$store.dispatch(service, payload);
        },
        datatablesDelete(service, row_id){
            let data = {[row_id]:{"DT_RowId":row_id}}

            let payload = {
                token: this.$store.getters.user.token,
                action: "remove",
                data: data
            }
            this.$store.dispatch(service, payload)
        },
        
        datatablesEdit(service, param, row_id){
            let data = formatParam(service, param)[0]

            let data2 = {[row_id]:{...data, "DT_RowId":row_id}}

            let payload = {
                token: this.$store.getters.user.token,
                action: "edit",

                data: data2
            }
            this.$store.dispatch(service, payload)
        },
        datatablesCreateOrEdit(service, param, row_id=null){
            /// Create new or update
            let data = row_id !== null ? {[row_id]:{...formatParam(service, param)[0], "DT_RowId":row_id}}:formatParam(service, param);

            let payload = {
                token: this.$store.getters.user.token,
                action: row_id !== null ? "edit":"create",
                data: data
            }
            this.$store.dispatch(service, payload)
        },
    },
    data() {
        return {
            filter: {
                draw: 1,
                columns: [],
                'order': [{ 'column': 0, 'dir': 'asc' }],
                'search': { 'value': this.searchTerm, 'regex': 'false' },
                'start': 0,
                'length': 10,
            },
        }
    }
}