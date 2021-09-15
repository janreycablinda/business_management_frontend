<template>
    <CModal
      title="GROUPS"
      color="primary"
      :show.sync="groupModalShow"
    >
        <CInput
        type="text"
        placeholder="Group Name"
        v-model="group_name"
        >
            <template #append>
                <CButton @click="submit" color="primary">CREATE GROUP</CButton>
            </template>
        </Cinput>

        <GroupTable
        :items="groups"
        />
        
      <template #footer>
        <CButton @click="groupModalShow = false" color="secondary">CLOSE</CButton>
      </template>
    </CModal>
</template>
<script>
import GroupTable from './GroupTable'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            groupModalShow: false,
            group_name: ''
        }
    },
    components: {
        GroupTable
    },
    computed: {
        ...mapGetters({ 
            groups: "group/groups",
        }),
    },
    props: ['groupModalData'],
    watch: {
        groupModalData(){
            this.groupModalShow = true
            this.$store.dispatch('group/fetchGroup');
        }
    },
    methods: {
        submit(){
            this.$store.dispatch('group/createGroup', this.group_name).then(() => {
                this.group_name = ''
            });
        }
    }
}
</script>