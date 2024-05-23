import { $post, $get } from "@/util/request";




export const $weekly_statistic_report = async () => {
    const res = await $get('/manager/weekly_statistic_report_wrap');
    return res;
}