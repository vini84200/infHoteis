'use client';
import React from 'react';
import {ConfigProvider, Layout, Menu} from "antd";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import Header from "@components/Header"
import Footer from '@/components/Footer';
import locale from 'antd/locale/pt_BR';
import 'dayjs/locale/pt-br';

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
      locale={locale}
      >
        <QueryClientProvider client={queryClient}>
          <Layout>                        
            <Header/>
              {/* <div style={{paddingTop: "var(--header-height)"}}></div> */}
              {props.children}
            <Footer/>
          </Layout>
          {<ReactQueryDevtools client={queryClient}/>}
        </QueryClientProvider>
      </ConfigProvider>
    )
  }
}

export default Providers;
