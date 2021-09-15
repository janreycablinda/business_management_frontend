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
    async importItem({dispatch}, data) {
        await axios.post('resources/import_item', data.formData, data.config).then(response => {
            console.log(response.data);
            if(response.status == 200){
                dispatch('notification/addNotification', {
                    type: 'success',
                    message: 'Successfully Imported!'
                }, {root: true});
            }
        })
        .catch(() => {
            dispatch('notification/addNotification', {
                type: 'danger',
                message: 'Ops something went wrong!'
            }, {root: true});
        });
       
    },
  }
};
