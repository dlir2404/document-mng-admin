'use client'

import { useAppContext } from "@/app/app-provider";
import { Avatar, Breadcrumb, Button, Layout, Menu, MenuProps, notification, Popover } from "antd";
import { UsergroupAddOutlined, UserOutlined } from '@ant-design/icons';
import { Content, Footer, Header } from "antd/es/layout/layout";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { createContext, useContext, useState } from "react";
import { CookieKeys } from "../../constants/cookie";
import { useRouter } from "next/navigation";
import Sider from "antd/es/layout/Sider";
import React from "react";

const TabsContext = createContext<{
    tabKey: string
    setTabKey: (tabKey: string) => void
}>({
    tabKey: 'income-document',
    setTabKey: () => { }
})

export const useTabsContext = function () {
    const context = useContext(TabsContext)
    return context
}

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // getMe()
    const [tabKey, setTabKey] = useState<string>('user')
    const appContext = useAppContext()
    const router = useRouter()

    const renderAvatarContent = () => {
        return <div>
            <Menu
                className="w-full"
                mode="inline"
                items={[
                    {
                        key: 'logout',
                        label: 'Đăng xuất',
                        onClick: () => {
                            router.push('/login')
                            appContext.setUser(null)
                            appContext.setToken('')
                            localStorage.removeItem(CookieKeys.accessToken)
                            notification.success({
                                message: "Đăng xuất thành công"
                            })
                        }
                    }
                ]}
            />
        </div>
    }

    const sideBarItems: MenuProps['items'] = [
        {
            key: `user`,
            icon: <UserOutlined />,
            label: `Quản lý người dùng`,
            onClick: () => setTabKey('user')
        },
        {
            key: `room`,
            icon: <UsergroupAddOutlined />,
            onClick: () => setTabKey('room'),
            label: `Quản lý phòng ban`,
        },
    ]

    return (
        <Layout>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="logo">
                    <img className="mr-6" src="/logo1.png" alt="" />
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[tabKey]}
                    items={[]}
                    style={{ flex: 1, minWidth: 0 }}
                />
                {appContext.user && (
                    <Popover placement="bottomRight" content={renderAvatarContent} title={appContext.user.username} trigger="click">
                        <Avatar size="large" icon={<UserOutlined />} />
                    </Popover>
                )}
            </Header>
            <Layout>
                <Sider width={200} style={{ height: 'calc(100vh - 64px)', background: '#ccc' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[tabKey]}
                        style={{ height: '100%', borderRight: 0 }}
                        items={sideBarItems || []}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    </Breadcrumb>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: 'white',
                            borderRadius: '#333',
                        }}
                    >
                        <TabsContext.Provider
                            value={{
                                tabKey,
                                setTabKey
                            }}
                        >
                            {children}
                        </TabsContext.Provider>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}
