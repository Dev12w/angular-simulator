import { IPost } from './IPost';

export type IPostCreateRequest = Omit<IPost, "id">
export type IPostUpdateRequest = Omit<Partial<IPost>, "id">
