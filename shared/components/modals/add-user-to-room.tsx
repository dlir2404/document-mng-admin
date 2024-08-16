'use client'
import { Form, Input, Modal, Select, notification } from "antd";
import { useState } from "react"
import { useForm } from "antd/es/form/Form";
import { useAppContext } from "@/app/app-provider";
import { useAddRoom, useAddUserToRoom, useGetListRoom } from "../../services/room";

const AddUserToRoomModal = ({
    isOpen,
    setIsOpen,
    onOk,
    userId
}: {
    isOpen: boolean,
    onOk?: Function,
    setIsOpen: Function
    userId?: number
}) => {
    const [form] = useForm()
    const [isConfirmLoading, setIsConfirmLoading] = useState(false)
    const appContext = useAppContext()

    const { data: rooms } = useGetListRoom()

    const handleCancel = () => {
        setIsOpen(false)
    }

    const handleOk = () => {
        form.submit()
    }

    const addUserToRoom = useAddUserToRoom(() => {
        setIsConfirmLoading(false)
        setIsOpen(false)
        notification.success({
            message: "Thêm user vào phòng thành công"
        })
        form.resetFields()
        onOk && onOk()
    }, (message?: string) => {
        setIsConfirmLoading(false)
        notification.error({
            message
        })
    })

    const handleFinish = (values: any) => {
        setIsConfirmLoading(true)
        addUserToRoom.mutate({
            ...values,
            userId,
            token: appContext.token
        })
    }
    return (
        <>
            <Modal confirmLoading={isConfirmLoading} width={800} closable={true} title="Thêm user vào phòng" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    layout="vertical"
                    style={{ maxWidth: 1200 }}
                    onFinish={handleFinish}
                >
                    <Form.Item
                        label={'Chọn phòng'}
                        name='roomId'
                        rules={[
                            {
                                required: true,
                                message: 'Không để trống trường này'
                            }
                        ]}
                    >
                        <Select
                            options={rooms?.data?.rows.map((room: any) => {
                                return {
                                    label: room.name,
                                    value: room.id
                                }
                            })}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddUserToRoomModal