export interface Post {
  id: number;
  title: string;
  body: string;
  image_url: string;
  poster_id: number;
}

export type CreatePostData = Omit<Post, 'id'>;


export interface GetAllPostsQueryParams {
  // TODO: might use a pipe do directly convert them
  // into numbers.
  per_page?: string;
  last_saw_id?: string;
}