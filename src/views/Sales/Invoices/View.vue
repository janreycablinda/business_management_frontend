<template>
    <div>
        <CRow>
            <CCol lg="12">
                <CCard>
                    <CCardHeader>
                        <CButton to="/customers/new-customer" size="sm" color="primary">
                            CREATE NEW INVOICE
                        </CButton>&nbsp;
                        <CButton to="/customers/import-customers" size="sm" color="primary">
                            RECURRING INVOICES
                        </CButton>&nbsp;
                    </CCardHeader>
                    <CCardBody>
                        <InvoicesTable/>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>
<script>
import InvoicesTable from './InvoicesTable';
export default {
    components: {
        InvoicesTable
    },
    created(){
        console.log(this.$route);
    }
}
</script>