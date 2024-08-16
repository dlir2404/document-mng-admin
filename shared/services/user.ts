import axios from "axios"
import { useMutation, useQuery } from "react-query"
import { BASE_URL } from "../constants/baseUrl"
import { notification } from "antd"

export const useLogin = (okFn?: Function, errFn?: Function) => {
    return useMutation({
        mutationFn: (params: { username: string, password: string }) => {
            return axios.post(BASE_URL + '/admin/auth/login', { ...params })
        },
        onSuccess: (response) => {
            okFn && okFn(response.data?.token)
        },
        onError: (error: any) => {
            notification.error({
                message: error?.response.data.message || error?.message || 'Đăng nhập không thành công'
            })
            errFn && errFn()
        }
    })
}

export const useGetProfile = (token: string, onOk?: Function, onError?: Function) => {
    return useQuery({
        queryKey: ['get_profile', token],
        queryFn: async () => {
            const result = await axios.get(BASE_URL + '/admin/auth/me', {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            return result
        },
        onSuccess: (data: any) => {
            onOk && onOk(data.data)
        },
        onError: (error: any) => {
            console.log(error)
            onError && onError()
        }
    })
}

interface IGetUsers {
    page: number;
    pageSize: number;
    roles?: number[];
    query?: string;
    token?: string
}

export const useGetUsers = (params: IGetUsers) => {
    return useQuery({
        queryKey: ['get_users', params],
        queryFn: async () => await axios.get(BASE_URL + `/admin/user/all`, {
            params: params,
            headers: {
                'Authorization': 'Bearer ' + params.token
            }
        }),
    })
}

export interface IAddUser {
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
    token: string;
}

export const useAddUser = (okFn?: Function, errFn?: Function) => {
    return useMutation({
        mutationFn: async (body: IAddUser) => {
            return await axios.post(BASE_URL + '/admin/user', body, {
                headers: {
                    'Authorization': 'Bearer ' + body.token,
                }
            })
        },
        onSuccess: (data: any) => {
            okFn && okFn()
        },
        onError: (error: any) => {
            errFn && errFn(error.response?.data?.message || "Có lỗi xảy ra")
            console.log(error)
        }
    })
}