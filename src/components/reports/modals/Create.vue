<template>
	<b-container>
		<b-modal v-if='typeof userDetail !== undefined && userDetail' :id="modalId" ref='close' hide-footer size="lg" :modal-class="userDetail.data[0].Users.theme"  @hidden="onHidden">
			<template v-slot:modal-title><h4 v-if='report'> Edit Report</h4><h4 v-else> {{ $t('Report.create') }}</h4></template>
			<b-form id='modal-form'>
				<b-row class='mb-2'>
					<b-col md="6">
						<h5 class="p-2 m-title">Report details</h5>
						<b-form-group id="report_name" :label="$t('Report.reportName') + ' *'" label-for="report_name">
							<b-form-input size="sm" id="name_input" :placeholder="$t('Report.reportName')" type="text" v-model="data.name" required></b-form-input>
							<div class="text-danger">{{ errors.name }}</div>
						</b-form-group>

						<label for="description">{{$t('Report.reportDescription')}}</label>
						<b-form-group id="description">
							<b-form-input size="sm" id="description" placeholder='Description' type="text" v-model="data.description" required  />
						</b-form-group>

						<label for="selectedTypes">Report Type</label>
						<div class="form-inline">
							<b-form-group v-if="typeof this.preSelectedType === undefined || !this.preSelectedType" class='mr-2'>
								<b-form-select size="sm" id="selectedTypes" :options="reportTypes" required v-model="selectedType" :disabled="!sendMail" />
							</b-form-group>
							<b-form-group class='mr-2'>
								<b-form-select size="sm" id="selectedModels" :options="reportModels" required v-model="selectedModel" />
							</b-form-group>

							<section :class="'reportModel-'+(selectedModel !== '0' ? selectedModel : userDetail.data[0].Users.model)">
								<div class="d-flex align-items-center justify-content-center">
									<div class="mx-1 previewBox box1" style="height: calc(1.5em + 0.5rem + 2px);width:calc(1.5em + 0.5rem + 2px);"></div>
									<div class="mx-1 previewBox box2" style="height: calc(1.5em + 0.5rem + 2px);width:calc(1.5em + 0.5rem + 2px);"></div>
									<div class="mx-1 previewBox box3" style="height: calc(1.5em + 0.5rem + 2px);width:calc(1.5em + 0.5rem + 2px);"></div>
									<div class="mx-1 previewBox box4" style="height: calc(1.5em + 0.5rem + 2px);width:calc(1.5em + 0.5rem + 2px);"></div>
								</div>
								<div class="mt-1 d-flex mx-1 previewBox box5" style="height: calc(1.5em + 0.5rem + 2px);width:calc(4*(1.5em + 0.5rem + 8px))"></div>
							</section>
						</div>
						<!-- Model Preview -->
						


					</b-col>

					<b-col md="6">
						<h5 class="p-2 m-title">{{$t('Report.frequency')}}</h5>
						<b-form-group>
							<label>{{$t('Report.frequency').split(' ')[0]}}</label>

							<div class="form-inline">
								<div class="form-group">
									<b-form-select size="sm" id="directionsSelected"  :options="frequency" required v-model="frequence" :disabled="!sendMail" />
								</div>
								<div class="form-group mx-sm-3" v-if="this.frequence=='weekly'">
									<b-form-select id="directionsSelected" :options="days" required v-model="day" :disabled="!sendMail" />
								</div>
								<div class="form-group mx-sm-3" v-if="this.frequence=='monthly'">
									<h6 class="" v-if="this.frequence=='monthly'">Day of month</h6>
									<b-form-select size="sm" id="directionsSelected" :options="daysOfMonth" required v-model="dayOfMonth" :disabled="!sendMail" />
								</div>
								<div class="form-group mx-sm-3" v-if="this.frequence=='once'">
									<VueCtkDateTimePicker :dark="(userDetail.data[0].Users.theme === 'dark')" v-model="date_once" only-date color="#17a2b8" formatted="L" :range='false' :locale="$i18n.locale" :format="`YYYY-MM-DDTHH:mm:ss`"> 
									<input type="text" size="sm" :placeholder="$t('Transaction.SelectDates')"/>
									</VueCtkDateTimePicker>
								</div>
								<div class="form-group mx-sm-3" v-if="this.frequence!='now'">
									<b-form-select size="sm" id="directionsSelected" :options="hours" required v-model="hour" :disabled="!sendMail" />
									<h4 class="ml-2">hr</h4>
								</div>
							</div>
						</b-form-group>

						<b-form-group>
							<label>Destination Type</label>
							<div class="form-inline">
								<div class="form-check form-check-inline">
									<b-form-checkbox id="emailDest" class="form-check-input" v-model="emailDest" name="emailDest" value= "1" unchecked-value="0"></b-form-checkbox>
									<label class="form-check-label" for="emailDest"><i class="fas fa-envelope fa-fw" aria-hidden="true"></i> Email</label>
								</div>
								<div class="form-check form-check-inline">
									<b-form-checkbox id="whatsappDest" class="form-check-input" v-model="whatsappDest" name="whatsappDest" value= "1" unchecked-value="0"></b-form-checkbox>
									<label class="form-check-label" for="whatsappDest"><i class="fab fa-whatsapp fa-fw"></i> Whatsapp</label>
								</div>
							</div>
						</b-form-group>
						<b-form-group v-if="emailDest=='1'" id="email" :label="$t('Report.addPeople') + ' *'" label-for="email" :description="$t('Report.description')">
							<b-form-input id="email_input" type="text" v-model="email" required placeholder="Email" :disabled="!sendMail"/>
							<div class="text-danger">{{ errors.email }}</div>
						</b-form-group>
						<b-form-group v-if="whatsappDest=='1'"  id="whatsapp" :label="'Group Name *'" label-for="whatsapp" :description="'Name of the whatsapp group'">
							<b-form-select size="sm" id="whatsappSelected"  :options="groupWhatsapp"  v-model="whatsappGroupSelected" />
							<div class="text-danger">{{ errors.whatsappGroupSelected }}</div>
						</b-form-group>
					</b-col>
				</b-row>

				<b-row v-if="selectedType=='custom'" class='py-3'>
					<b-col md="6" v-if="!preWidgets">
						<div class="">
							<h5 class="p-2 m-title">{{$t('Report.createComponent')}}</h5>
							<div class="row">
								<div class="col-6">
									<label for="widgets">Widgets</label>
									<b-form-group id="widgets">
										<b-form-select size='sm' id="widgetSelected" :options="widgets" required v-model="widget" />
									</b-form-group>
								</div>
								<div class="col-6" v-if="this.widget && this.widget != 'Plain text'">
									<label for="Type">Type</label>
									<b-form-group id="type">
										<b-form-select size='sm' id="typeSelected" :options="filters.types" required v-model="type" />
									</b-form-group>
								</div>
							</div>               
							<div class="mb-3" v-if="this.type=='custom'">
								<span class="space">Dates:</span>
								<!-- :minDate="min_Date" :maxDate="max_date"  insert in the line below-->
								<VueCtkDateTimePicker :dark="(userDetail.data[0].Users.theme === 'dark')" v-model="date_range" only-date color="#17a2b8" :range="true"  formatted="L" :auto-close="true" 
								:locale="$i18n.locale" :custom-shortcuts = "dateShortCut()" :format="`YYYY-MM-DDTHH:mm:ss`"> 
									<input type="text" :placeholder="$t('Transaction.SelectDates')"/>
								</VueCtkDateTimePicker>
							</div> 
							<div v-if="this.widget=='Plain text'">
								<b-form-group id="subject" :label="$t('Report.subject')" label-for="subject">
									<b-form-input size='sm' id="subject" type="text" :placeholder="$t('Report.subject')" v-model="data.subject" required  />
									<div class="text-danger">{{ errors.subject }}</div>
								</b-form-group>
								
								<!-- <textarea class="form-control" name="comment" id="" cols="52" rows="5" v-model=""></textarea> -->
								<ckeditor v-model="data.comment" :config='editorConfig'></ckeditor>
								<div class="text-danger">{{ errors.comment }}</div>
							</div>

							<div class="d-flex justify-content-start mt-3 text-right">
								<a class="btn btn-info" @click="getComponent()"><i class="fa fa-plus"></i> Add component</a>
							</div>
						</div>
					</b-col>

					<b-col md="6">
						<h5 class="p-2 m-title">{{$t('Report.chosenComponents')}}</h5>
						<b-row style="overflow-y:auto; height: 300px;">
							<b-col class="col-12">
								<draggable :list="data.chooseComponent"  class="list-group" ghost-class="ghost"
								@start="dragging = true" @end="dragging = false">
									<b-card :border-variant="userDetail.data[0].Users.theme === 'dark' ? 'light':'info'" class="mb-2 widget__box-shadow hasdark " v-for="i in data.chooseComponent"
									:key="i.message">                    
										<div>
											<b-form-checkbox-group v-model="data.chooseComponent" id="Checks">
												<b-form-checkbox :value="i">{{ i.message }}</b-form-checkbox>
											</b-form-checkbox-group>
										</div>
									</b-card>
								</draggable>
								<!-- <span class="no-components text-muted">No componenets selected</span> -->
							</b-col>
						</b-row>
					</b-col>
				</b-row>

				<div :class="'border-top pt-2 ' + (userDetail.data[0].Users.theme === 'dark' ? 'border-secondary':'')">
					<b-row>
						<b-col>
							<div class="form-inline">
								<div class="form-check form-check-inline">
									<b-form-checkbox id="status" class="form-check-input" v-model="data.actif" name="status" value= "1" unchecked-value="0"></b-form-checkbox>
									<label class="form-check-label" for="status">Actif</label>
								</div>
								<div class="form-check form-check-inline">
									<b-form-checkbox id="validate" class="form-check-input" v-model="data.validate" name="validate" value= "1" unchecked-value="0"></b-form-checkbox>
									<label class="form-check-label" for="validate">Validate</label>
								</div>
							</div>
						</b-col>
						<b-col>
							<div class="text-white d-flex justify-content-end">
								<b-button class="btn btn-danger mr-3" @click="hideModal()">{{$t('Report.cancel')}}</b-button>
								<b-button class="btn btn-success" @click="saveReport()">{{$t('Report.saveReport')}}</b-button>
							</div>
						</b-col>
					</b-row>
				</div>
			</b-form>
		</b-modal>
	</b-container>
