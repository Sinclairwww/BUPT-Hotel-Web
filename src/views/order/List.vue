<template>
  <ListPage :request="request" :table-columns="tableColumns" :filter-fields="filterFields"
    :filter-list-options="filterListOptions">
    <template #columns-append>
      <el-table-column label="操作" fixed="right">
        <template #default="scope">
          <el-button type="primary" link @click="onGoDetail(scope.row)">
            空调详情
          </el-button>
          <el-button type="primary" link @click="edit">
            修改
          </el-button>

        </template>
      </el-table-column>
    </template>
  </ListPage>
</template>

<script lang="ts" setup name="orderList">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import listJson from './list.json'

//#region define
const router = useRouter()
//#endregion
//#region reactive data
// eslint-disable-next-line @typescript-eslint/no-empty-function
const bindInit = ref(function () { })
const tableColumns = ref([
  { label: '房间号', prop: 'room' },
  { label: '模式', prop: 'mode' },
  { label: '风速', prop: 'speed' },
  { label: '温度', prop: 'temperature' },
  { label: '在线状态', prop: 'onlineState' },
])
const filterFields = ref([
  {
    label: '房间号筛选',
    model: 'room',
    componentName: 'el-input',
    componentProps: {
      placeholder: '',
      clearable: true,
      width: '100px',
    },
  },
  {
    label: '模式筛选',
    model: 'mode',
    componentName: 'el-select',
    componentProps: {
      placeholder: '',
      clearable: true,
    },
  },
])
const filterListOptions = ref({
  mode: [
    { id: 1, label: '制冷' },
    { id: 2, label: '制暖' },
  ],
})

const edit = () => {
  console.log()
}
//#endregion
//#region methods
async function request(params: any, pageInit: any) {
  console.log('order list request', params)
  //   init = pageInit //这种方式必须在事件中执行init() 才行
  bindInit.value = pageInit //这种可以直接应用绑定init即可
  //   const res = await adminApi.getUserList(params)
  //   return res?.data
  return {
    list: listJson,
    total: listJson.length,
  }
}
function init() {
  console.log('order list init')
}
init()
//#endregion
//#region events
function onGoDetail(row: any) {
  console.log(row)
  router.push({
    name: 'orderDetail',
    query: {
      orderNo: row.orderNo,
      title: row.orderNo,
    },
  })
}
//#endregion
</script>

<style scoped lang="scss"></style>
