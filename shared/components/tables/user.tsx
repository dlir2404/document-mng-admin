import { Button, Input, Table, TableColumnsType } from "antd"
import { useGetUsers } from "../../services/user";
import { useState } from "react";
import { useAppContext } from "@/app/app-provider";
import { formatDate } from "../../utils/formatDate";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import AddUserModal from "../modals/add-user";
import AddUserToRoomModal from "../modals/add-user-to-room";

interface IUser {
    id: number;
    username: string;
    password: string;
    role: number;
    userNumber: string;
    fullName: string;
    title: string;
    gender: string;
    dateOfBirth: string;
    address: string;
    phone: string;
    email: string;
    room: any;
}

export enum UserRole {
    ADMIN = 1,
    LEADER = 2,
    SPECIALIST = 3,
    OFFICE_CLERK = 4
}

const numRoleToText: { [key: number]: string } = {
    1: 'Admin',
    2: 'Lãnh đạo',
    3: 'Chuyên viên',
    4: 'Văn thư'
}

const UserTable = () => {

    const appContext = useAppContext()
    const [page, setPage] = useState(1)
    const [user, setUser] = useState<IUser | undefined>()
    const [addUserModal, setAddUserModal] = useState(false)
    const [addUserToRoom, setAddUserToRoom] = useState(false)
    const [query, setQuery] = useState<string | undefined>()
    const { data: users, isLoading, refetch } = useGetUsers({
        page: page || 10,
        pageSize: 10,
        roles: [UserRole.LEADER, UserRole.OFFICE_CLERK, UserRole.SPECIALIST],
        query: query,
        token: appContext.token
    })

    const columns: TableColumnsType<IUser> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Mã nhân viên',
            dataIndex: 'userNumber',
            key: 'userNumber'
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: 'Họ tên đầy đủ',
            dataIndex: 'fullName',
            key: 'fullName'
        },
        {
            title: 'Chức vụ',
            dataIndex: 'role',
            key: 'role',
            render: (value: any) => <p>{numRoleToText[value]}</p>
        },
        {
            title: 'Chức danh',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Phòng ban',
            dataIndex: 'room',
            key: 'room',
            render: (value: any) => <p>{value?.name}</p>
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            render: (value: string) => {
                return value === 'MALE' ? 'Nam' : value === 'FEMALE' ? 'Nữ' : 'Khác'
            }
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
            render: (value: any) => <p>{formatDate(value)}</p>
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => {
                if (record.room) return ''
                if (record.role !== UserRole.SPECIALIST) return ''
                return (
                    <Button onClick={() => {
                        setUser(record)
                        setAddUserToRoom(true)
                    }}>Thêm vào phòng</Button>
                )
            }
        },
    ]

    return (
        <div>
            <Button onClick={() => setAddUserModal(true)}>Thêm người dùng mới</Button>
            <div className="inline-block float-right">
                <Input
                    onChange={debounce((e) => setQuery(e.currentTarget.value), 300)}
                    placeholder="Nhập từ khoá"
                    className="min-w-[400px]"
                    allowClear
                    prefix={<SearchOutlined />} />
            </div>
            <Table
                loading={isLoading}
                className="mt-4"
                columns={columns}
                dataSource={users?.data?.rows.map((row: any, index: number) => { return { key: index + 1, ...row } }) || []}
                pagination={{
                    total: users?.data?.count || 0,
                    pageSize: 10
                }}
                onChange={(e: any) => setPage(e.current)}
            ></Table>
            {addUserModal && (
                <AddUserModal isOpen={addUserModal} setIsOpen={setAddUserModal} onOk={() => refetch()}></AddUserModal>
            )}
            {addUserToRoom && (
                <AddUserToRoomModal userId={user?.id} isOpen={addUserToRoom} setIsOpen={setAddUserToRoom} onOk={() => refetch()}></AddUserToRoomModal>
            )}
        </div>
    )
}

export default UserTable