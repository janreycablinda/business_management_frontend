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
        :sorter='{ external: true, resetable: true }'
        items-per-page-select
        
      >
        <template #stockin_no="{item}">
            <td>
                SI-00{{item.id}}
            </td>
        </template>
        <template #receipt="{item}">
            <td v-if="item.receipt">
                <CLink
                v-c-tooltip="'View Receipt'"
                @click="ViewReceipt(item)">
                    {{item.receipt}}
                </CLink>
            </td>
            <td v-else>
                No Receipt
            </td>
        </template>
        <template #encoded_by="{item}">
            <td>
                {{item.user.name}}
            </td>
        </template>
        <template #action="{item}">
            <td>
                <div>
                <CButton size="sm" @click="getValue(item)" color="info"><CIcon name="cil-pencil"/></CButton> &nbsp;
                <CButton size="sm" @click="getValueDel(item.id)" color="danger"><CIcon name="cil-trash"/></CButton>
                </div>
            </td>
        </template>
      </CDataTable>
    </div>
</template>

<script>
export default {
  name: 'Table',
  data(){
      return {
          edit_form: {
              id: '',
              group_name: ''
          }
      }
  },
  props: {
    items: Array,
    fields: {
      type: Array,
      default () {
        return ['stockin_no', 'receipt', 'total_cost', 'encoded_by', 'date', 'action']
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
    update(){
        this.$store.dispatch('group/updateGroup', this.edit_form).then(() => {
            this.edit_form = {
                id: '',
                group_name: ''
            }
        });
    },
    getValue(data){
      this.$emit('event_child', data, 'edit');
        this.edit_form.id = data.id;
        this.edit_form.group_name = data.group_name;
    },
    getValueDel(data){
        if (confirm('Are you sure you want to perform this action?')) {
            this.$store.dispatch('stockin/deleteStockin', data);
        }
    },
    ViewReceipt(data){
      this.$emit('event_child', data, 'view_receipt');
    }
  }
}
</script>
