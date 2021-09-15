<template>
    <CModal
      title="Receipt"
      :show.sync="viewReceiptModal"
      :centered="true"
      size="lg"
      
    >
        <img style="width:100%;" :src="imageUrl">
      <template #footer>
        <p></p>
      </template>
    </CModal>
</template>
<script>

export default {
    data(){
        return {
            viewReceiptModal: false,
            imageUrl: ''
        }
    },
    props: ['viewReceiptData'],
    watch: {
        viewReceiptData(data){
            this.imageUrl = process.env.VUE_APP_BACKEND + '/img/upload/' + data.data.receipt;
            this.viewReceiptModal = true;
        }
    }
}
</script>