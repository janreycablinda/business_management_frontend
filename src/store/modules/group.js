import axios from "axios";

export default {
  namespaced: true,
  state: {
    group: null,
  },
  getters: {
    groups(state) {
      return state.group;
    },
  },
  mutations: {
    SET_GROUP(state, data) {
        state.group = data;
    },

    NEW_GROUP(state, data) {
        let groups = state.group.concat(data);
        state.group = groups;
    },

    UPDATE_GROUP(state, data) {
        
        state.group = state.group.reduce((items , v) => {
            if(v.id == data.id){
                items.push(data)
            }else{
                items.push(v)
            }
            return items;
        }, []);
        
    },

    DELETE_GROUP(state, id) {
        let groups = state.group.filter(group => group.id != id);
        state.group = groups;
    },
  },
  actions: {
    async fetchGroup({commit}) {
        const response = await axios.get(`resources/groups`);

        commit('SET_GROUP', response.data);
    },

    async createGroup({commit, dispatch}, data) {
        await axios.post("resources/create_group", {
            group_name: data
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
          commit('NEW_GROUP', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
    },

    async updateGroup({commit, dispatch}, data) {
        await axios.put("resources/update_group", {
            id: data.id,
            group_name: data.group_name
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Updated!'
            }, {root: true});
            commit('UPDATE_GROUP', response.data);
        }, () => {
            dispatch('notification/addNotification', {
                type: 'danger',
                message: 'Ops! Something went wrong!'
            }, {root: true});
          
        });
    },

    async deleteGroup({commit, dispatch}, id) {
        const response = await axios.delete(`resources/delete_group/${id}`);
        if(response.data == 200){
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
            commit('DELETE_GROUP', id);
        }else{
            dispatch('notification/addNotification', {
                type: 'danger',
                message: 'Ops! Something went wrong!'
            }, {root: true});
        }
    },
  }
};
