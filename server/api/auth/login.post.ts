import { defineEventHandler, readBody } from 'h3';
import fs from 'fs';
import path from 'path';
import md5 from 'md5';

interface LoginRequest {
  username: string;
  password: string;
}

interface UserCredentials {
  username: string;
  passphrase: string;
}

interface User {
  name: string;
  surname: string;
  credentials: UserCredentials;
  active: boolean;
  created: string;
  _comment?: string;
}

const usersFilePath = path.resolve('./server/data/users.json');

export default defineEventHandler(async (event) => {
  try {
    const { username, password } = await readBody<LoginRequest>(event);

    if (!username || !password) {
      return {
        success: false,
        message: 'Необходимо указать логин и пароль',
      };
    }

    const usersData = fs.readFileSync(usersFilePath, 'utf-8');
    const users: User[] = JSON.parse(usersData);

    const user = users.find((u) => u.credentials.username === username);

    if (!user || !user.active) {
      return {
        success: false,
        message: 'Введены неверные данные авторизации. Попробуйте ещё раз',
      };
    }

    const hashedPassword = md5(password);
    if (hashedPassword !== user.credentials.passphrase) {
      return {
        success: false,
        message: 'Введены неверные данные авторизации. Попробуйте ещё раз',
      };
    }

    return {
      success: true,
      user: {
        name: user.name,
        surname: user.surname,
        username: user.credentials.username,
        created: user.created,
      },
    };
  } catch (error) {
    console.error('Ошибка при авторизации:', error);
    return {
      success: false,
      message:
        'Произошла ошибка при авторизации. Пожалуйста, попробуйте позже.',
    };
  }
});
