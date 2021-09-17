import React from "react";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import axios, { CancelToken } from "axios";

export default function App() {
  const [pokemon, setPokemon] = React.useState("");
  return (
    <div>
      <input value={pokemon} onChange={(e) => setPokemon(e.target.value)} />
      <PokemonSearch pokemon={pokemon} />
      <ReactQueryDevtools />
    </div>
  );
}

function PokemonSearch({ pokemon }) {
  const queryInfo = useQuery(
    ["pokemon", pokemon],
    () => {
      const source = CancelToken.source();
      const promise = new Promise((resolve) => setTimeout(resolve, 1000)).then(
        () => {
          return axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, {
              cancelToken: source.token,
            })
            .then((res) => res.data);
        }
      );
      promise.cancel = () => {
        source.cancel("Query was cancelled by React Query");
      };

      return promise;
    },
    {
      enabled: pokemon,
    }
  );

  return queryInfo.isLoading ? (
    "Loading..."
  ) : queryInfo.isError ? (
    queryInfo.error.message
  ) : (
    <div>
      {queryInfo.data?.sprites?.front_default ? (
        <img src={queryInfo.data.sprites.front_default} alt="pokemon" />
      ) : (
        "Pokemon not found."
      )}
      <br />
      {queryInfo.isFetching ? "Updating..." : null}
    </div>
  );
}
