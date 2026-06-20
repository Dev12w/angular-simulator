import { IPost } from './IPost';

export type PostCreateBody = Omit<IPost, "id">
export type PostUpdateBody = Omit<Partial<IPost>, "id">
