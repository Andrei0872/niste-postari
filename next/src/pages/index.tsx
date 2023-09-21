import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const fetchPosts = (): Promise<Post[]> => {
  return fetch(POSTS_URL) 
    .then(r => r.json())
}

export default function Home() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    fetchPosts()
      .then(posts => setPosts(posts));
  }, []);

  console.log(posts);

  return (
    <div>
      <h2>Hello</h2>

      {
        posts?.length ? (
          <ul className={styles.postContainer}>
            {
              posts.map(p => (
                <li className={styles.post} key={p.id}>
                  <h3 className={styles.postTitle}>{p.title}</h3>
                  <div className={styles.postBody}>{p.body}</div>
                </li>
              ))
            }
          </ul>
        ) : <p>No posts yet.</p>
      }
    </div>
  )
}
