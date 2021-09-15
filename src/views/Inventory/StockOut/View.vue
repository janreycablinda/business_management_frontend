<template>
    <CRow>
        <CCol lg="12">
            <CCard>
                <CCardHeader>
                    <CButton @click="addStockinModalData = new Date()" size="sm" color="primary">
                        ADD STOCKOUT
                    </CButton>&nbsp;
                </CCardHeader>
                <CCardBody>
                    <StockoutTable
                    :items="stockouts"
                    v-on:event_child="eventChild"
                    />
                </CCardBody>
            </CCard>
        </CCol>
        <AddStockoutModal
        :addStockinModalData="addStockinModalData"
        />
        <EditStockoutModal
        :editStockinModalData="editStockinModalData"
        />
    </CRow>
</template>
<script>
import StockoutTable from './StockoutTable';
import AddStockoutModal from './AddStockoutModal';
import EditStockoutModal from './EditStockoutModal';
import { mapGetters } from 'vuex'

export default {
    components: {
        StockoutTable,
        AddStockoutModal,
        EditStockoutModal
    },
    data(){
        return {
            addStockinModalData: '',
            viewReceiptData: '',
            editStockinModalData: ''
        }
    },
    computed: {
        ...mapGetters({ 
            stockouts: "stockout/stockout"
        }),
    },
    methods: {
        eventChild: function(data, status) {
            if(status == 'edit'){
                this.editStockinModalData = {
                    trigger: new Date(),
                    data: data
                };
            } else if(status == 'view_receipt'){
                this.viewReceiptData = {
                    trigger: new Date(),
                    data: data
                };
            } else{
                this.deleteModal = {
                    trigger: new Date(),
                    data: data
                };
            }
            
        },
    },
    created(){
        this.$store.dispatch('stockout/fetchStockout');
        this.$store.dispatch('customer/fetchCustomer');
    }
}
</script>