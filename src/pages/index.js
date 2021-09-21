import React from 'react'
import { useQuery, queryCache } from 'react-query'
import axios from 'axios'

const fetchPosts = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.data.slice(0, 10))
}

const fetchPost = async postId => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(res => res.data)
}

export default function App() {
  const [postId, setPostId] = React.useState(-1)

  return (
    <div>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
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
              <li
                key={post.id}
                onMouseEnter={() =>
                  queryCache.prefetchQuery(
                    ['post', post.id],
                    () => fetchPost(post.id),
                    {
                      staleTime: Infinity,
                    }
                  )
                }
              >
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

function Post({ postId, setPostId }) {
  const postQuery = useQuery(['post', postId], () => fetchPost(postId), {
    staleTime: 60 * 1000,
  })

  return (
    <div>
      <a onClick={() => setPostId(-1)} href="#">
        Back
      </a>
      <br />
      <br />
      {postQuery.isLoading ? (
        'Loading...'
      ) : (
        <>
          {postQuery.data.title}
          <br />
          <br />
          {postQuery.isFetching ? 'Updating...' : null}
        </>
      )}
    </div>
  )
}
