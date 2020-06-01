import Vue from 'vue'
import Vuex from 'vuex'
import { ProductStore } from './ProductStore'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    ProductStore
  }
})

export default store
