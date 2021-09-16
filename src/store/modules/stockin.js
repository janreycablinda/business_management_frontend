import axios from "axios";

export default {
  namespaced: true,
  state: {
    stockin: [],
    stockin_temp: []
  },
  getters: {
    stockin(state) {
      return state.stockin;
    },
    stockin_temp(state) {
        return state.stockin_temp;
    },
  },
  mutations: {
    SET_STOCKIN(state, data) {
        state.stockin = data;
    },
    ADD_STOCKIN(state, data) {
        let items = data.concat(state.stockin);
        state.stockin = items;
    },
    SET_STOCKIN_TEMP(state, data) {
        state.stockin_temp = data;
    },
    UPDATE_STOCKIN(state, data) {
        const index = state.stockin.findIndex(item => item.id === data.id);
        if(index !== -1){
          state.stockin.splice(index, 1, data);
        }
    },
    ADD_STOCKIN_TEMP(state, data) {
        let items = data.concat(state.stockin_temp);
        state.stockin_temp = items;
    },
    REMOVE_STOCKIN_TEMP(state, id) {
        let items = state.stockin_temp.filter(item => item.item_id != id);
        state.stockin_temp = items;
    },
    REMOVE_STOCKIN(state, id) {
        let items = state.stockin.filter(item => item.id != id);
        state.stockin = items;
    }
  },
  actions: {
    async fetchStockin({commit}) {
        const response = await axios.get(`resources/stockin`);

        commit('SET_STOCKIN', response.data);
    },

    async setStockinTempNull({commit}) {

        commit('SET_STOCKIN_TEMP', []);
    },

    async addStockin({commit, dispatch}, data) {
        await axios.post("resources/create_stockin", data.formData, data.config).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
           
           response.data.item.forEach(item => {
             commit('item/UPDATE_ITEM', item, {root: true});
           })
           commit('SET_STOCKIN_TEMP', []);
           commit('ADD_STOCKIN', [response.data.stockin]);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
    },

    async updateStockin({commit, dispatch}, data) {
        await axios.post("resources/update_stockin", data.formData, data.config).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Updated!'
            }, {root: true});
           console.log(response.data);
           response.data.item.forEach(item => {
             commit('item/UPDATE_ITEM', item, {root: true});
           })
           commit('SET_STOCKIN_TEMP', []);
           commit('UPDATE_STOCKIN', response.data.stockin);
        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
    },

    async addStockinTemp({commit}, data) {
        
        const params = {
            item_id: data.item_id.value,
            item: data.item_id.label,
            qty: data.qty,
            unit: data.item_id.unit
        }
        
        commit('ADD_STOCKIN_TEMP', [params]);
    },

    async removeStockinTemp({commit}, id) {
        
        commit('REMOVE_STOCKIN_TEMP', id);
    },

    async deleteStockin({commit, dispatch}, id) {
        const response = await axios.delete(`resources/delete_stockin/${id}`);
        if(response.data.status == 200){
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Deleted!'
            }, {root: true});
            
            response.data.items.forEach(item => {
                commit('item/UPDATE_ITEM', item, {root: true});
            })
            commit('REMOVE_STOCKIN', id);
        }else{
            dispatch('notification/addNotification', {
                type: 'danger',
                message: 'Ops! Something went wrong!'
            }, {root: true});
        }
    },

  }
};
