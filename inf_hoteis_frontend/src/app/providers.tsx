'use client';
import React from 'react';
import {ConfigProvider, Layout, Menu} from "antd";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Header from "@components/Header"
import Sider from 'antd/es/layout/Sider';
import Footer from '@/components/Footer';

const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  }),
);

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
