import axios from "axios";


export default {
  namespaced: true,
  state: {
    token: null,
    user: null
  },
  getters: {
    authenticated(state) {
      return state.token && state.user;
    },

    user(state) {
      return state.user;
    },

    token(state) {
      return state.token;
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, data) {
      state.user = data;
    }
  },
  actions: {
    async signIn({ dispatch }, credetials) {
      let response = await axios.post("auth/login", credetials);
      if(response.status == 200){
        dispatch('notification/addNotification', {
            type: 'success',
            message: 'Successfully Login!'
        }, {root: true});
      }
      return dispatch("attempt", response.data.access_token);
    },

    async attempt({commit, state }, token) {

      if (token) {
        commit("SET_TOKEN", token);
      }
    
      if (!state.token) {
        return;
      }

      try {
        let response = await axios.get("auth/me");
        commit("SET_USER", response.data);
      } catch (e) {
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
      }
    },

    async refetchUser({commit, state, dispatch }, token) {

      if (token) {
        commit("SET_TOKEN", token);
      }
      if (!state.token) {
        return;
      }

      try {
        let response = await axios.get("auth/me");
        commit("SET_USER", response.data);
        dispatch('permission/fetchPermission', {}, {root: true});
      } catch (e) {
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
      }
    },

    async updateuser({ commit }) {
      try {
        let response = await axios.get("auth/me");
        commit("SET_USER", response.data);
      } catch (e) {
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
      }
    },

    async changepassword({state}, data) {
      return new Promise((resolve, reject) => {
          axios.post("auth/change_password", {
            password: data.password,
            id: state.user.id
          }).then(response => {
                resolve(response.data);
            }, error => {
                reject(error);
            });
      })
    },

    async forgotpassword(data) {
      return new Promise((resolve, reject) => {
        axios.post("auth/request_password", data).then(response => {
              resolve(response.data);
          }, error => {
              reject(error);
          });
        })
    },

    async check_verification(data) {
      return new Promise((resolve, reject) => {
        axios.post("auth/check_verification_code", data).then(response => {
              resolve(response.data);
          }, error => {
              reject(error);
          });
        })
    },

    async checkValidSignature(data) {
      let response = await axios.post("auth/check_signature", data);
      console.log(response.data);
    },

    async changeForgotPassword(data){
      return new Promise((resolve, reject) => {
      axios.post("auth/change_forgot_password", data).then(response => {
            resolve(response.data);
        }, error => {
            reject(error);
        });
      })
    },

    signOut({ commit, dispatch }) {
      return axios.post("auth/logout").then(() => {
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
        dispatch('notification/addNotification', {
            type: 'success',
            message: 'Successfully Logout!'
        }, {root: true});
      });
    }
  }
};
