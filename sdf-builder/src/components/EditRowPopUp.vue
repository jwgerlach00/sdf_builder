<template>
  <v-dialog v-model="show" @click:outside="emit('update:modelValue', false)">
    <v-card>
      <v-row>
        <v-col>
          <div v-html="mol"></div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn>Remove</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineProps, computed, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  mol: {
    type: Boolean,
    required: true
  }
})
const show = computed(() => props.modelValue)

const emit = defineEmits(['update:modelValue'])
</script>
