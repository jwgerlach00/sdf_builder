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
