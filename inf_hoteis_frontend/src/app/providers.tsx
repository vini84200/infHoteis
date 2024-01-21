'use client';
import React from 'react';
import {ConfigProvider} from "antd";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'


function Providers(props: { children: React.ReactNode }) {
  {
    const [queryClient] = React.useState(() => new QueryClient())
    return (
      <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#b91c1c',
          colorLink: '#b91c1c',
        }
      }}
      >
        <QueryClientProvider client={queryClient}>
          {props.children}
          {<ReactQueryDevtools client={queryClient}/>}
        </QueryClientProvider>
      </ConfigProvider>
    )
  }
}

export default Providers;
