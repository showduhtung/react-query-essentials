import { useQuery } from "react-query";
import axios from "axios";
import { ReactQueryDevtools } from "react-query-devtools";

function Pokemon() {
  const queryInfo = useQuery(
    "pokemon",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 4000));
      return axios
        .get("https://pokeapi.co/api/v2/pokemon")
        .then((res) => res.data.results);
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  console.log({ queryInfo });
  return (
    <div>
      {queryInfo.isLoading ? (
        <div>Loading... </div>
      ) : (
        queryInfo.data.map((result) => {
          return <div key={result.name}>{result.name}</div>;
        })
      )}
    </div>
  );
}

function App() {
  return (
    <>
      <Pokemon />
      <ReactQueryDevtools />
    </>
  );
}

export default App;
