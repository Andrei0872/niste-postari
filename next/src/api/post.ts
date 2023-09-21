export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const POSTS_URL = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/post`;
export const fetchPosts = (): Promise<Post[]> => {
  return fetch(POSTS_URL) 
    .then(r => {
      // TODO: might not always want to do this.
      // Maybe using a fetching library, such as axios, would help.
      if (!r.ok) {
        return r.json().then(err => Promise.reject(err))
      }

      return r.json();
    })
}