<template>
  <v-container>
    <v-row>
      <v-btn @click="logout()">Logout</v-btn>
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
            <DataTable :mols="mols"/>
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

const router = useRouter()
const store = useStore()

onBeforeMount(() => {
  axios.get(`${API_URL}/is_authenticated`).catch(e => {
    if (e.response.status === 401) {
      router.push({ name: 'login' })
    }
  })
})

const mols = ref(store.getters.tableData)

const ketcherDraw = ref(null)
const smi = ref('')

async function addMol () {
  smi.value = await ketcherDraw.value.getSmiles()
  console.log(smi.value)
  console.log('ape')
  axios.post(`${API_URL}/add_mol_to_table`, { smi: smi.value }).then(res => {
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
