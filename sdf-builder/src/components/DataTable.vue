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
          <td>
            <div v-html="mol"></div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  mols: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
div.table-scroll {
  max-height: 500px;
  overflow: auto;
  display: block;
  border-radius: 10px;
}
div.v-table {
  border: 10pt;
}
</style>
