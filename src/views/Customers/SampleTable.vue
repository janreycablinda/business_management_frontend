<template>
    <div>
      <CDataTable
        :border="border"
        :small="small"
        :fixed="fixed"
        :items="items"
        :fields="fields"
      >
        <template #action="{item}">
            <td>
                <div>
                <CButton @click="getValue(item)" color="info"><CIcon name="cil-pencil"/></CButton> &nbsp;
                <CButton @click="getValueDel(item)" color="danger"><CIcon name="cil-trash"/></CButton>
                </div>
            </td>
        </template>
      </CDataTable>
    </div>
</template>

<script>
export default {
  name: 'Table',
  props: {
    items: Array,
    fields: {
      type: Array,
      default () {
        return ['#', 'company', 'primary_contact', 'primary_email', 'phone', 'status', 'action']
      }
    },
    caption: {
      type: String,
      default: 'Table'
    },
    hover: Boolean,
    striped: Boolean,
    border: Boolean,
    small: Boolean,
    fixed: Boolean,
    dark: Boolean
  },
  methods: {
    getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    getValue(data){
      this.$emit('event_child', data, 'edit');
    },
    getValueDel(data){
      this.$emit('event_child', data, 'delete');
    },
  }
}
</script>
