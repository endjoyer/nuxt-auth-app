<template>
  <div>
    <h1>Добро пожаловать в Auth App</h1>
    <p>Пожалуйста, авторизуйтесь для доступа к системе.</p>

    <div class="buttons-wrapper">
      <NuxtLink to="/login" class="btn btn-primary">Войти в систему</NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  margin-bottom: 1rem;
}

p {
  margin-bottom: 2rem;
}

.buttons-wrapper {
  display: flex;
  gap: 1rem;
}
</style>
