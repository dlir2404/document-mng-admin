import axios from "axios"
import { useMutation, useQuery } from "react-query"
import { BASE_URL } from "../constants/baseUrl"

export const useGetListRoom = () => {
    return useQuery({
        queryKey: ['get_rooms'],
        queryFn: () => axios.get(BASE_URL + '/room/all')
    })
}

export interface IAddRoom {
    name: string;
    token: string;
}

export const useAddRoom = (okFn?: Function, errFn?: Function) => {
    return useMutation({
        mutationFn: async (body: IAddRoom) => {
            return await axios.post(BASE_URL + '/room', body, {
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

export interface IAddUserToRoom {
    userId: number;
    roomId: number;
    token: string;
}

export const useAddUserToRoom = (okFn?: Function, errFn?: Function) => {
    return useMutation({
        mutationFn: async (body: IAddUserToRoom) => {
            return await axios.post(BASE_URL + '/room/add-user', body, {
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