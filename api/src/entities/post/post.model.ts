export interface Post {
  id: number;
  title: string;
  body: string;
  image_url: string;
  poster_id: number;
}

export type CreatePostData = Omit<Post, 'id'>;