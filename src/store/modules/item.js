import axios from "axios";

export default {
  namespaced: true,
  state: {
    item: null,
  },
  getters: {
    items(state) {
      return state.item;
    },
  },
  mutations: {
    SET_ITEM(state, data) {
        state.item = data;
    },

    NEW_ITEM(state, data) {
        let items = state.item.concat(data);
        state.item = items;
    },

    UPDATE_ITEM(state, data) {
        
        state.item = state.item.reduce((items , v) => {
            if(v.id == data.id){
                items.push(data)
            }else{
                items.push(v)
            }
            return items;
        }, []);
        
    },

    DELETE_ITEM(state, id) {
        let items = state.item.filter(item => item.id != id);
        state.item = items;
    },
  },
  actions: {
    async fetchItem({commit}) {
        const response = await axios.get(`resources/items`);

        commit('SET_ITEM', response.data);
    },

    async createItem({commit, dispatch, rootState}, data) {
        await axios.post("resources/create_item", {
            item: data.item,
            description: data.description,
            brand: data.brand,
            qty: data.qty,
            price: data.price,
            unit: data.unit,
            unit_cost: data.unit_cost,
            group_id: data.group_id.value,
            user_id: rootState.auth.user.id,
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
          commit('NEW_ITEM', response.data);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
    },

    async updateItem({commit, dispatch, rootState}, data) {
        await axios.put("resources/update_item", {
            id: data.id,
            item: data.item,
            description: data.description,
            brand: data.brand,
            qty: data.qty,
            price: data.price,
            unit: data.unit,
            unit_cost: data.unit_cost,
            group_id: data.group_id,
            user_id: rootState.auth.user.id,
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Updated!'
            }, {root: true});
            commit('UPDATE_ITEM', response.data);
        }, () => {
            dispatch('notification/addNotification', {
                type: 'danger',
                message: 'Ops! Something went wrong!'
            }, {root: true});
          
        });
    },

    async deleteItem({commit, dispatch}, id) {
        const response = await axios.delete(`resources/delete_item/${id}`);
        if(response.data == 200){
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
            commit('DELETE_ITEM', id);
        }else{
            dispatch('notification/addNotification', {
                type: 'danger',
                message: 'Ops! Something went wrong!'
            }, {root: true});
        }
    },
  }
};
