<template>
    <div>
        <CRow>
            <CCol lg="12">
                <CCard>
                    <CCardHeader>
                        <CButton to="/customers/new-customer" size="sm" color="primary">
                            NEW CREDIT NOTE
                        </CButton>&nbsp;
                    </CCardHeader>
                    <CCardBody>
                        <CreditTable/>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>
<script>
import CreditTable from './CreditTable';
export default {
    components: {
        CreditTable
    },
    created(){
        console.log(this.$route);
    }
}
</script>