<template>
  <div class="account-header">
    <div class="user-info">
      <h2>{{ greeting }}</h2>
      <p>{{ user?.name }} {{ user?.surname }}</p>
    </div>
    <div class="account-actions">
      <button @click="logout" class="btn btn-danger">Выход</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const user = computed(() => authStore.user);

const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return 'Доброе утро!';
  } else if (hour < 18) {
    return 'Добрый день!';
  } else {
    return 'Добрый вечер!';
  }
});

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style lang="scss" scoped>
.account-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
}

.user-info {
  h2 {
    margin-bottom: 0.5rem;
    color: #333;
  }

  p {
    color: #666;
    font-size: 1.1rem;
  }
}
</style>

<script lang="ts">
export default defineComponent({
  name: 'AccountHeader',
});
</script>
