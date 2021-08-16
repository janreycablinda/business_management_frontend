<template>
    <div>
        <CRow>
            <CCol lg="3">
                <CCard>
                    <CCardBody>
                        Sample Company
                    </CCardBody>
                </CCard>
                <CCard>
                    <CCardBody>
                        <CTabs fill="true" variant="tabs" vertical>
                                <CTab>
                                    <template slot="title">
                                        <label class="inline"><CIcon name="cil-basket"/> Profile</label>
                                    </template>
                                </CTab>
                                <CTab>
                                    <template slot="title">
                                        <label class="inline"><CIcon name="cil-basket"/> test</label>
                                    </template>
                                </CTab>
                                <CTab>
                                    <template slot="title">
                                        <label class="inline"><CIcon name="cil-basket"/> test</label>
                                    </template>
                                </CTab>
                        </CTabs>
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol lg="9">
                <CCard>
                    <CCardHeader>
                        <CButton to="/customers/new-customer" size="sm" color="primary">
                            NEW CUSTOMER
                        </CButton>&nbsp;
                        <CButton to="/customers/import-customers" size="sm" color="primary">
                            IMPORT CUSTOMERS
                        </CButton>&nbsp;
                        <CButton size="sm" color="primary">
                            CONTACTS
                        </CButton>
                    </CCardHeader>
                    <CCardBody>
                        Customers Summary
                        <CRow class="mt-2">
                            <CCol lg="2" class="border-right">
                                <h3>1</h3>
                                <span>Total Customers</span>
                            </CCol>
                            <CCol lg="2" class="border-right">
                                <h3>1</h3>
                                <span class="text-success">Active Customers</span>
                            </CCol>
                            <CCol lg="2" class="border-right">
                                <h3>1</h3>
                                <span class="text-danger">Inactive Customers</span>
                            </CCol>
                            <CCol lg="2" class="border-right">
                                <h3>1</h3>
                                <span class="text-success">Active Contacts</span>
                            </CCol>
                            <CCol lg="2" class="border-right">
                                <h3>1</h3>
                                <span class="text-danger">Inactive Contacts</span>
                            </CCol>
                            <CCol lg="2" class="border-right">
                                <h3>1</h3>
                                <span>Contacts Logged In Today</span>
                            </CCol>
                        </CRow>
                    </CCardBody>
                    <CCardFooter>
                        <CInputCheckbox
                        label="Exclude Inactive Customers"
                        value="true"
                        :checked="true"
                        />
                        <CustomersTable/>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>
<script>
import CustomersTable from './CustomersTable';
export default {
    components: {
        CustomersTable
    },
    created(){
        console.log(this.$route);
    }
}
</script>