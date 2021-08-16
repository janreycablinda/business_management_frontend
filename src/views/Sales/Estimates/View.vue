<template>
    <div>
        <CRow>
            <CCol lg="12">
                <CCard>
                    <CCardHeader>
                        <CButton to="/customers/new-customer" size="sm" color="primary">
                            CREATE NEW ESTIMATE
                        </CButton>&nbsp;
                    </CCardHeader>
                    <CCardBody>
                        <EstimateTable/>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>
<script>
import EstimateTable from './EstimateTable';
export default {
    components: {
        EstimateTable
    },
    created(){
        console.log(this.$route);
    }
}
</script>