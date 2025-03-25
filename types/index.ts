export interface User {
  name: string;
  surname: string;
  credentials: {
    username: string;
    passphrase: string;
  };
  active: boolean;
  created: string;
  _comment?: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  date_created: string;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  loginError: string | null;
}

export interface ProductFilters {
  dateRange: {
    from: string;
    to: string;
  };
  categories: string[];
  searchQuery: string;
}
