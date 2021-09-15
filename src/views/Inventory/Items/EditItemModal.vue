<template>
    <CModal
      title="UPDATE ITEM"
      color="primary"
      :show.sync="editModalShow"
    >
        <CInput
        type="text"
        label="Item *"
        v-model="form_edit.item"
        :isValid="checkIfValid('item')"
        invalidFeedback="Item is required!"
        :value.sync="$v.form_edit.item.$model"
        />
        <CTextarea
            label="Description"
            rows="2"
            v-model="form_edit.description"
        />
        <CInput
            type="text"
            label="Brand *"
            v-model="form_edit.brand"
            :isValid="checkIfValid('brand')"
            invalidFeedback="Brand is required!"
            :value.sync="$v.form_edit.brand.$model"
        />
        <CInput
            type="number"
            label="Qty *"
            v-model="form_edit.qty"
            :isValid="checkIfValid('qty')"
            invalidFeedback="Qty is required!"
            :value.sync="$v.form_edit.qty.$model"
        />
        <CInput
            type="number"
            label="Price *"
            v-model="form_edit.price"
            :isValid="checkIfValid('price')"
            invalidFeedback="Price is required!"
            :value.sync="$v.form_edit.price.$model"
        />
        <CSelect
            label="Unit *"
            placeholder="Nothing selected"
            :options="units | unitFilter"
            :value.sync='form_edit.unit'
            :isValid="checkIfValid('unit')"
            invalidFeedback="Unit is required!"
        />
        <CInput
            type="number"
            label="Unit Cost *"
            v-model="form_edit.unit_cost"
            :isValid="checkIfValid('unit_cost')"
            invalidFeedback="Unit Cost is required!"
            :value.sync="$v.form_edit.unit_cost.$model"
        />
        <CInput
            type="number"
            label="Minimum Notifier *"
            v-model="form_edit.notifier"
            :isValid="checkIfValid('notifier')"
            invalidFeedback="Minimum Notifier is required!"
            :value.sync="$v.form_edit.notifier.$model"
        />
        <label>Group *</label>
        <v-select
            :options="groups | groupFilter" 
            placeholder="Nothing selected"
            v-model='form_edit.group_id'
            :reduce="label => label.value" 
            label="label"
            :isValid="checkIfValid('group_id')"
            invalidFeedback="Group is required!"
            :class="{ 'border-danger radius-5': $v.form_edit.group_id.$anyError, 'border-success radius-5': $v.form_edit.group_id.$anyError == false && this.form_edit.group_id != ''}"
        />
        <div v-if="$v.form_edit.group_id.$anyError == true" class="invalid-feedback" style="display:block;">
            Group is required!
        </div>
      <template #footer>
        <CButton @click="editModalShow = false" color="secondary">CLOSE</CButton>
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
            editModalShow: false,
            form_edit: this.getEmptyForm(),
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
    props: ['editModal'],
    watch: {
        editModal(newVal){
            this.editModalShow = true;
            this.form_edit = newVal.data;
        }
    },
    computed: {
        ...mapGetters({ 
            units: "unit/units",
            groups: "group/groups",
        }),
        isValid () { return !this.$v.form_edit.$invalid },
        isDirty () { return this.$v.form_edit.$anyDirty },
    },
    mixins: [validationMixin],
    validations() {
        return {
            form_edit: {
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
            const field = this.$v.form_edit[fieldName]
            if (!field.$dirty) {
                return null
            } 
            return !(field.$invalid || field.$model === '')
        },
        validate () {
            this.$v.form_edit.$touch()
        },
        submit(){
            this.validate();
            if (this.isValid) {
                this.$store.dispatch('item/updateItem', this.form_edit).then(() => {
                    this.form_edit = this.getEmptyForm();
                    this.$v.$reset();
                    this.editModalShow = false;
                });
            }
        },
        getEmptyForm(){
            return {
                id: '',
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