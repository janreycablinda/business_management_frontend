<template>
    <CModal
      title="ADD STOCKOUT"
      color="primary"
      :show.sync="addModalShow"
    >
        <CRow>
            <CCol lg="10">
                <label>Customer *</label>
                <CInput
                    type="text"
                    v-if="form.custom"
                    v-model="form.customer_name"
                    :isValid="checkIfValid('customer_name')"
                    invalidFeedback="Customer Name is required!"
                    :value.sync="$v.form.customer_name.$model"
                />
                <template v-else>
                <v-select
                    :options="customers | itemCustomer" 
                    placeholder="Nothing selected"
                    v-model='form.customer_id'
                    
                    :isValid="checkIfValid('customer_id')"
                    invalidFeedback="Group is required!"
                    :class="{ 'border-danger radius-5': $v.form.customer_id.$anyError, 'border-success radius-5': $v.form.customer_id.$anyError == false && this.form.customer_id != ''}"
                />
                <div v-if="$v.form.customer_id.$anyError == true" class="invalid-feedback" style="display:block;">
                    Customer is required!
                </div>
                </template>
            </CCol>
            <CCol lg="2">
                <label>custom?</label>
                <CSwitch
                    class="mr-1"
                    color="primary"
                    :checked="form.custom"
                    size="lg"
                    @change.native="form.custom = !form.custom"
                />
            </CCol>
        </CRow>
        <CRow>
            <CCol lg="7">
                <label>Item *</label>
                <v-select
                    :options="items | itemFilter" 
                    placeholder="Nothing selected"
                    v-model='form_temp.item_id'
                    :isValid="checkIfValidTemp('item_id')"
                    invalidFeedback="Group is required!"
                    :class="{ 'border-danger radius-5': $v.form_temp.item_id.$anyError, 'border-success radius-5': $v.form_temp.item_id.$anyError == false && this.form_temp.item_id != ''}"
                >
                <template #option="option">
                    <p style="margin: 0">{{ option.label }}</p>
                    <cite>Stocks: {{option.qty}} {{option.unit}}</cite>
                </template>
                </v-select>
                <div v-if="$v.form_temp.item_id.$anyError == true" class="invalid-feedback" style="display:block;">
                    Item is required!
                </div>
            </CCol>
            <CCol lg="3">
                <CInput
                    type="number"
                    label="Qty *"
                    v-model="form_temp.qty"
                    :isValid="checkIfValidTemp('qty')"
                    invalidFeedback="Qty is required!"
                    :value.sync="$v.form_temp.qty.$model"
                />
            </CCol>
            <CCol lg="2">
                <CButton @click="addTemp" class="text-white" style="margin-top:30px; margin-left:-12px;" color="primary">ADD</CButton>
            </CCol>
        </CRow>
       <CRow>
           <CCol lg="12">
               <table class="custom-table">
                   <tr>
                       <th width="70%">Item</th>
                       <th width="10%">Qty</th>
                       <th width="10%">Unit</th>
                       <th width="10%">Action</th>
                   </tr>
                   <tr v-for="temp in stockout_temp" :key="temp.item_id">
                       <td>{{temp.item}}</td>
                       <td>{{temp.qty}}</td>
                       <td>{{temp.unit}}</td>
                       <td class="text-center"><CButton size="sm" @click="removeTemp(temp.item_id)" color="danger"><CIcon name="cil-trash"/></CButton></td>
                   </tr>
               </table>
                
           </CCol>
       </CRow>
       <CRow class="mt-3">
           <CCol lg="6">
                <v-date-picker v-model="form.purchase_date" class="custom-date-container" mode="datetime" color="orange">
                    <template v-slot="{ inputValue, inputEvents }">
                        <label class="v-date-picker-label"> STOCKOUT DATE </label>
                        <input
                        class="px-2 py-1 custom-date-picker border mb-3 rounded focus:outline-none focus:border-blue-300"
                        :value="inputValue"
                        v-on="inputEvents"
                        style="width: 100%"
                        />
                    </template>
                </v-date-picker>
           </CCol>
           <CCol lg="6">
               <v-date-picker v-model="form.delivery_date" class="custom-date-container" mode="datetime" color="orange">
                    <template v-slot="{ inputValue, inputEvents }">
                        <label class="v-date-picker-label"> DELIVERY DATE </label>
                        <input
                        class="px-2 py-1 custom-date-picker border mb-3 rounded focus:outline-none focus:border-blue-300"
                        :value="inputValue"
                        v-on="inputEvents"
                        style="width: 100%"
                        />
                    </template>
                </v-date-picker>
           </CCol>
       </CRow>
      <template #footer>
        <CButton @click="addModalShow = false" color="secondary">CLOSE</CButton>
        <CButton @click="submit" color="primary">SAVE</CButton>
      </template>
    </CModal>
