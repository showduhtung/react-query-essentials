import React, { useEffect, useReducer } from 'react'
import { queryCache, useQuery } from 'react-query'
import axios from 'axios'

const fetchPosts = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.data.slice(0, 10))
}

export default function App() {
  const [show, toggle] = useReducer(d => !d, false)
  useEffect(() => {
    queryCache.prefetchQuery('posts', fetchPosts)
  }, [])
  return (
    <div>
      <button onClick={toggle}>{!show ? 'Show' : 'Hide'} Posts</button>
      {show && <Posts />}
    </div>
  )
}

function Posts({ setPostId }) {
  const postsQuery = useQuery('posts', fetchPosts)
  return (
    <div>
      <h1>Posts {postsQuery.isFetching && '...'}</h1>
      <div>
        {postsQuery.isLoading ? (
          'Loading posts...'
        ) : (
          <ul>
            {postsQuery.data.map(post => (
              <li key={post.id}>
                <a onClick={() => setPostId(post.id)} href="#">
                  {post.title}{' '}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
