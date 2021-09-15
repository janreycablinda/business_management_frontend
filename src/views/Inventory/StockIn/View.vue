<template>
    <CRow>
        <CCol lg="12">
            <CCard>
                <CCardHeader>
                    <CButton @click="addStockinModalData = new Date()" size="sm" color="primary">
                        ADD STOCKIN
                    </CButton>&nbsp;
                </CCardHeader>
                <CCardBody>
                    <StockinTable
                    :items="stockin"
                    v-on:event_child="eventChild"
                    />
                </CCardBody>
            </CCard>
        </CCol>
        <AddStockinModal
        :addStockinModalData="addStockinModalData"
        />
        <ViewReceipt
        :viewReceiptData="viewReceiptData"
        />
        <EditStockinModal
        :editModalData="editModalData"
        />
    </CRow>
</template>
<script>
import StockinTable from './StockinTable';
import AddStockinModal from './AddStockinModal';
import EditStockinModal from './EditStockinModal';
import ViewReceipt from './ViewReceipt';
import { mapGetters } from 'vuex'

export default {
    components: {
        StockinTable,
        AddStockinModal,
        ViewReceipt,
        EditStockinModal
    },
    data(){
        return {
            addStockinModalData: '',
            viewReceiptData: '',
            editModalData: ''
        }
    },
    computed: {
        ...mapGetters({ 
            stockin: "stockin/stockin",
        }),
    },
    methods: {
        eventChild: function(data, status) {
            if(status == 'edit'){
                this.editModalData = {
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
        this.$store.dispatch('stockin/fetchStockin');
    }
}
</script>