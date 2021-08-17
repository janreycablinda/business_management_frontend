<template>
    <div>
        <CAlert 
        :show.sync="dismissCountDown"
        closeButton
        fade
        :color="notification.type"
        >{{notification.message}}</CAlert>
    </div>
</template>

<script>

export default{
    props: ["notification"],
    data() {
        return {
            dismissCountDown: 3,
        }
    }
}
</script>
