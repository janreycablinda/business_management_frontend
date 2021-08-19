<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img
            src="/img/upload/blank.png"
            class="c-avatar-img "
          />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Account</strong>
    </CDropdownHeader>
    <CDropdownItem to="/profile">
      <CIcon name="cil-user" /> Profile
    </CDropdownItem>
    <!-- <CDropdownItem>
      <CIcon name="cil-settings" /> Settings
    </CDropdownItem> -->
    <CDropdownDivider/>
    <CDropdownItem>
      <CIcon name="cil-shield-alt" /> Lock Account
    </CDropdownItem>
    <CDropdownItem @click="signOut">
      <CIcon name="cil-lock-locked" /> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'TheHeaderDropdownAccnt',
  data () {
    return { 
      itemsCount: 42
    }
  },
  computed: {
    ...mapGetters({
        authenticated: "auth/authenticated",
        user: "auth/user"
    })
  },
  methods: {
    ...mapActions({
      signOutAction: "auth/signOut"
    }),
    signOut() {
      this.signOutAction().then(() => {
        this.$router.replace({
          name: "Login"
        });
      });
    }
  },
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>