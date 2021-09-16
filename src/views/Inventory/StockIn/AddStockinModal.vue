<template>
    <CModal
      title="ADD STOCKIN"
      color="primary"
      :show.sync="addModalShow"
    >
        
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
                   <template v-if="stockin_temp.length != 0">
                    <tr v-for="temp in stockin_temp" :key="temp.item_id">
                        <td class="text-center">{{temp.item}}</td>
                        <td>{{temp.qty}}</td>
                        <td>{{temp.unit}}</td>
                        <td class="text-center"><CButton size="sm" @click="removeTemp(temp.item_id)" color="danger"><CIcon name="cil-trash"/></CButton></td>
                    </tr>
                   </template>
                   <template v-else>
                       <tr>
                           <td class="text-center" colspan="4">NO ITEM ADD</td>
                       </tr>
                   </template>
               </table>
                
           </CCol>
       </CRow>
       <CRow class="mt-3">
           <CCol lg="6">
               <CInput
                    type="number"
                    label="Total Cost *"
                    v-model="form.total_cost"
                    :isValid="checkIfValid('total_cost')"
                    invalidFeedback="Total Cost is required!"
                    :value.sync="$v.form.total_cost.$model"
                />
           </CCol>
           <CCol lg="6">
                <v-date-picker v-model="form.date" color="red" mode="dateTime">
                    <template v-slot="{ inputValue, inputEvents }">
                        <label>Date</label><br>
                        <input
                        class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
                        :value="inputValue"
                        v-on="inputEvents"
                        style="width:100%;"
                        />
                    </template>
                </v-date-picker>
           </CCol>
       </CRow>
       <CRow>
           <CCol lg="12">
               <CInputFile
                    horizontal
                    :placeholder="UploadPlaceholder"
                    style="width:100%; margin-left:0px; border-radius:5px; border:1px solid #787883;"
                    class="py-2"
                    @change="uploadReceipt"
                />
           </CCol>
       </CRow>
      <template #footer>
        <CButton @click="addModalShow = false" color="secondary">CLOSE</CButton>
        <CButton id="add-stockin-btn" @click="submit" color="primary">SAVE</CButton>
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
            UploadPlaceholder: 'No file chosen'
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
    },
    props: ['addStockinModalData'],
    watch: {
        addStockinModalData(){
            this.addModalShow = true;
            this.$store.commit('stockin/SET_STOCKIN_TEMP', []);
        },
        date(){
            this.form.date = this.form.date.toLocaleString();
        },
    },
    computed: {
        ...mapGetters({ 
            items: "item/items",
            stockin_temp: "stockin/stockin_temp",
        }),
        isValid () { return !this.$v.form.$invalid },
        isDirty () { return this.$v.form.$anyDirty },
        date(){
            return this.form.date;
        },
    },
    mixins: [validationMixin],
    validations() {
        return {
            form: {
                total_cost: {
                    required
                },
                date: {
                    required
                },
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
        validate_temp () {
            this.$v.form_temp.$touch()
        },
        submit(){
            this.validate();
            if (this.isValid) {
                this.$root.btn_load(true, 'add-stockin-btn', 'SAVE');
                if(this.stockin_temp != ''){
                    let formData = new FormData();
                    formData.append('image', this.form.receipt);
                    formData.append('total_cost', this.form.total_cost);
                    formData.append('date', this.form.date);
                    var stockin_temp = JSON.stringify(this.stockin_temp);
                    formData.append('stockin_temp', stockin_temp);
                    formData.append('user_id', this.$store.getters['auth/user'].id);
                    const config = {
                            headers: { 'content-type': 'multipart/form-data' }
                    }
                    const params = {
                        formData: formData,
                        config: config,
                    }
                     this.$store.dispatch('stockin/addStockin', params).then(() => {
                         this.addModalShow = false;
                         this.form = this.getEmptyForm();
                         this.form_temp = this.getEmptyFormTemp();
                         this.$root.btn_load(false, 'add-stockin-btn', 'SAVE');
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
            this.$store.dispatch('stockin/addStockinTemp', this.form_temp);
        },
        removeTemp(id){
            this.$store.dispatch('stockin/removeStockinTemp', id);
        },
        getEmptyForm(){
            return {
                total_cost: '',
                date: new Date().toLocaleString(),
                receipt: ''
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