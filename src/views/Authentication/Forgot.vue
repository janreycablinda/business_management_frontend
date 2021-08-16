<template>
  <div class="c-app flex-row align-items-center" :class="{ 'c-dark-theme': $store.state.darkMode }">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="4">
          <CCardGroup>
              <img src="/img/brand/logo.png">
            <CCard class="p-4">
              <CCardBody>
                <CForm class="text-center">
                  <h1>Forgot Password</h1>
                  <CInput
                    placeholder="Email"
                    autocomplete="username email"
                  >
                    <template #prepend-content><CIcon name="cil-envelope-closed"/></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton color="primary" class="px-4">Submit</CButton>
                    </CCol>
                    <CCol col="6" class="text-right">
                      <CButton to="/" color="link" class="px-0 text-white">Return Login</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>
