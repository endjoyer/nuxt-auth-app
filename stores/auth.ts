import { defineStore } from 'pinia';
import md5 from 'md5';

interface Credentials {
  username: string;
  passphrase: string;
}

export interface User {
  name: string;
  surname: string;
  credentials: Credentials;
  active: boolean;
  created: string;
  _comment?: string;
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  loginError: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isLoggedIn: false,
    loginError: null,
  }),

  actions: {
    // Метод для авторизации пользователя
    async login(username: string, password: string) {
      try {
        this.loginError = null;
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!data.success) {
          this.loginError = data.message;
          return false;
        }

        this.user = data.user;
        this.isLoggedIn = true;

        localStorage.setItem(
          'auth',
          JSON.stringify({
            isLoggedIn: true,
            user: this.user,
          })
        );

        return true;
      } catch (error) {
        console.error('Ошибка при авторизации:', error);
        this.loginError =
          'Произошла ошибка при авторизации. Пожалуйста, попробуйте позже.';
        return false;
      }
    },

    logout() {
      this.user = null;
      this.isLoggedIn = false;
      localStorage.removeItem('auth');
    },

    initAuth() {
      if (process.client) {
        const savedAuth = localStorage.getItem('auth');
        if (savedAuth) {
          try {
            const parsedAuth = JSON.parse(savedAuth);
            this.user = parsedAuth.user;
            this.isLoggedIn = parsedAuth.isLoggedIn;
          } catch (e) {
            console.error('Ошибка при восстановлении сессии:', e);
            this.logout();
          }
        }
      }
    },
  },
});