</template>

<script>
	import draggable from "vuedraggable";
	import datatables from "@/mixins/datatables";
	import methods from "@/mixins/methods";
	import checkPrivilege from "@/mixins/methods" ; 
	import moment from 'moment-timezone';
	import CKEditor from 'ckeditor4-vue';

	export default {
		components: { draggable, ckeditor: CKEditor.component },
		props: {
			modalId: {
				default:'modal',
			},
			report: {
				required:false,
			},
			preWidgets:{
				required:false,
			},
			preSelectedType:{ // Pre selected type from Analytic
				required:false,
			}
		},
		mixins: [datatables, methods, checkPrivilege],

		data() {
			return {
				emailDest: "0",
				sendMail:true,
				whatsappDest: "0",
				whatsappGroupSelected: null,
				groupWhatsapp: null,
				selectedType: typeof this.preSelectedType != undefined && this.preSelectedType ? this.preSelectedType : "daily",
				selectedModel: "0",
				date_once: null,
				date_onced: null,
				widget: null,
				type: "daily",
				filters: [],
				widgets: this.widgetsList(),
				frequency: [
					{ text: this.$t("Frequency.daily"), value: "daily" },
					{ text: this.$t("Frequency.weekly"), value: "weekly" },
					{ text: this.$t("Frequency.monthly"), value: "monthly" },
					{ text: "Once", value: "once" },
					{ text: "Now", value: "now" }
				],

				reportTypes: [
					{ text: this.$t("Frequency.daily"), value: "daily" },
					{ text: this.$t("Frequency.weekly"), value: "weekly" },
					{ text: this.$t("Frequency.monthly"), value: "monthly" },
					{ text: "Custom", value: "custom" }
				],

				reportModels: [
					{ text: "Model-1", value: "1" },
					{ text: "Model-2", value: "2" },
					{ text: "Model-3", value: "3" },
					{ text: "Default", value: "0" }
				],

				reportThemes: [
					{ text: "Light", value: "light" },
					{ text: "Dark", value: "dark" }
				],

				hours: [
					"00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"
				],

				days: [
					{ text: this.$t("Days.Sunday"), value: "Sunday" },
					{ text: this.$t("Days.Monday"), value: "Monday" },
					{ text: this.$t("Days.Tuesday"), value: "Tuesday" },
					{ text: this.$t("Days.Wednesday"), value: "Wednesday" },
					{ text: this.$t("Days.Thursday"), value: "Thursday" },
					{ text: this.$t("Days.Friday"), value: "Friday" },
					{ text: this.$t("Days.Saturday"), value: "Saturday" }
				],

				day: "Monday",
				hour: "01",
				frequence: "daily",
				dayOfMonth: "01",
				daysOfMonth: [],
				name: null,
				email: null,
				whatsapp_type: null,
				data: {
					name: "",
					description: "",
					subject: "",
					comment: "",
					date: {},
					emails: [],
					chooseComponent: [],
					destinationID: [],
					chooseComponentID: [],
					actif: "1",
					validate: "1"
				},

				dragging: false,
				valid: true,
				errors: {},
				reportId: 0,
				createSend: false,
				date_range: null,
				start: null,
				end: null,
				changeType: false,
				editorConfig: {
                    toolbar: [
                    	[ 'Source', '-', 'NewPage', 'Preview', '-', 'Templates' ],
						[ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ],'/',
						[ 'Bold', 'Italic', 'Underline' , 'Strike', '-', 'RemoveFormat', '-', 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ]
                    ]
                },
			};
		},

		mounted() {
			this.groupWhatsapp = this.getWhatsappGroup();
			
		},
		created(){
			if(this.preWidgets){
				for(const [widget, options] of Object.entries(this.preWidgets)){
					this.date_range = options.date_range;
					this.widget = widget;
					this.type = this.preSelectedType;
					this.getComponent();
				}
			}
		},
		methods: {
			refreshReportTemplate() {
				this.$store.dispatch("Report/callReportTemplate", {
					token: this.user.token,
					id: this.id
				});
				this.$store.dispatch("Report/callReportDestination", {
					token: this.user.token,
					id: this.id
				});
			},

			getDayOfMonth() {
				for (let i = 1; i <= 30; i++) {
		        //if(i == 1)
			        // this.daysOfMonth.push({text:this.$t('Frequency.firstDay'), value:'01'})
			        //else
			        if (i < 10) this.daysOfMonth.push("0" + i);
			        //else if(i == 30)
			        // this.daysOfMonth.push({text:this.$t('Frequency.lastDay'), value:'30'})
			        else this.daysOfMonth.push(i);
				}
			},

			getConfigWhatsapp() {
				if(typeof this.user !== undefined && this.user){
					this.$store.dispatch("Report/callConfigWhatsapp", {
						token: this.user.token
					});
				}
			},

			getWhatsappGroup() {
				const group = [];
				if(typeof this.configWhatsapp !== undefined && this.configWhatsapp){
					this.configWhatsapp.data.map(el => {
						group.push(el.config.description);
					});
				}
				return group;
			},

			getListOperator() {
				let listOperator = [];
				for (let operator = 0; operator < this.operators.length; operator++) {
					listOperator.push(this.operators[operator].name);
				}
				return listOperator;
			},

			getComponent() {
				let obj = {};
				let exist = false;
				if (this.widget != null) {
					if(this.date_range != null || this.type !== 'custom'){
						if(this.widget == 'Plain text'){
							if(this.data.subject && this.data.comment){
								obj.widget = this.widget.replace(/\s/g, "");
								(obj.filters = {}),
								(obj.subject = this.data.subject),
								(obj.text = this.data.comment),
								(obj.message = this.$t("Text.plain_text") + " - " + this.data.subject);
							}else{
								if(this.data.subject.length === 0){
									this.errors.subject = "This field is required";
								}
								if(this.data.comment.length === 0){
									this.errors.comment = "This field is required";
								}
								this.$notify({
									group: "foo",
									type: "warning",
									text: "subject and content are mandotory"
								});
								return;
							}
						}else{
							obj.widget = this.widget;
							obj.filters = this.type != "custom" ? {type: this.type }:{type: this.type, start: moment.utc(this.date_range.start).unix(), end: moment.utc(this.date_range.end).add(1,'m').unix()};
							obj.message = this.type != "custom" ? (this.templates[this.widget].name + " - " + this.type.toUpperCase()) : (this.templates[this.widget].name + " - " + moment.utc(this.date_range.start).format("LL") + " - " + moment.utc(this.date_range.end).format("LL"));
						}

						for (let el = 0; el < this.data.chooseComponent.length; el++) {
							if (JSON.stringify(obj) === JSON.stringify(this.data.chooseComponent[el])) {
								exist = true;
								return;
							}
						}
						if (!exist) {
							this.data.chooseComponent.push(obj);
						} else {
							this.$notify({
								group: "foo",
								type: "info",
								text: "Component already selected"
							});
						}
					}else{
						this.$notify({
							group: "foo",
							type: "info",
							text: "Please select a date range"
						});
					}

				} else {
					this.$notify({
						group: "foo",
						type: "info",
						text: "Please select a widget"
					});
				}
			},

			hideModal() {
				this.$refs["close"].hide();
			},

			saveReport() {
				this.valid = true; // everything is valid before form validations
				this.errors = {};
				let reports = null;
				if(this.id) this.data.emails = [];

				const reportName = this.validateName(this.data.name);
				this.errors.name = reportName.error;
				if (this.valid) {
					this.valid = reportName.valid;
				}



				if (this.emailDest == "1") {
					if (!this.sendMail) {
						this.valid = true;
					} else {
						if (this.email != null) {
							let tmp = this.email.split(";");

							for (let el in tmp) {
								if (this.validateEmail(tmp[el])) {
									this.data.emails.push(tmp[el]);
									this.valid = true;
								} else {
									this.errors.email = "Email invalid";
									this.valid = false;
								}
							}
						} else {
							this.errors.email = "This field is required with [Email] checked";
							this.valid = false;
						}
					}
				}

				if (this.whatsappDest == "1") {
					if (typeof this.whatsappGroupSelected == undefined || this.whatsappGroupSelected == null) {
						this.errors['whatsappGroupSelected'] = "This field is required with [Whatsapp] checked";
						this.valid = false;
					}
				}

				switch (this.frequence) {
					case "daily":
						this.data.date.hour = this.hour;
						break;

					case "weekly":
						this.data.date.hour = this.hour;
						this.data.date.day = this.day;
						break;
					case "monthly":
						this.data.date.hour = this.hour;
						this.data.date.day = this.dayOfMonth;
						break;
					case "once":
						this.data.date.hour = this.hour;
						this.data.date.day = this.date_onced;
						break;

					default:
						break;
				}

				if (this.selectedType != "custom") {
					this.data.chooseComponent = new Array(
						{ widget: "topup", filters: { type: this.selectedType } },
						{ widget: "prepaid", filters: { type: this.selectedType } },
						{ widget: "mobileMoney", filters: { type: this.selectedType } },
						{ widget: "interIncom", filters: { type: this.selectedType } },
						{ widget: "antifraud", filters: { type: this.selectedType } },
					);
				}

				if(this.selectedModel === '0')[
					this.selectedModel = this.userDetail.data[0].Users.model
				]
				for (let el of this.data.chooseComponent) {
					el.id = this.data.chooseComponent.indexOf(el) + 1;
				}
				if (this.valid) {
					if (this.data.chooseComponent.length > 0) {
						if(this.checkPrivilege(this.userDetail,'PRIV_ACTION_REPORT')){
							this.createSend = true;
							let day;
							if (this.frequence == "monthly") day = this.daysOfMonth.indexOf(this.data.date.day) + 1;
							if (this.frequence == "weekly") day = this.days.findIndex(el => el.value == this.data.date.day) +
				            			1;
							if (this.frequence == "once") day = this.data.date.day;
							if (this.frequence == "now") day = -1;
							else day = this.days.indexOf(this.data.date.day) + 1;
				            reports = [{
			            		report_info: {
			            			name: this.data.name,
			            			model: this.selectedModel,
			            			report_type: this.selectedType,
			            			frequence: this.frequence,
			            			hour: this.frequence == "now" ? -1 : this.data.date.hour,
			            			day: day,
			            			actif: this.data.actif,
			            			description: this.data.description,
			            			validated: this.data.validate
			            		}
			            	}];

				            if (!this.sendMail) {
				            	reports = [{
				            		report_info: {
				            			name: this.data.name,
				            			model: this.selectedModel,
				            			report_type: this.selectedType,
				            			frequence: "",
				            			hour: -1,
				            			day: -1,
				            			actif: this.data.actif,
				            			description: this.data.description,
				            			validated: this.data.validate
				            		}
				            	}];

								if(this.id)
				            	this.datatablesEdit("Report/callReportInfo", reports, this.id);
				            	else this.datatablesCreate("Report/callReportInfo", reports);
				            } else {
				            	if(this.id)
				            	this.datatablesEdit("Report/callReportInfo", reports, this.id);
				            	else this.datatablesCreate("Report/callReportInfo", reports);
				            }
				            this.$notify({
				            	group: "foo",
				            	type: "info",
				            	text: this.id ? this.$t("Report.report")+this.$t("NotificationMessage.editSuccess") : this.$t("Report.report")+this.$t("NotificationMessage.createSuccess")
				            });
				        }else{
				        	this.$notify({
				        		group: "foo",
				        		type: "danger",
				        		text: "Access denied"
				        	});
				        }
			        	this.hideModal();
			        	this.refreshReport();
			    	} else {
			    		this.$notify({
			    			group: "foo",
			    			type: "info",
			    			text: "Please select a widget"
			    		});
			    	}
				}
			},

			refreshReport() {
				if(typeof this.user !== undefined && this.user){
					this.$store.dispatch("Report/callReportInfo", {
						token: this.user.token
					});
				}
			},
			dateShortCut() {
				let today = moment.utc();
				let day = today.date() - 1
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
				return data 
			},
			handleEditing(value){
				this.createSend = false;
				let reportId = value.data[0].DT_RowId.substring(4);
				let reportWidgets = [];
				let len =
				this.data.chooseComponent.length < this.data.chooseComponentID.length
				? this.data.chooseComponentID.length
				: this.data.chooseComponent.length;
				for (let widgets = 0; widgets < len; widgets++) {
					if (widgets < this.data.chooseComponent.length) {
						if (this.data.chooseComponent[widgets].widget == "Plaintext") {
							reportWidgets.push({
								report_templates: {
									report_id: reportId,
									widget: this.data.chooseComponent[widgets].widget,
									row: this.data.chooseComponent[widgets].id,
									col: 1,
									args: JSON.stringify(
										this.data.chooseComponent[widgets].filters
										),
									text: this.data.chooseComponent[widgets].text,
									sujet: this.data.chooseComponent[widgets].subject
								}
							});
						} else {
							reportWidgets.push({
								report_templates: {
									report_id: reportId,
									widget: this.data.chooseComponent[widgets].widget,
									row: this.data.chooseComponent[widgets].id,
									col: 1,
									args: JSON.stringify(
										this.data.chooseComponent[widgets].filters
										),
									text: "",
									sujet: ""
								}
							});
						}
					}

					if (this.data.chooseComponentID.length > 0)
						this.datatablesDelete(
							"Report/callReportTemplate",
							this.data.chooseComponentID[widgets]
						);
				}
				this.datatablesCreate("Report/callReportTemplate", reportWidgets);

				// TO DO
				let reportDestinations = [];

				// Delete all destinations
				for (let el = 0; el < this.data.destinationID.length; el++) {
					this.datatablesDelete(
						"Report/callReportDestination",
						this.data.destinationID[el]
						); 
				}
				// Create new destinations

				if (this.emailDest == "1") {
					for (let el in this.data.emails) {
						reportDestinations.push({
							report_destinations: {
								report_id: reportId,
								type: "email",
								destination: this.data.emails[el]
							}
						});
					}
				}
				if (this.whatsappDest == "1") {
					reportDestinations.push({
						report_destinations: {
							report_id: reportId,
							type: "whatsapp",
							destination: this.whatsappGroupSelected
						}
					});
				}else{
					this.whatsappDest == "0"
				}
				this.datatablesCreate(
					"Report/callReportDestination",
					reportDestinations
				);
			},
			onHidden(){
				// this.data = {
				// 	name: "",
				// 	description: "",
				// 	subject: "",
				// 	comment: "",
				// 	date: {},
				// 	emails: [],
				// 	destinationID: [],
				// 	actif: "1",
				// 	validate: "1"
				// }
				// this.email = '';
				// this.day = "Monday";
				// this.hour = "01";
				// this.frequence = "daily";
				// this.dayOfMonth = "01";
				// this.daysOfMonth = [];
				// this.emailDest= "0";
				// this.sendMail=true;
				// this.whatsappDest= "0";
				// this.whatsappGroupSelected= null;
				// this.groupWhatsapp= null;
				// this.selectedType= "daily";
				// this.selectedModel= "1";
				// this.date_once= null;
				// this.date_onced= null;
				// this.widget= null;
				// this.type= "daily";
			}
		},

		computed: {
			userDetail() {
				return this.$store.getters.userDetail;
			},
			user() {
				//checking user object from state
				return this.$store.getters.user;
		  	},
			reportTemplate() {
				return this.$store.getters["Report/reportTemplate"];
			},
			reportDestination() {
				return this.$store.getters["Report/reportDestination"];
			},

			getTypesList() {
				return [
					{ text: this.$t("Frequency.daily"), value: "daily" },
					{ text: this.$t("Frequency.weekly"), value: "weekly" },
					{ text: this.$t("Frequency.monthly"), value: "monthly" },
					{ text: "Custom", value: "custom" }
				];
			},

			configWhatsapp() {
				return this.$store.getters["Report/configWhatsapp"];
			},

			reportCreate() {
				return this.$store.getters.create;
			},
			reportEdit() {
				return this.$store.getters.edit;
			},
			error() {
				if (this.$store.getters.error) {
					return this.$store.getters.error;
				}
			},
		},
		watch: {
			report(val) {
				if (val !== null || val !== undefined) {
					this.id = val.DT_RowId.substring(4);
					this.data.name = val.report_info.name;
					this.data.description = val.report_info.description;
					this.selectedType = val.report_info.report_type;
					this.selectedModel = this.reportModels[val.report_info.model - 1].value;
					this.frequence = val.report_info.frequence;
					if (this.frequence == "monthly") {
						if (this.changeType == false) {
							this.getDayOfMonth();
						}
						this.dayOfMonth = this.daysOfMonth[val.report_info.day - 1];
					} else if (this.frequence == "weekly") {
						this.day = this.days[val.report_info.day - 1].value;
					} else if (this.frequence == "once") {
						this.date_once = moment.utc(val.report_info.day).unix();//new Date(val.report_info.day * 1000);
					}

					this.hour = this.hours[val.report_info.hour];
					this.data.actif = val.report_info.actif;
					this.data.validate = val.report_info.validated;
				}
				this.data.chooseComponent = [];
				this.data.chooseComponentID = [];
				this.data.emails = [];
				this.data.destinationID = [];
				this.email = "";
				this.refreshReportTemplate();	
			},

			reportDestination(value) {
				let len = value.data.length;
				for (let mail = 0; mail < len; mail++) {
					if (value.data[mail].report_destinations.destination != "") {
						if (value.data[mail].report_destinations.type == "email") {
							this.emailDest = "1"
							this.data.destinationID.push(value.data[mail].DT_RowId);
							this.data.emails.push(
								value.data[mail].report_destinations.destination
								);
						}
						if (value.data[mail].report_destinations.type == "whatsapp") {
							this.whatsappDest = "1"
							this.data.destinationID.push(value.data[mail].DT_RowId);
							this.whatsappGroupSelected = value.data[mail].report_destinations.destination;
						}
					}
				}
				this.email = "";
				for (let el in this.data.emails) {
					this.email += this.data.emails[el] + (el != this.data.emails.length - 1 ? ";" : "");
				}
			},

			reportTemplate(value) {
				let filters = [];

				for (let item = 0; item < value.data.length; item++) {
					let temp = value.data[item].report_templates.widget;
					this.data.chooseComponentID.push(value.data[item].DT_RowId);
					
					if(temp == "Plaintext"){
						this.data.subject = value.data[item].report_templates.sujet;
						this.data.comment = value.data[item].report_templates.text;
						this.data.chooseComponent.push({
							widget: temp,
							message: this.$t("Text.plain_text") + " - " + this.data.subject,
							text: this.data.comment,
							subject: this.data.subject
						});
						this.data.subject = "";
						this.data.comment = "";
					}else{
						filters = JSON.parse(value.data[item].report_templates.args);
						this.data.chooseComponent.push({
							widget: temp,
							filters: filters,
							message: filters.type != "custom" ? (this.templates[temp].name + " - " + filters.type.toUpperCase()) :
							(this.templates[temp].name + " - " + moment.utc(parseInt(filters.start), 'X').format("LL") +
							" - " + moment.utc(parseInt(filters.end), 'X').subtract(1,'m').format("LL")),
						});
					}
				}
			},

			widget(value) {
				switch (value) {
					case "prepaid":
					case "topup":
					case "mobileMoney":
					case "interIncom":
					case "antifraud":
						this.filters.types = this.getTypesList;
						break;
					default:
						break;
				}
			},

			configWhatsapp(){
				this.groupWhatsapp = this.getWhatsappGroup()
				this.whatsappGroupSelected = this.groupWhatsapp[0]
			},

			frequence(value) {
				switch (value) {
					case "daily":
					case "weekly":
					case "once":
					case "now":
					this.daysOfMonth = [];
					this.changeType = true;
					break;
					case "monthly":
					if (this.changeType) {
						this.getDayOfMonth();
					}
					break;
				}
			},
			date_once(value) {
				this.date_onced = moment.utc(this.date_once).unix();//new Date(this.date_once).getTime() / 1000;
			},

			date_range() {
		      	//let day = new Date().getDate() - 1
		      	this.start = this.date_range && this.date_range.start != null ? moment(this.date_range.start+"+0000").unix() : null;
				this.end = this.date_range && this.date_range.end != null ? moment(this.date_range.end+"+0000").add(1,'m').unix() : null;
		  	},


		  	error(value) {
			  	if (typeof value != undefined && value) {
			  		this.$notify({ group: "foo", type: "warning", text: value });
			  	}
		  	},
		  	reportCreate(value){
				if (value.data != null && this.createSend == true) {
			  		this.handleEditing(value);
			    }
			    this.refreshReport();
			},
			reportEdit(value) {
			  	if (value.data != null && this.createSend == true) {
			  		this.handleEditing(value);
			    }
			    this.refreshReport();
			},
			preWidgets(value){
				if(value){
					for(const [widget, options] of Object.entries(value)){
						this.date_range = options.date_range;
						this.widget = widget;
						this.type = this.preSelectedType;
						this.getComponent();
					}
				}
			}
		}
	};
