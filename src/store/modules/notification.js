
export default {
    namespaced: true,
    state: {
      notifications: [],
    },
    getters: {
      notifications(state) {
        return state.notifications;
      },
    },
    mutations: {
      PUSH_NOTIFICATION(state, notification) {
          state.notifications.push({
              ...notification,
              id: (Math.random().toString(36) + Date.now().toString(36)).substr(2)
          });
        },
    },
    actions: {
      addNotification({commit}, notification){
          commit('PUSH_NOTIFICATION', notification);
      }
    }
  };
  