<template>
  <div>
    <iframe ref="ketcherFrame" class="ketcher-frame" src="ketcher/index.html" style="disabled:true"></iframe>
  </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue'

const ketcherFrame = ref(null) // iframe template ref

function getSmiles () {
  return ketcherFrame.value.contentWindow.ketcher.getSmiles()
}

defineExpose({ getSmiles })
</script>

<style scoped>
iframe.ketcher-frame {
  width: 100%;
  min-height: 450px;
  border: none;
  overflow: hidden;
  border-radius: 10px;
}
</style>
