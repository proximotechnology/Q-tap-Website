"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";


export default function ClientProviders({ children, locale }) {

    return (
        <QueryClientProvider client={queryClient}>

            {children}

        </QueryClientProvider>
    );
}