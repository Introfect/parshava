'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"

const Providers=({ children })=>{

const queryClient= new QueryClient()
    return(
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}

export default Providers