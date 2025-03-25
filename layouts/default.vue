<template>
  <div class="page-wrapper">
    <header class="main-header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <NuxtLink to="/">Auth App</NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <main class="page-content">
      <div class="container">
        <slot />
      </div>
    </main>

    <footer class="main-footer">
      <div class="container">
        <p>© {{ new Date().getFullYear() }} Auth App. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.main-header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: 700;

    a {
      color: #333;
      text-decoration: none;

      &:hover {
        color: #4a6cf7;
      }
    }
  }
}

.main-footer {
  margin-top: auto;
  background-color: #f8f9fa;
  padding: 1.5rem 0;
  border-top: 1px solid #eee;
  text-align: center;

  p {
    color: #666;
    font-size: 0.9rem;
  }
}
</style>
