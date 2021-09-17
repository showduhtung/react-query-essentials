import React, { useEffect, useReducer } from 'react'
import { queryCache, useQuery } from 'react-query'
import axios from 'axios'

export default function App() {
  const [show, toggle] = useReducer(d => !d, true)
  return (
    <div>
      <button onClick={toggle}>Toggle Random</button>
      <button
        onClick={() =>
          queryCache.invalidateQueries('random', {
            refetchActive: false,
          })
        }
      >
        Invalidate Random Number
      </button>
      {show && <RandomNumber />}
    </div>
  )
}

function RandomNumber() {
  const randomQuery = useQuery(
    'random',
    async () => axios.get('/api/random').then(res => res.data)
    // {
    //   staleTime: Infinity,
    // }
  )

  return (
    <div>
      <h1>Random Number {randomQuery.isFetching && '...'}</h1>
      <h2>
        {randomQuery.isLoading
          ? 'Loading random number...'
          : Math.round(randomQuery.data.random * 1000)}
      </h2>
    </div>
  )
}
