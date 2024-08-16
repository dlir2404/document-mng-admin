import { Button, Table, TableColumnsType } from "antd"
import { useState } from "react"
import AddRoomModal from "../modals/add-room"
import { useGetListRoom } from "../../services/room";

interface IRoom {
    id: number;
    name: string;
}

const RoomTable = () => {
    const [addRoom, setAddRoom] = useState(false)

    const { data: rooms, isLoading, refetch } = useGetListRoom()

    const columns: TableColumnsType<IRoom> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Tên phòng ban',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Hành động',
            key: 'action',

        },
    ]

    return (
        <>
            <Button onClick={() => setAddRoom(true)}>Thêm phòng mới</Button>
            <Table
                loading={isLoading}
                className="mt-4"
                columns={columns}
                dataSource={rooms?.data?.rows.map((row: any, index: number) => { return { key: index + 1, ...row } }) || []}
                pagination={false}
            // onChange={(e: any) => setPage(e.current)}
            ></Table>
            {addRoom && (
                <AddRoomModal isOpen={addRoom} setIsOpen={setAddRoom} onOk={() => refetch()}></AddRoomModal>
            )}
        </>
    )
}

export default RoomTable