<template>
    <div>
        <CRow>
            <CCol lg="12">
                <CCard>
                    <CCardBody>
                        <PaymentTable/>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>
<script>
import PaymentTable from './PaymentTable';
export default {
    components: {
        PaymentTable
    },
    created(){
        console.log(this.$route);
    }
}
</script>