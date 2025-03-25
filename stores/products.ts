import { defineStore } from 'pinia';

// Определяем типы напрямую
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  date_created: string;
}

interface ProductFilters {
  dateRange: {
    from: string;
    to: string;
  };
  categories: string[];
  searchQuery: string;
}

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    loading: false,
    error: null as string | null,
    filters: {
      dateRange: {
        from: '',
        to: '',
      },
      categories: [] as string[],
      searchQuery: '',
    } as ProductFilters,
    availableCategories: [] as string[],
  }),

  getters: {
    filteredProducts(): Product[] {
      return this.products.filter((product) => {
        if (
          this.filters.searchQuery &&
          !product.name
            .toLowerCase()
            .includes(this.filters.searchQuery.toLowerCase())
        ) {
          return false;
        }

        if (
          this.filters.categories.length > 0 &&
          !this.filters.categories.includes(product.category)
        ) {
          return false;
        }

        if (this.filters.dateRange.from || this.filters.dateRange.to) {
          const productDateISO = convertDateStringToISO(product.date_created);
          const productDate = new Date(productDateISO);

          if (this.filters.dateRange.from) {
            const fromDate = new Date(this.filters.dateRange.from);
            if (productDate < fromDate) return false;
          }

          if (this.filters.dateRange.to) {
            const toDate = new Date(this.filters.dateRange.to);
            if (productDate > toDate) return false;
          }
        }

        return true;
      });
    },
  },

  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch('/data/products.json');
        this.products = await response.json();

        this.availableCategories = Array.from(
          new Set(this.products.map((product) => product.category))
        );
      } catch (error: any) {
        console.error('Ошибка при загрузке продуктов:', error);
        this.error = 'Не удалось загрузить список продуктов. Попробуйте позже.';
      } finally {
        this.loading = false;
      }
    },

    resetFilters() {
      this.filters = {
        dateRange: {
          from: '',
          to: '',
        },
        categories: [],
        searchQuery: '',
      };
    },

    setDateFilter(from: string, to: string) {
      this.filters.dateRange = { from, to };
    },

    setCategoryFilter(categories: string[]) {
      this.filters.categories = categories;
    },

    setSearchQuery(query: string) {
      this.filters.searchQuery = query;
    },
  },
});

function convertDateStringToISO(dateString: string): string {
  // Парсим дату из формата "dd.mm.yyyy hh:mm:ss"
  const [datePart, timePart] = dateString.split(' ');
  const [day, month, year] = datePart.split('.');

  // Формируем ISO строку (yyyy-mm-ddThh:mm:ss)
  return `${year}-${month}-${day}T${timePart || '00:00:00'}`;
}
