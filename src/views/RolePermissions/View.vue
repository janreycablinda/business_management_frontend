<template>
    <CRow>
        <CCol lg="12">
            <CCard>
                <CCardHeader>
                    <CButton size="sm" color="primary">Create Role</CButton>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol lg="3">
                            <v-select
                                :options="$options.multiselectOptions" 
                                placeholder="Select Role"
                            />
                        </CCol>
                    </CRow>
                    <CRow class="mt-2">
                        <CCol lg="12">
                            <RolePermissionTable/>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>
<script>
import RolePermissionTable from './RolePermissionTable'
import vSelect from 'vue-select'

export default {
    components: {
        RolePermissionTable,
        vSelect
    },
    multiselectOptions: [
    { value: 'AL', label: 'Admin' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AS', label: 'American Samoa'},
  ]
}
</script>