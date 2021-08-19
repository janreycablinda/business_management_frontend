<template>
    <CRow>
        <CCol lg="4">
            <CCard>
                <CCardHeader>
                    Profile Picture
                </CCardHeader>
                <CCardBody>
                    <div class="text-center">
                        <img class="c-avatar-img" style="width:60%;" src="/img/upload/blank.png">
                    </div>
                </CCardBody>
                <CCardFooter>
                    <CButton color="primary">SAVE</CButton>
                </CCardFooter>
            </CCard>
        </CCol>
        <CCol lg="8">
            <CCard>
                <CCardHeader>
                    Personal Information
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol lg="6">
                            <CInput
                                label="Name"
                                autocomplete="name"
                            />
                        </CCol>
                        <CCol lg="6">
                            <CInput
                                label="Email"
                                autocomplete="name"
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol lg="6">
                            <CInput
                                label="Contact No."
                                autocomplete="name"
                            />
                        </CCol>
                        <CCol lg="6">
                            <CInput
                                label="Address"
                                autocomplete="name"
                            />
                        </CCol>
                    </CRow>
                </CCardBody>
                <CCardFooter>
                    <CButton color="primary">SAVE</CButton>
                </CCardFooter>
            </CCard>
        </CCol>
        <CCol lg="4">
            <CCard>
                <CCardHeader>
                    Change Password
                </CCardHeader>
                <CCardBody>
                    <CInput
                        label="Old password"
                        autocomplete="name"
                    />
                    <CInput
                        label="New password"
                        autocomplete="name"
                    />
                    <CInput
                        label="Retype New password"
                        autocomplete="name"
                    />
                </CCardBody>
                <CCardFooter>
                    <CButton color="primary">SAVE</CButton>
                </CCardFooter>
            </CCard>
        </CCol>
    </CRow>
</template>
<script>
export default {
    
}
</script>