<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>My saved tables</h1>
      </v-col>
    </v-row>
    <v-row style="text-align:left">
      <v-col>
        <v-btn @click="showAddTablePopUp=true">
          <v-icon icon="mdi-plus-circle-outline"/>
          <p>New table</p>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-card v-for="table in savedTables" :key="table">
        <v-card-title @click="getTable(table)">{{ table }}</v-card-title>
      </v-card>
    </v-row>
    <AddTablePopUp v-model="showAddTablePopUp"/>
  </v-container>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import { API_URL } from '@/main.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import AddTablePopUp from '@/components/AddTablePopUp.vue'

const router = useRouter()
const store = useStore()

const savedTables = ref({ tables: [] })
const showAddTablePopUp = ref(false)

function getSavedTables () {
  axios.get(`${API_URL}/get_saved_tables`).then(res => {
    savedTables.value = res.data
    console.log(savedTables.value)
  }).catch(e => {
    console.log(e)
  })
}

onBeforeMount(() => {
  getSavedTables()
})

// function newTable () {
//   store.commit('tableData', [])
//   router.push({ name: 'home' })
// }

function getTable (table) {
  axios.post(`${API_URL}/table_by_name`, { table_name: table }).then(res => {
    store.commit('tableData', res.data)
    store.commit('tableName', table)
    router.push({ name: 'home' })
  }).catch(e => {
    console.log(e)
  })
}
</script>

<style scoped>
div.v-card {
  margin: 10px;
}
div.v-card:hover {
  /* border-color: #f8f8f2; */
  /* border-width: 0.5px; */
  scale: 1.01;
}
div.v-card-title {
  color: #f8f8f2;
  padding: 30px;
  font-size: 30pt;
}
div.v-card-title:hover {
  color: #FF6D00;
  border-color: #f8f8f2;
  border-width: 5px;
  opacity: 100%;
}
h1 {
  font-size: 40pt;
  /* text-align: center; */
}
button.v-btn {
  height: 55px;
  width: 300px;
  font-size: 14pt;
}
</style>
