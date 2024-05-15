import { $post } from "@/util/request";


export const $Register = async (params: object) => {
    const res = await $post('/user/register', params);
    return res;
}

export const $CheckAvailableRoom = async (params: object) => {
    const res = await $post('/user/check_available_room', params);
    return res;
}

export const $check_bill = async (params: object) => {
    const res = await $post('/user/check_bill', params);
    return res;
}

export const $complete = async (params: object) => {
    const res = await $post('/user/complete', params);
    return res;
}