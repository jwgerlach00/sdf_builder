<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>My saved tables</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="newTable()">
          <v-icon icon="mdi-file-plus"/>
          <p>New table</p>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-card v-for="table in savedTables" :key="table">
        <v-card-title @click="getTable(table)">{{ table }}</v-card-title>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import { API_URL } from '@/main.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const savedTables = ref({ tables: [] })

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

function newTable () {
  store.commit('tableData', [])
  router.push({ name: 'home' })
}

function getTable (table) {
  axios.post(`${API_URL}/table_by_name`, { table_name: table }).then(res => {
    store.commit('tableData', res.data)
    router.push({ name: 'home' })
  }).catch(e => {
    console.log(e)
  })
}
</script>

<style scoped>
div.v-card:hover {
  border-color: #f8f8f2;
  border-width: 0.5px;
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
  text-align: center;
}
</style>