</script>

<style type="text/css" scoped>
	.date-time-picker {
		display: inline;
	}

	.date-time-picker input {
		border-color: lightgray;
		border-style: solid;
		border-radius: 5px;
		padding-left: 5px;
		width: 100px;
		color: #6485f7;
		border: none;
		font-family: Nunito;
		font-weight: bold;
		font-size: 12px;
	}
	.m-title{
		background-color: #d2e7ea;color: #17a2b8;
	}

	.reportModel-1 .box1{
		background: linear-gradient(to top right, #DDC8AA,#F09B67);
	}
	.reportModel-1 .box2{
		background:linear-gradient(to top right,#ca9fa5, #e1c6d0);
	}
	.reportModel-1 .box3{
		background:linear-gradient(to top right, rgb(143, 224, 236),rgb(34, 159, 178) );
	}
	.reportModel-1 .box4{
		background:linear-gradient(to top right, rgb(159, 240, 216),rgb(74, 187, 153));
	}
	.reportModel-1 .box5{
		background:linear-gradient(to top right, #d07d9b, #8bc1f5)
	}
	.reportModel-2 .previewBox{
		background: #A7D9E9;	
	}
	.reportModel-3 .previewBox{
		background: transparent linear-gradient(180deg, #0079B9 0%, #056095 46%, #0D3B5E 100%) 0% 0% no-repeat padding-box;
	}
	
</style>