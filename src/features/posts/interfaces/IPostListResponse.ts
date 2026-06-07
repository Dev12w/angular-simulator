import { IPost } from './IPost';

export interface IPostListResponse {
  posts: IPost[];
  total: number;
  limit: number;
  skip: number;
}
