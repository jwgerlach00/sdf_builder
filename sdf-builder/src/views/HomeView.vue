<template>
  <v-container>
    <v-row>
      <v-col class="text-right">
        <v-btn-toggle>
          <v-btn @click="router.push('tables')">
            <v-icon icon="mdi-grid"/>
          </v-btn>
          <v-btn @click="logout()">
            <v-icon icon="mdi-logout-variant"/>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <!-- Title -->
        <v-img src="bob-builder.png" class="bob-builder"/>
        <h1 class="title">SDF Builder</h1>
        <br>
        <br>

        <v-row>
          <!-- Draw window -->
          <v-col cols="6">
            <KetcherDraw ref="ketcherDraw"/>
            <v-btn height="50px" block @click="addMol()">Add to table</v-btn>
          </v-col>

          <!-- Table -->
          <v-col cols="6">
            <v-row>
              <v-col>
                <DataTable :mols="mols"/>
                <!-- <v-btn @click='showAddColumnPopUp=true'>Add column</v-btn> -->
                <AddColumnPopUp v-model="showAddColumnPopUp"/>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <v-btn @click="downloadSDF()">Download SDF</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- <KetcherDraw /> -->
  </v-container>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import axios from 'axios'
import { API_URL } from '@/main.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import KetcherDraw from '@/components/KetcherDraw.vue'
import DataTable from '@/components/DataTable.vue'
import AddColumnPopUp from '@/components/AddColumnPopUp.vue'

const router = useRouter()
const store = useStore()

onBeforeMount(() => {
  axios.get(`${API_URL}/is_authenticated`).catch(e => {
    if (e.response.status === 401) {
      router.push({ name: 'login' })
    }
  })
})

const showAddColumnPopUp = ref(false)

const mols = ref(store.getters.tableData)

const ketcherDraw = ref(null)
const smi = ref('')

async function addMol () {
  smi.value = await ketcherDraw.value.getSmiles()
  console.log(store.getters.tableName)
  axios.post(`${API_URL}/add_mol_to_table`, { smi: smi.value, table_name: store.getters.tableName }).then(res => {
    mols.value = res.data
    console.log(res.data)
  }).catch(e => {
    console.log(e)
  })
}

function logout () {
  axios.get(`${API_URL}/logout`)
  router.push({ name: 'login' })
}

function downloadSDF () {
  axios.post(`${API_URL}/download_sdf`, { table_name: store.getters.tableName }).then(res => {
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0') // Jan is 0!
    const yyyy = today.getFullYear()

    const blob = new Blob([res.data], { type: 'text/plain' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = `${mm}_${dd}_${yyyy}_${store.getters.tableName}.sdf`
    link.click()
  }).catch(e => {
    console.log(e)
  })
}

</script>

<style scoped>
div.v-img.bob-builder {
  margin-right: 10px;
  display: inline-block;
  width: 50px;
  vertical-align: middle;
}
h1.title {
  display: inline-block;
  margin: 0;
  vertical-align: middle;
  font-size:50pt;
}
</style>
