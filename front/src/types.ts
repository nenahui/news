export interface News {
  id: string;
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
  id: string;
  news_id: string;
  author: string | null;
  text: string;
}

export type CommentMutation = Omit<Comment, 'id'>;

export interface NewsDetails {
  newsInfo: News;
  comments: Comment[];
}
