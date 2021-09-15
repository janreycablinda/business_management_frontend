<template>
    <CModal
      title="NEW ITEM"
      color="primary"
      :show.sync="addModalShow"
    >
        <CInput
        type="text"
        label="Item *"
        v-model="form.item"
        :isValid="checkIfValid('item')"
        invalidFeedback="Item is required!"
        :value.sync="$v.form.item.$model"
        />
        <CTextarea
            label="Description"
            rows="2"
            v-model="form.description"
        />
        <CInput
            type="text"
            label="Brand *"
            v-model="form.brand"
            :isValid="checkIfValid('brand')"
            invalidFeedback="Brand is required!"
            :value.sync="$v.form.brand.$model"
        />
        <CInput
            type="number"
            label="Qty *"
            v-model="form.qty"
            :isValid="checkIfValid('qty')"
            invalidFeedback="Qty is required!"
            :value.sync="$v.form.qty.$model"
        />
        <CInput
            type="number"
            label="Price *"
            v-model="form.price"
            :isValid="checkIfValid('price')"
            invalidFeedback="Price is required!"
            :value.sync="$v.form.price.$model"
        />
        <CSelect
            label="Unit *"
            placeholder="Nothing selected"
            :options="units | unitFilter"
            :value.sync='form.unit'
            :isValid="checkIfValid('unit')"
            invalidFeedback="Unit is required!"
        />
        <CInput
            type="number"
            label="Unit Cost *"
            v-model="form.unit_cost"
            :isValid="checkIfValid('unit_cost')"
            invalidFeedback="Unit Cost is required!"
            :value.sync="$v.form.unit_cost.$model"
        />
        <CInput
            type="number"
            label="Minimum Notifier *"
            v-model="form.notifier"
            :isValid="checkIfValid('notifier')"
            invalidFeedback="Minimum Notifier is required!"
            :value.sync="$v.form.notifier.$model"
        />
        <label>Group *</label>
        <v-select
            :options="groups | groupFilter" 
            placeholder="Nothing selected"
            v-model='form.group_id'
            :isValid="checkIfValid('group_id')"
            invalidFeedback="Group is required!"
            :class="{ 'border-danger radius-5': $v.form.group_id.$anyError, 'border-success radius-5': $v.form.group_id.$anyError == false && this.form.group_id != ''}"
        />
        <div v-if="$v.form.group_id.$anyError == true" class="invalid-feedback" style="display:block;">
            Group is required!
        </div>
      <template #footer>
        <CButton @click="addModalShow = false" color="secondary">CLOSE</CButton>
        <CButton id="btn-item-save" @click="submit" color="primary">SAVE</CButton>
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
        }
    },
    components: {
        vSelect
    },
    filters: {
        unitFilter(data){
            if(data){
                const options = data.reduce((option, item) => {
                    option.push({label: item.name, value: item.name})
                    return option
                }, [])
                return options;
            }
        },
        groupFilter(data){
            if(data){
                const options = data.reduce((option, item) => {
                    option.push({label: item.group_name, value: item.id})
                    return option
                }, [])
                return options;
            }
        }
    },
    props: ['addModal'],
    watch: {
        addModal(){
            this.addModalShow = true;
        }
    },
    computed: {
        ...mapGetters({ 
            units: "unit/units",
            groups: "group/groups",
        }),
        isValid () { return !this.$v.form.$invalid },
        isDirty () { return this.$v.form.$anyDirty },
    },
    mixins: [validationMixin],
    validations() {
        return {
            form: {
                item: {
                    required
                },
                brand: {
                    required
                },
                price: {
                    required
                },
                unit: {
                    required
                },
                qty: {
                    required
                },
                unit_cost: {
                    required
                },
                group_id: {
                    required
                },
                notifier: {
                    required
                },
            },
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
        validate () {
            this.$v.form.$touch()
        },
        submit(){
            this.validate();
            if (this.isValid) {
                this.$root.btn_load(true, 'btn-item-save', 'SAVE');
                this.$store.dispatch('item/createItem', this.form).then(() => {
                    this.form = this.getEmptyForm();
                    this.$v.$reset();
                    this.addModalShow = false;
                    this.$root.btn_load(false, 'btn-item-save', 'SAVE');
                });
            }
        },
        getEmptyForm(){
            return {
                item: '',
                description: '',
                brand: '',
                price: '',
                unit: '',
                qty: '',
                unit_cost: '',
                group_id: '',
                notifier: ''
            }
        }
    },
    created(){
        this.$store.dispatch('unit/fetchUnit');
        this.$store.dispatch('group/fetchGroup');
    }
}
</script>