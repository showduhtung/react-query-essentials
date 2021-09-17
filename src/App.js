import React, { useState } from "react";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import axios from "axios";

function Posts({ setPostId }) {
  const postsQuery = useQuery("posts", () =>
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.data)
  );
  return (
    <div>
      <h1>Posts</h1>
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
      {/* <MyPosts /> */}
      <ReactQueryDevtools />
    </div>
  );
}
