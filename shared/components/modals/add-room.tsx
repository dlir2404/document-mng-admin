'use client'
import { Form, Input, Modal, notification } from "antd";
import { useState } from "react"
import { useForm } from "antd/es/form/Form";
import { useAppContext } from "@/app/app-provider";
import { useAddRoom } from "../../services/room";

const AddRoomModal = ({
    isOpen,
    setIsOpen,
    onOk
}: {
    isOpen: boolean,
    onOk?: Function,
    setIsOpen: Function
}) => {
    const [form] = useForm()
    const [isConfirmLoading, setIsConfirmLoading] = useState(false)
    const appContext = useAppContext()

    const handleCancel = () => {
        setIsOpen(false)
    }

    const handleOk = () => {
        form.submit()
    }

    const addRoom = useAddRoom(() => {
        setIsConfirmLoading(false)
        setIsOpen(false)
        notification.success({
            message: "Thêm mới phòng thành công"
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
        addRoom.mutate({
            ...values,
            token: appContext.token
        })
    }
    return (
        <>
            <Modal confirmLoading={isConfirmLoading} width={800} closable={true} title="Thêm mới user" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    layout="vertical"
                    style={{ maxWidth: 1200 }}
                    onFinish={handleFinish}
                >
                    <Form.Item
                        label={'Tên phòng'}
                        name='name'
                        rules={[
                            {
                                required: true,
                                message: 'Không để trống trường này'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddRoomModal