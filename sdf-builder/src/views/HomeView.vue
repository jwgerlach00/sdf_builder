<template>
  <v-container>
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
            <v-btn @click="test()">Test</v-btn>
          </v-col>

          <!-- Table -->
          <v-col cols="6">
            <DataTable/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- <KetcherDraw /> -->
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { API_URL } from '@/main.js'

import KetcherDraw from '@/components/KetcherDraw.vue'
import DataTable from '@/components/DataTable.vue'

function test () {
  axios.get(`${API_URL}/print_crap`)
}

const ketcherDraw = ref(null)
const smi = ref('')

async function addMol () {
  smi.value = await ketcherDraw.value.getSmiles()
  console.log(smi.value)
  console.log('ape')
  axios.get(`${API_URL}/init_db`)
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
