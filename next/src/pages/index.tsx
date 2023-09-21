import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import { Post, fetchPosts } from '../api/post'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/router'

export default function Home() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  const router = useRouter();

  useEffect(() => {
    fetchPosts()
      .then(posts => setPosts(posts))
      .catch(err => {
        if (err?.statusCode === 401) {
          router.replace('/auth');
        }
      });
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
