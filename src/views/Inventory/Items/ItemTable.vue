<template>
    <div>
      <CDataTable
        :hover="hover"
        :striped="striped"
        :border="border"
        :small="small"
        :fixed="fixed"
        :items="items"
        :fields="fields"
        :items-per-page="small ? 10 : 5"
        :tableFilter='{ placeholder: "Search", label: " "}'
        :dark="dark"
        :table-filter="true"
        pagination
        items-per-page-select
        
      >
        <template #description="{item}">
            <td v-if="item.description">
                {{item.description}}
            </td>
            <td v-else>
                
            </td>
        </template>
        <template #action="{item}">
            <td>
                <div>
                <CButton @click="getValue(item)" color="info"><CIcon name="cil-pencil"/></CButton> &nbsp;
                <CButton @click="getValueDel(item.id)" color="danger"><CIcon name="cil-trash"/></CButton>
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
        return ['item', 'description', 'brand', 'qty', 'price', 'unit', 'unit_cost', 'action']
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
      this.$emit('event_child', data);
    },
    getValueDel(data){
      if (confirm('Are you sure you want to perform this action?')) {
          this.$store.dispatch('item/deleteItem', data);
      }
    },
  }
}
</script>
