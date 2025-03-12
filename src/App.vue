<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const showLayout = computed(() => route.meta?.layout !== 'none');
</script>

<template>
  <Header v-if="showLayout" />
  <router-view />
  <Footer v-if="showLayout" />
</template>

<style scoped></style>
