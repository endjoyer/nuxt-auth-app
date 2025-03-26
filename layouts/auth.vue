<template>
  <div class="page-wrapper">
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
.auth-container {
  width: 100%;
  max-width: 480px;
  padding: 0 1rem;
  margin: auto;
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
