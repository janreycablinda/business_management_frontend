<template>
    <div>
        <CRow>
            <CCol lg="12">
                <CCard>
                    <CCardHeader>
                        <CButton to="/customers/new-customer" size="sm" color="primary">
                            RECORD EXPENSES
                        </CButton>&nbsp;
                    </CCardHeader>
                    <CCardBody>
                        <ExpensesTable/>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>
<script>
import ExpensesTable from './ExpensesTable';
export default {
    components: {
        ExpensesTable
    },
    created(){
        console.log(this.$route);
    }
}
</script>