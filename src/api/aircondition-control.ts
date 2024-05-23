
import { $post } from "@/util/request";

export const $get_info = async (params: object) => {
    const res = await $post('/user/info', params);
    return res;
}


export const $set_default_param = async (params: object) => {
    const res = await $post('/user/set_default_param', params);
    return res;
}