</template>
<script>
import vSelect from 'vue-select'
import { mapGetters } from 'vuex'
import { validationMixin } from "vuelidate"
import { required } from "vuelidate/lib/validators"

export default {
    data(){
        return {
            addModalShow: false,
            form: this.getEmptyForm(),
            form_temp: this.getEmptyFormTemp(),
            UploadPlaceholder: 'No file chosen',
            custom_switch: false
        }
    },
    components: {
        vSelect
    },
    filters: {
        itemFilter(data){
            if(data){
                const options = data.reduce((option, item) => {
                    if(item.description){
                        option.push({
                        label: item.item + '-' + item.description + '-' + item.brand,
                        value: item.id, 
                        qty: item.qty, 
                        unit: item.unit})
                    }else{
                        option.push({
                        label: item.item + '-' + item.brand,
                        value: item.id, 
                        qty: item.qty, 
                        unit: item.unit})
                    }
                    return option
                }, [])
                return options;
            }
        },
        itemCustomer(data){
            if(data){
                const options = data.reduce((option, item) => {
                    option.push({label: item.company_name, value: item.id})
                    return option
                }, [])
                return options;
            }
        },
    },
    props: ['addStockinModalData'],
    watch: {
        addStockinModalData(){
            this.addModalShow = true;
        },
        purchase_date(){
            this.form.purchase_date = this.form.purchase_date.toLocaleString();
        },
        delivery_date(){
            this.form.delivery_date = this.form.delivery_date.toLocaleString();
        },
    },
    computed: {
        ...mapGetters({ 
            items: "item/items",
            stockout_temp: "stockout/stockout_temp",
            customers: "customer/customer",
        }),
        isValid () { return !this.$v.form.$invalid },
        isDirty () { return this.$v.form.$anyDirty },
        purchase_date(){
            return this.form.purchase_date;
        },
        delivery_date(){
            return this.form.delivery_date;
        },
    },
    mixins: [validationMixin],
    validations() {
        if(this.form.custom){
            return {
                form: {
                    customer_name: {
                        required
                    }
                },
                form_temp: {
                    item_id: {
                        required
                    },
                    qty: {
                        required
                    },
                }
            }
        }else{
            return {
                form: {
                    customer_id: {
                        required
                    }
                },
                form_temp: {
                    item_id: {
                        required
                    },
                    qty: {
                        required
                    },
                }
            }
        }

    },
    methods: {
        checkIfValid (fieldName) {
            const field = this.$v.form[fieldName]
            if (!field.$dirty) {
                return null
            } 
            return !(field.$invalid || field.$model === '')
        },
        checkIfValidTemp (fieldName) {
            const field = this.$v.form_temp[fieldName]
            if (!field.$dirty) {
                return null
            } 
            return !(field.$invalid || field.$model === '')
        },
        validate () {
            this.$v.form.$touch()
        },
        customSwitch(e){
            console.log(e);
            this.form.custom = !this.form.custom;
        },
        validate_temp () {
            this.$v.form_temp.$touch()
        },
        submit(){
            console.log('test');
            this.validate();
            if (this.isValid) {
                if(this.stockin_temp != ''){
                    
                    const params = {
                        form: this.form,
                        stockout_temp: this.stockout_temp,
                    }
                     this.$store.dispatch('stockout/addStockout', params).then(() => {
                         this.addModalShow = false;
                         this.form = this.getEmptyForm();
                         this.form_temp = this.getEmptyFormTemp();
                     });
                }else{
                    this.$store.dispatch('notification/addNotification', {
                        type: 'danger',
                        message: 'Ops! empty item!'
                    }, {root: true});
                }
            }
        },
        uploadReceipt(files){
            this.form.receipt = files[0];
            this.UploadPlaceholder = files[0].name;
        },
        addTemp(){
            this.$store.dispatch('stockout/addStockoutTemp', this.form_temp).then(() => {
                this.form_temp = this.getEmptyFormTemp();
            });
        },
        removeTemp(id){
            this.$store.dispatch('stockout/removeStockoutTemp', id);
        },
        getEmptyForm(){
            return {
                custom: false,
                purchase_date: new Date().toLocaleString(),
                delivery_date: new Date().toLocaleString(),
                receipt: '',
                customer_id: '',
                customer_name: ''
            }
        },
        getEmptyFormTemp(){
            return {
                item_id: '',
                qty: 0
            }
        }
    },
    created(){
        this.$store.dispatch('item/fetchItem');
    }
}
</script>