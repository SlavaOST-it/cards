import {instance} from "./instance"

export const packsAPI = {
    getPacks(data: PacksRequest) {
        return instance.get(`cards/pack`, {
            params: {data}

        }).then(res => res.data)
    },
}

export type PacksRequest = {
    page: number,
    pageCount: number,
    sort: string,
    search: string,
    isMyPacks: boolean
}