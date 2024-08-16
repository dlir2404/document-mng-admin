'use client'
import { Col, DatePicker, Form, Input, Modal, notification, Row, Select } from "antd";
import { useState } from "react"
import { incomeAttribute } from "../../constants/attribute";
import { useForm } from "antd/es/form/Form";
import { useAppContext } from "@/app/app-provider";
import { useAddUser } from "../../services/user";

const AddUserModal = ({
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

    const addUser = useAddUser(() => {
        setIsConfirmLoading(false)
        setIsOpen(false)
        notification.success({
            message: "Thêm mới user thành công"
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
        values.dateOfBirth = values.dateOfBirth?.toISOString()

        setIsConfirmLoading(true)
        addUser.mutate({
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
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label={'Username'}
                                name='username'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không để trống trường này'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label={'Password'}
                                name='password'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không để trống trường này'
                                    }
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                label={'Ngày sinh'}
                                name='dateOfBirth'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không để trống trường này'
                                    }
                                ]}
                            >
                                <DatePicker />
                            </Form.Item>
                            <Form.Item
                                label={'Mã nhân viên'}
                                name='userNumber'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không để trống trường này'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label={'Họ tên đầy đủ'}
                                name='fullName'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không để trống trường này'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={'Giới tính'}
                                name='gender'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không để trống trường này'
                                    }
                                ]}
                            >
                                <Select
                                    options={[
                                        {
                                            label: 'Nam',
                                            value: 'MALE'
                                        },
                                        {
                                            label: 'Nữ',
                                            value: 'FEMALE'
                                        },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item
                                label={'Chức vụ'}
                                name='role'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không để trống trường này'
                                    }
                                ]}
                            >
                                <Select
                                    options={[
                                        {
                                            label: 'Lãnh đạo',
                                            value: 2
                                        },
                                        {
                                            label: 'Chuyên viên',
                                            value: 3
                                        },
                                        {
                                            label: 'Văn thư',
                                            value: 4
                                        }
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item
                                label={'Chức danh'}
                                name='title'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không để trống trường này'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label={'Địa chỉ'}
                                name='address'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không để trống trường này'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label={'Số điện thoại'}
                                name='phone'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không để trống trường này'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label={'Email'} name='email'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không để trống trường này'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default AddUserModal