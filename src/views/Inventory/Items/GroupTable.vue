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
        <template #group_name="{item}">
            <td>
                <div v-if="edit_form.id == item.id">
                    <CInput
                    type="text"
                    placeholder="Group Name"
                    v-model="edit_form.group_name"
                    size="sm"
                    >
                        <template #append>
                            <CButton @click="update" color="primary">SAVE</CButton>
                        </template>
                    </Cinput>
                </div>
                <div v-else>
                    {{item.group_name}}
                </div>
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
        return ['id', 'group_name', 'action']
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
    //   this.$emit('event_child', data, 'edit');
        this.edit_form.id = data.id;
        this.edit_form.group_name = data.group_name;
    },
    getValueDel(data){
        if (confirm('Are you sure you want to perform this action?')) {
            this.$store.dispatch('group/deleteGroup', data);
        }
    },
  }
}
</script>
