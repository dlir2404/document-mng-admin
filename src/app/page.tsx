'use client'
import { useEffect, useState } from "react";
import { useAppContext } from "./app-provider";
import { useRouter } from "next/navigation";
import { Button, Input, notification, Radio, Table, Tag } from "antd";
import { useGetProfile } from "../../shared/services/user";
import { useTabsContext } from "../../shared/components/layouts/MainLayout";
import UserTable from "../../shared/components/tables/user";
import RoomTable from "../../shared/components/tables/room";

const exchangeRoleName = (role: number): string => {
  switch (role) {
    case 1: return 'ADMIN';
    case 2: return 'LEADER';
    case 3: return 'SPECIALIST';
    case 4: return 'OFFICE_CLERK';
    default: return 'SPECIALIST';
  }
}



export default function Home() {
  const router = useRouter()
  const appContext = useAppContext()
  const tabContext = useTabsContext()

  useGetProfile(appContext.token, (user: any) => {
    appContext.setUser(user)
  }, () => {
    notification.error({
      message: "Phiên đăng nhập đã hết hạn"
    })
    router.push('/login')
  })

  return (
    <>
      {tabContext.tabKey === 'user' ? (
        <UserTable />
      ) : (
        <RoomTable />
      )}
    </>
  );
}
