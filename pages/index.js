import React from 'react'
import { useQuery, useMutation, queryCache } from 'react-query'
import Link from 'next/link'
import axios from 'axios'
import PostForm from '../components/PostForm'

export default function Posts() {
  const postsQuery = useQuery('posts', () =>
    axios.get('/api/posts').then(res => res.data)
  )

  const makePosts = async values => await axios.post('api/posts', values)
  const [createPost, createPostInfo] = useMutation(makePosts, {
    onError: error => {
      window.alert(error.response.data.message)
    },
    onSettled: () => {
      // will run onSuccess or onError
      queryCache.invalidateQueries('posts')
    },
  })

  return (
    <section>
      <div>
        <div>
          {postsQuery.isLoading ? (
            <span>Loading... </span>
          ) : (
            <>
              <h3>
                Posts {postsQuery.isFetching ? <small>...</small> : null}
              </h3>
              <ul>
                {postsQuery.data.map(post => (
                  <Link href="/[postId]" as={`/${post.id}`}>
                    <a>
                      <li key={post.id}>{post.title}</li>
                    </a>
                  </Link>
                ))}
              </ul>
              <br />
            </>
          )}
        </div>
      </div>
      <div>
        <h3>Create New Post</h3>
        <div>
          <PostForm
            onSubmit={createPost}
            clearOnSubmit
            submitText={
              createPostInfo.isLoading
                ? 'Saving...'
                : createPostInfo.isError
                ? 'Error!'
                : createPostInfo.isSuccess
                ? 'Saved!'
                : 'Create Post'
            }
          />
          {createPostInfo.isError && (
            <pre>{createPostInfo.error.response.data.message}</pre>
          )}
        </div>
      </div>
    </section>
  )
}
