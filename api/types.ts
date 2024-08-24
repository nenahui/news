export interface News {
  id: string;
  title: string;
  content: string;
  image: string | null;
  createdAt: string;
}

export type NewsMutation = Omit<News, 'id' | 'createdAt'>;
