<template>
  <v-dialog v-model="show" @click:outside="emit('update:modelValue', false)">
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="9">
            <v-text-field v-model="tableName" label="Column name" variant="outlined"/>
          </v-col>
          <v-col>
            <v-btn block @click="addColumn()">Add</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue'
// import axios from 'axios'
// import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'

// import { API_URL } from '@/main.js'

// const store = useStore()
// const router = useRouter()

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const show = computed(() => props.modelValue)
const emit = defineEmits(['update:modelValue'])

const tableName = ref('')

function addColumn () {
  console.log('')
}
</script>

<style scoped>
div.v-dialog {
  margin-top: 30vh;
}
div.v-card {
  width: 600px;
  margin: auto;
}
button.v-btn {
  height: 55px;
}
</style>
