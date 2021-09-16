import axios from "axios";

export default {
  namespaced: true,
  state: {
    stockout: [],
    stockout_temp: []
  },
  getters: {
    stockout(state) {
      return state.stockout;
    },
    stockout_temp(state) {
        return state.stockout_temp;
    },
  },
  mutations: {
    SET_STOCKOUT(state, data) {
        state.stockout = data;
    },
    ADD_STOCKOUT(state, data) {
        let items = data.concat(state.stockout);
        state.stockout = items;
    },
    UPDATE_STOCKOUT(state, data){
        const index = state.stockout.findIndex(item => item.id === data.id);
        if(index !== -1){
          state.stockout.splice(index, 1, data);
        }
    },
    SET_STOCKOUT_TEMP(state, data) {
        state.stockout_temp = data;
    },
    ADD_STOCKOUT_TEMP(state, data) {
        let items = data.concat(state.stockout_temp);
        state.stockout_temp = items;
    },
    REMOVE_STOCKOUT_TEMP(state, id) {
        let items = state.stockout_temp.filter(item => item.item_id != id);
        state.stockout_temp = items;
    },
    REMOVE_STOCKOUT(state, id){
        let items = state.stockout.filter(item => item.id != id);
        state.stockout = items;
    }
  },
  actions: {
    async fetchStockout({commit}) {
        const response = await axios.get(`resources/stockout`);

        commit('SET_STOCKOUT', response.data);
    },

    async setStockinTempNull({commit}) {

        commit('SET_STOCKIN_TEMP', []);
    },

    async addStockout({commit, dispatch, rootState}, data) {
        await axios.post("resources/create_stockout", {
            custom: data.form.custom,
            customer_id: data.form.customer_id.value,
            company_name: data.form.customer_name,
            purchase_date: data.form.purchase_date,
            delivery_date: data.form.delivery_date,
            user_id: rootState.auth.user.id,
            stockout_temp: data.stockout_temp
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
           console.log(response.data);

          response.data.item.forEach(item => {
            commit('item/UPDATE_ITEM', item, {root: true});
          });

          commit('ADD_STOCKOUT', [response.data.stockout]);
          commit('SET_STOCKOUT_TEMP', []);

        //   if(response.data.notification){
        //     commit('notification/NEW_NOTIFICATION', response.data.notification, {root: true});
        //   }

        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
    },

    async updateStockout({commit, dispatch, rootState}, data) {
        await axios.put("resources/update_stockout", {
            id: data.form.id,
            custom: data.form.custom,
            customer_id: data.form.customer_id.value,
            company_name: data.form.customer_name,
            purchase_date: data.form.purchase_date,
            delivery_date: data.form.delivery_date,
            user_id: rootState.auth.user.id,
            stockout_temp: data.stockout_temp
        }).then(response => {
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Added!'
            }, {root: true});
           console.log(response.data);

          response.data.item.forEach(item => {
            commit('item/UPDATE_ITEM', item, {root: true});
          });

          commit('UPDATE_STOCKOUT', response.data.stockout);
          commit('SET_STOCKOUT_TEMP', []);

        //   if(response.data.notification){
        //     commit('notification/NEW_NOTIFICATION', response.data.notification, {root: true});
        //   }

        }, () => {
          dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Something went wrong!'
          }, {root: true});
          
        });
    },

    async addStockoutTemp({commit, dispatch}, data) {
        
        const params = {
            item_id: data.item_id.value,
            item: data.item_id.label,
            qty: data.qty,
            unit: data.item_id.unit
        }

        const response = await axios.post('resources/check_item_availability', params);
        console.log(response.data);
        if(response.data == 200){
            commit('ADD_STOCKOUT_TEMP', [params]);
        }else{
            dispatch('notification/addNotification', {
            type: 'danger',
            message: 'Ops! Please check quantity availability!'
            }, {root: true});
        }
        
        
    },

    async removeStockoutTemp({commit}, id) {
        
        commit('REMOVE_STOCKOUT_TEMP', id);
    },

    async deleteStockout({commit, dispatch}, id) {
        const response = await axios.delete(`resources/delete_stockout/${id}`);
        if(response.data.status == 200){
            dispatch('notification/addNotification', {
                type: 'success',
                message: 'Successfully Deleted!'
            }, {root: true});
            
            response.data.items.forEach(item => {
                commit('item/UPDATE_ITEM', item, {root: true});
            })
            commit('REMOVE_STOCKOUT', id);
        }else{
            dispatch('notification/addNotification', {
                type: 'danger',
                message: 'Ops! Something went wrong!'
            }, {root: true});
        }
    },

  }
};
