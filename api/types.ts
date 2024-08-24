export interface News {
  id: number;
  title: string;
  content: string;
  image: string | null;
  createdAt: string;
}

export type NewsMutation = Omit<News, 'id' | 'createdAt'>;

export interface Comment {
  id: number;
  news_id: string;
  author: string | null;
  text: string;
}

export type CommentMutation = Omit<Comment, 'id'>;
