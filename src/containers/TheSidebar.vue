<template>
  <CSidebar
    :minimize="minimize"
    unfoldable
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand to="/">
      <img height="35" class="c-sidebar-brand-full" src="/img/upload/logo.png">
      <img height="35" class="c-sidebar-brand-minimized" src="/img/upload/logo.png">
    </CSidebarBrand>
    <CRenderFunction flat :contentToRender="sidebarItems"/>
    <CSidebarMinimizer
      class="c-d-md-down-none"
      @click.native="$store.commit('toggle', 'sidebarMinimize')"
    />
  </CSidebar>
</template>

<script>
import SidebarItems from './SidebarItems'
export default {
  name: 'TheSidebar',
  extends: SidebarItems,
  computed: {
    show () {
      return this.$store.state.sidebarShow
    },
    minimize () {
      return this.$store.state.sidebarMinimize
    }
  }
}
</script>

