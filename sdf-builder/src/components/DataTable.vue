<template>
  <div class="table-scroll">
    <v-table>
      <thead>
        <tr>
          <th>
            Structure
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="mol in props.mols" :key="mol">
          <td @click="dataClicked(mol)">
            <div v-html="mol"></div>
          </td>
        </tr>
      </tbody>
    </v-table>
    <EditRowPopUp v-model="showEditRowPopUp" :mol="popUpMol"/>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'

import EditRowPopUp from '@/components/EditRowPopUp.vue'

const props = defineProps({
  mols: {
    type: Array,
    required: true
  }
})

const showEditRowPopUp = ref(false)
const popUpMol = ref('')
function dataClicked (mol) {
  showEditRowPopUp.value = true
  popUpMol.value = mol
}
</script>
