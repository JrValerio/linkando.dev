export interface ShortLink {
  slug: string;
  originalUrl: string;
  clicks: number;
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  role?: 'user' | 'admin'; // possível controle de permissões
}

export interface AuthSession {
  user: {
    name: string;
    email: string;
    image?: string;
  };
  expires: string;
}
