import { $post } from "@/util/request";


export const $Register = async (params: object) => {
    const res = await $post('/user/register', params);
    return res;
}

export const $CheckAvailableRoom = async (params: object) => {
    const res = await $post('/user/check_available_room', params);
    return res;
}

export const $create_ac_bill = async (params: object) => {
    const res = await $post('/user/create_ac_bill', params);
    return res;
}

export const $create_ac_detailed_record = async (params: object) => {
    const res = await $post('/user/create_ac_detailed_record', params);
    return res;
}

export const $complete = async (params: object) => {
    const res = await $post('/user/complete', params);
    return res;
}

export const $available_room = async (params: object) => {
    const res = await $post('/user/available_room', params);
    return res;
}

export const $create_accom_bill = async (params: object) => {
    const res = await $post('/user/create_accom_bill', params);
    return res;
}