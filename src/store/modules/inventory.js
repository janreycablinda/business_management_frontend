import axios from "axios";

export default {
  namespaced: true,
  state: {
    inventory: null,
    stockout: null
  },
  getters: {
    inventory(state) {
      return state.inventory;
    },
    stockout(state) {
        return state.stockout;
    },
  },
  mutations: {
    SET_INVENTORY(state, data) {
        state.inventory = data;
    },
    SET_STOCKOUT(state, data) {
        state.stockout = data;
    },
  },
  actions: {
    async findInventory({commit}, data) {
       
        await axios.get(`resources/find_inventory/date?beginning=${data.beginning}&ending=${data.ending}`).then(response => {
            commit('SET_INVENTORY', response.data.items);
            commit('SET_STOCKOUT', response.data.stockout_temp);
            console.log(response.data);
        });
    },
  }
};
