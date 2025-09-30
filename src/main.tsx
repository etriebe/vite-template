import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <Example />
        </QueryClientProvider>
    )
}

function Example() {
    const { isPending, error, data, isFetching, refetch } = useQuery({
        queryKey: ['repoData'],
        queryFn: async () => {
            const response = await fetch(
                'https://api.github.com/repos/TanStack/query',
            )
            return await response.json()
        },
        staleTime: 1000 * 60 * 5,
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div>
            <h1>{data.full_name}</h1>
            <p>{data.description}</p>
            <strong>👀 {data.subscribers_count}</strong>{' '}
            <strong>✨ {data.stargazers_count}</strong>{' '}
            <strong>🍴 {data.forks_count}</strong>
            <div>{isFetching ? 'Updating...' : ''}</div>
            <button onClick={() => refetch()}>Refetch</button>
        </div>
    )
}

const rootElement = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(rootElement).render(<App />)
