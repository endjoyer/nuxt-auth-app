<template>
  <div class="auth-layout">
    <div class="auth-container">
      <div class="auth-logo">
        <h1>Auth App</h1>
      </div>

      <div class="auth-card">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f8fa;
}

.auth-container {
  width: 100%;
  max-width: 480px;
  padding: 0 1rem;
}

.auth-logo {
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    color: #333;
  }
}
</style>
