<template>
    <div class="notification-list">
        <notification-message 
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
        />
    </div>
</template>

<script>
import NotificationMessage from './NotificationMessage';
import { mapGetters } from 'vuex';

export default{
    components: {
        NotificationMessage
    },
    computed: {
    ...mapGetters({
        notifications: "notification/notifications",
      })
    },
}
</script>

<style>
.notification-list{
    position:fixed;
    top:0;
    right:0;
    margin-top:50px;
    margin-right:15px;
    width:320px;
    z-index:9999999999;
}
</style>
