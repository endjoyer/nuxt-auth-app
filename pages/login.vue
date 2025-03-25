<template>
  <LoginForm />
</template>

<script setup lang="ts">
import { definePageMeta } from '../.nuxt/imports';
import LoginForm from '../components/auth/LoginForm.vue';

definePageMeta({
  layout: 'auth',
});
</script>
