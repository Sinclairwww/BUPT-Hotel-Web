import { $get } from "@/util/request";


export const $weekly_statistic_report = async () => {
    const res = await $get('/manager/weekly_statistic_report');
    return res;
}