import { createStore } from 'vuex'
import _ from 'lodash'

export default createStore({
  state: {
    tableData: [],
    tableName: ''
  },
  getters: {
    tableData: state => _.cloneDeep(state.tableData),
    tableName: state => _.cloneDeep(state.tableName)
  },
  mutations: {
    tableData (state, tableData) {
      state.tableData = tableData
    },
    tableName (state, tableName) {
      state.tableName = tableName
    }
  },
  actions: {
  },
  modules: {
  }
})
