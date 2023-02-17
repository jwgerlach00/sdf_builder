import { createStore } from 'vuex'
import _ from 'lodash'

export default createStore({
  state: {
    tableData: []
  },
  getters: {
    tableData: state => _.cloneDeep(state.tableData)
  },
  mutations: {
    tableData (state, tableData) {
      state.tableData = tableData
    }
  },
  actions: {
  },
  modules: {
  }
})
