export interface User {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    username: string;
    password: string;
  }

export interface Recipe {
    id: number;
    userId: number;
    name: string;
    ingredients: string[];
  }
  