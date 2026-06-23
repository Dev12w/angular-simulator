import { IPost } from './IPost';

export type PostCreateRequest = Omit<IPost, "id">
export type PostUpdateRequest = Omit<Partial<IPost>, "id">
