<template>
  <div class="account-page">
    <AccountHeader />

    <section class="account-section">
      <h2 class="section-title">Список продуктов</h2>

      <ProductsFilter />
      <ProductsTable />
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import AccountHeader from '../components/account/AccountHeader.vue';
import ProductsFilter from '../components/account/ProductsFilter.vue';
import ProductsTable from '../components/account/ProductsTable.vue';

const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  if (!authStore.isLoggedIn) {
    router.push('/login');
  }
});
</script>

<style lang="scss" scoped>
.account-page {
  padding: 1rem 0;
}

.section-title {
  margin-bottom: 1.5rem;
  color: #333;
}

.account-section {
  margin-bottom: 3rem;
}
</style>
