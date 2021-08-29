import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth";
import notification from "./modules/notification";
import unit from "./modules/unit";
import group from "./modules/group";
import item from "./modules/item";

Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  darkMode: false,
  asideShow: false
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  toggle (state, variable) {
    state[variable] = !state[variable]
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions: {},
  modules: {
    auth,
    notification,
    unit,
    group,
    item
  }
});
