<template>
  <div class="login-form">
    <h2 class="form-title">Вход в систему</h2>

    <div v-if="loginError" class="alert alert-danger">
      {{ loginError }}
    </div>

    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username" class="form-label">Логин:</label>
        <input
          id="username"
          v-model="username"
          type="email"
          class="form-control"
          placeholder="Введите ваш логин"
          required
        />
      </div>

      <div class="form-group">
        <label for="password" class="form-label">Пароль:</label>
        <input
          id="password"
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Введите ваш пароль"
          required
        />
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary" :disabled="isLoading">
          {{ isLoading ? 'Вход...' : 'Войти' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const username = ref('');
const password = ref('');
const isLoading = ref(false);

const router = useRouter();
const authStore = useAuthStore();

const loginError = computed(() => authStore.loginError);

const handleLogin = async () => {
  if (!username.value || !password.value) return;

  isLoading.value = true;

  try {
    const success = await authStore.login(username.value, password.value);

    if (success) {
      router.push('/account');
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form-title {
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
}

.form-actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
}
</style>

<script lang="ts">
export default defineComponent({
  name: 'LoginForm',
});
</script>
