import React, { useEffect } from 'react'
import { queryCache, useQuery } from 'react-query'
import axios from 'axios'

export default function Posts() {
  const randomQuery = useQuery('random', async () => {
    return axios.get('/api/random').then(res => res.data)
  })
  useEffect(() => console.log(randomQuery))

  const invalidateRandomNumber = () =>
    queryCache.invalidateQueries('random')

  return (
    <div>
      <h1>Random Number {randomQuery.isFetching && '...'}</h1>
      <h2>
        {randomQuery.isLoading
          ? 'Loading random number...'
          : randomQuery.data.random * 1000}
      </h2>
      <div>
        <button onClick={() => invalidateRandomNumber()}>
          Invalidate Random Number
        </button>
      </div>
    </div>
  )
}
