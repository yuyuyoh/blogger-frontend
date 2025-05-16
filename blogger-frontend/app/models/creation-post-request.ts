import { Post } from '../data/post';

export type CreationPostRequest = Omit<Post, 'id' | 'createdDate' | 'category'> & {
  categoryId: string;
};
