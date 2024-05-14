<template>
  <div
    ><DetailHeader title="空调详情" />
    <div class="page-detail-content">
      <DetailCell
        v-for="item in detailConfig"
        :key="item.name"
        :slot-key="item.name"
        :label="item.label"
        style="margin-right: 24px"
        width="336px"
        :text="
          item.formatter ? item.formatter(data[item.name]) : data[item.name]
        "
      />
      <DetailCell label="备注" style="margin-right: 24px">
        <el-input v-model="data.remark" style="width: 500px" />
      </DetailCell> </div
  ></div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import listJson from './list.json'
import DetailHeader from '@/common/DetailHeader.vue'
import DetailCell from '@/common/DetailCell.vue'
//#region define
const route = useRoute()
const detailConfig: any = ref([
  { label: '房间号', name: 'room' },
  { label: '模式', name: 'mode' },
  { label: '风速', name: 'speed' },
  { label: '温度', name: 'temperature' },
  { label: '在线状态', name: 'onlineState' },
])
//#endregion
//#region reactive data
const data: any = reactive({
    room: '',
    mode: '',
    speed: '',
    temperature: '',
    onlineState: ''
})
//#endregion
//#region methods
function init() {
  console.log('order detail -> init  route:', route)
  const orderData = listJson.find((x: any) => x.orderNo === route.query.orderNo)
  Object.assign(data, orderData || {})
}
init()
//#endregion
//#region events
//#endregion
</script>

<style scoped lang="scss"></style>
