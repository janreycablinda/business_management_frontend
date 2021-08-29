import axios from "axios";

export default {
  namespaced: true,
  state: {
    unit: null,
  },
  getters: {
    units(state) {
      return state.unit;
    },
  },
  mutations: {
    SET_UNIT(state, data) {
        state.unit = data;
    },
  },
  actions: {
    async fetchUnit({commit}) {
        const response = await axios.get(`resources/units`);

        commit('SET_UNIT', response.data);
    },
  }
};
