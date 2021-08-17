<template>
  <div>
    <router-view></router-view>
    <notifications-list />
  </div>
</template>

<script>
import NotificationsList from './containers/NotificationsList';

export default {
  name: 'App',
  components: {
    NotificationsList
  }
}
</script>

<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';
</style>
