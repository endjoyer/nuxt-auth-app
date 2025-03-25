<template>
  <div class="table-container">
    <div v-if="loading" class="loading-indicator">Загрузка продуктов...</div>

    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-else-if="!filteredProducts.length" class="no-data">
      <p>Нет продуктов, соответствующих выбранным фильтрам</p>
    </div>

    <template v-else>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Категория</th>
            <th>Цена</th>
            <th>Наличие</th>
            <th>Статус</th>
            <th>Дата создания</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filteredProducts" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>${{ product.price.toFixed(2) }}</td>
            <td>{{ product.stock }}</td>
            <td>
              <span
                :class="[
                  'badge',
                  product.status === 'In Stock'
                    ? 'badge-success'
                    : 'badge-danger',
                ]"
              >
                {{ product.status }}
              </span>
            </td>
            <td>{{ product.date_created }}</td>
          </tr>
        </tbody>
      </table>

      <div class="table-summary">
        Показано {{ filteredProducts.length }} из {{ totalProducts }} продуктов
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, defineComponent } from 'vue';
import { useProductsStore } from '../../stores/products';

const productsStore = useProductsStore();

const loading = computed(() => productsStore.loading);
const error = computed(() => productsStore.error);
const filteredProducts = computed(() => productsStore.filteredProducts);
const totalProducts = computed(() => productsStore.products.length);

onMounted(async () => {
  await productsStore.fetchProducts();
});
</script>

<style lang="scss" scoped>
.loading-indicator,
.no-data {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.table-summary {
  margin-top: 1rem;
  text-align: right;
  color: #666;
  font-size: 0.9rem;
}
</style>

<script lang="ts">
export default defineComponent({
  name: 'ProductsTable',
});
</script>
