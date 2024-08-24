export interface News {
  id: number;
  title: string;
  content: string;
  image: string | null;
  createdAt: string;
}

export interface NewsMutation {
  title: string;
  content: string;
  image: File | null;
}

export interface Comment {
  id: number;
  news_id: number;
  author: string | null;
  text: string;
  createdAt: string;
}

export type CommentMutation = Omit<Comment, 'id' | 'createdAt'>;

export interface NewsDetails {
  newsInfo: News;
  comments: Comment[];
}
