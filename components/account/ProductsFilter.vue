<template>
  <div class="filter-container">
    <h3 class="filter-title">Фильтры</h3>

    <div class="filter-row">
      <div class="filter-item">
        <label class="form-label">Поиск по названию:</label>
        <input
          type="text"
          v-model="searchQuery"
          class="form-control"
          placeholder="Введите название продукта"
          @input="applyFilters"
        />
      </div>

      <div class="filter-item">
        <label class="form-label">Категория:</label>
        <select
          v-model="selectedCategories"
          multiple
          class="form-control"
          @change="applyFilters"
        >
          <option
            v-for="category in availableCategories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>
    </div>

    <div class="filter-row mt-3">
      <div class="filter-item">
        <label class="form-label">Дата создания от:</label>
        <input
          type="date"
          v-model="dateFrom"
          class="form-control"
          @input="applyFilters"
        />
      </div>

      <div class="filter-item">
        <label class="form-label">Дата создания до:</label>
        <input
          type="date"
          v-model="dateTo"
          class="form-control"
          @input="applyFilters"
        />
      </div>

      <div class="filter-actions">
        <button @click="resetFilters" class="btn btn-secondary">
          Сбросить фильтры
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, defineComponent } from 'vue';
import { useProductsStore } from '../../stores/products';

const productsStore = useProductsStore();

const searchQuery = ref('');
const selectedCategories = ref<string[]>([]);
const dateFrom = ref('');
const dateTo = ref('');

const availableCategories = computed(() => productsStore.availableCategories);

const applyFilters = () => {
  productsStore.setSearchQuery(searchQuery.value);
  productsStore.setCategoryFilter(selectedCategories.value);
  productsStore.setDateFilter(dateFrom.value, dateTo.value);
};

const resetFilters = () => {
  searchQuery.value = '';
  selectedCategories.value = [];
  dateFrom.value = '';
  dateTo.value = '';
  productsStore.resetFilters();
};

onMounted(() => {
  if (productsStore.filters) {
    searchQuery.value = productsStore.filters.searchQuery;
    selectedCategories.value = [...productsStore.filters.categories];
    dateFrom.value = productsStore.filters.dateRange.from;
    dateTo.value = productsStore.filters.dateRange.to;
  }
});
</script>

<style lang="scss" scoped>
.filter-title {
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.2rem;
}

.filter-actions {
  display: flex;
  align-items: flex-end;
  margin-left: auto;
}

@media (max-width: 768px) {
  .filter-actions {
    margin-top: 1rem;
    margin-left: 0;
  }
}
</style>

<script lang="ts">
export default defineComponent({
  name: 'ProductsFilter',
});
</script>
