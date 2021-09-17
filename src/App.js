import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import axios from "axios";
import existingUser from "./existingUser";

// user email:
// https://jsonplaceholder.typicode.com/users?email=${email}

// https://jsonplaceholder.typicode.com/posts?userId=${userId}

const email = "Sincere@april.biz";

function MyPosts() {
  const userQuery = useQuery(
    "user",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return axios
        .get(`https://jsonplaceholder.typicode.com/users?email=${email}`)
        .then((res) => res.data[0]);
    },
    {
      initialData: existingUser,
      initialStale: true,
    }
  );

  return userQuery.isLoading ? (
    "Loading user..."
  ) : (
    <div>
      <pre>{JSON.stringify(userQuery.data, null, 2)}</pre>
      {userQuery.isFetching && "Updating..."}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <MyPosts />
      <ReactQueryDevtools />
    </div>
  );
}
