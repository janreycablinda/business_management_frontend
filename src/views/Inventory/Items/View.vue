<template>
    <CRow>
        <CCol col="12">
            <CCard>
                <CCardHeader>
                    <CButton size="sm" @click="addModal = new Date()" color="primary">NEW ITEM</CButton>
                    <CButton size="sm" @click="groupModalData = new Date()" color="primary" class="ml-1">GROUPS</CButton>
                    <CButton size="sm" to="/inventory/import-items" color="primary" class="ml-1">IMPORT ITEMS</CButton>
                </CCardHeader>
                <CCardBody>
                    <ItemTable
                    :items="items"
                    v-on:event_child="eventChild"
                    />
                </CCardBody>
            </CCard>
        </CCol>
        <AddItemModal
        :addModal="addModal"
        />
        <EditItemModal
        :editModal="editModal"
        />
        <GroupModal
        :groupModalData="groupModalData"
        />
    </CRow>
</template>
<script>
import ItemTable from './ItemTable';
import AddItemModal from './AddItemModal';
import EditItemModal from './EditItemModal';
import GroupModal from './GroupModal';
import { mapGetters } from 'vuex'

export default {
    data(){
        return {
            addModal: '',
            editModal: '',
            groupModalData: ''
        }
    },
    components: {
        ItemTable,
        AddItemModal,
        GroupModal,
        EditItemModal
    },
    computed: {
        ...mapGetters({ 
            items: "item/items",
        }),
    },
    methods: {
        eventChild(data){
            this.editModal = {
                trigger: new Date(),
                data: data
            }
        }
    },
    created(){
        this.$store.dispatch('item/fetchItem');
    }
}
</script>