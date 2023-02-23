<script setup>
import { ref } from 'vue'
// import HelloWorld from '../../components/HelloWorld.vue'
const url = import.meta.env
const msg = ref(url)
</script>

<template>
  <main>
    this is pagetwo
    <!-- <HelloWorld /> -->
    {{ msg }}
  </main>
</template>
