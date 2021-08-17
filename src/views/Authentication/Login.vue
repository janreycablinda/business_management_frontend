<template>
  <div class="c-app flex-row align-items-center" :class="{ 'c-dark-theme': $store.state.darkMode }">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="7" sm="12" lg="4" class="text-center">
              <img src="/img/brand/logo.png">
            <CCard class="p-4">
              <CCardBody>
                <CForm class="text-center">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <CInput
                    placeholder="Username"
                    autocomplete="username email"
                    v-model="form.username"
                    @keyup.enter="submit"
                  >
                    <template #prepend-content><CIcon name="cil-user"/></template>
                  </CInput>
                  <CInput
                    placeholder="Password"
                    type="password"
                    autocomplete="curent-password"
                    v-model="form.password"
                    @keyup.enter="submit"
                  >
                    <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                  </CInput>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton @click="submit" color="primary" class="px-4">
                        <CSpinner v-if="spinner" color="white" size="sm"/>
                        Login
                      </CButton>
                    </CCol>
                    <CCol col="6" class="text-right">
                      <CButton to="/forgot" color="link" class="px-0 text-white">Forgot password?</CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return {
      form: this.getEmptyForm(),
      spinner: false
    }
  },
  methods: {
    getEmptyForm(){
      return {
        username: '',
        password: ''
      }
    },
    submit(){
      this.spinner = true;
      this.$store.dispatch('auth/signIn', this.form)
      .then(() => {
        this.spinner = false;
        this.$router.replace({
          name: "Dashboard"
        });
      })
      .catch(() => {
          this.spinner = false;
          this.form.password = '';
          this.$store.dispatch('notification/addNotification', {
              type: 'danger',
              message: 'Incorrect Username or Password!'
          }, {root: true});
        });
    }
  },
  created(){
  }
}
</script>
