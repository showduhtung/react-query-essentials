/* eslint-disable no-use-before-define */
import React, { useReducer, useState } from "react";
import { useQuery, queryCache } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import axios from "axios";

const fetchPosts = async () => {
  const posts = await axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.data);
  posts.forEach((post) => {
    queryCache.setQueryData(["post", post.id], post);
  });
  return posts;
};

function Posts({ setPostId }) {
  const [count, increment] = useReducer((d) => d + 1, 0);

  const postsQuery = useQuery("posts", fetchPosts, {
    onSuccess: (data) => increment(),
    onError: (error) => {},
    onSettled: (data, error) => {},
  });

  return (
    <div>
      <h1>
        Posts {postsQuery.isFetching && "..."} {count}
      </h1>
      <div>
        {postsQuery.isLoading ? (
          "Loading posts..."
        ) : (
          <ul>
            {postsQuery.data.map((post) => {
              return (
                <li key={post.id}>
                  <a onClick={() => setPostId(post.id)} href="#">
                    {post.title}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function Post({ postId, setPostId }) {
  const postQuery = useQuery(
    ["post", postId],
    () =>
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then((res) => res.data),
    {
      enabled: postId > -1,
    }
  );
  return (
    <div>
      <button onClick={() => setPostId(-1)}>Back</button>
      <br />
      <br />
      {postQuery.isLoading ? "Loading... " : postQuery.data.title}
      <br />
      <br />
      {postQuery.isFetching && "Updating..."}
    </div>
  );
}

export default function App() {
  const [postId, setPostId] = useState(-1);
  return (
    <div>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
      <ReactQueryDevtools />
    </div>
  );
}
