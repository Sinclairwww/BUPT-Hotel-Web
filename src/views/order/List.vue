<template>
  <div class="container">
    <img class=image src="/src/assets/admin.jpg" alt="checkout" />
    <el-button class="btn1" @click="visible.table = true">查看空调情况</el-button>
    <el-button class="btn2" @click="visible.dialog = true">设置缺省参数</el-button>
  </div>

  <el-dialog v-model="visible.table" title="空调使用情况" width="67%" style="position:relative;top:20%;left:5%;">
    <el-table :data="tableData" :default-sort="{ prop: 'room', order: 'ascending' }">
      <el-table-column prop="room" label="房间号" width="200" sortable />
      <el-table-column prop="mode" label="模式" width="200" />
      <el-table-column prop="target_temp" label="目标温度" width="200" />
      <el-table-column prop="current_temp" label="当前温度" width="200" />
      <el-table-column prop="speed" label="风速" width="200" />
      <el-table-column prop="service" label="调度状态" width="200" />
      <el-table-column prop="cost" label="花费" width="200" />
    </el-table>
  </el-dialog>

  <el-dialog title="设置缺省参数" v-model="visible.dialog" width="270" style="top: 20%;left: 3%;">
    <el-form-item label="默认目标温度">
      <el-input v-model="defaultData.target_temp" clearable style="width: 240px" placeholder="请输入默认温度"></el-input>
    </el-form-item>

    <el-form-item label="默认速度">
      <el-select v-model="defaultData.speed" placeholder="Select" size="large" style="width: 240px">
        <el-option v-for="item in options.speed" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>

    <el-form-item label="默认模式">
      <el-select v-model="defaultData.mode" placeholder="Select" size="large" style="width: 240px">
        <el-option v-for="item in options.mode" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>


    <template #footer>
      <span>
        <el-button @click="visible.dialog = false">取消</el-button>
        <el-button type="primary" @click="setDefault">确认</el-button>
      </span>
    </template>

  </el-dialog>

</template>



<script lang="ts" setup>

import { reactive } from 'vue'
import { $get_info, $set_default_param } from '@/api/aircondition-control';
import { Action, ElMessageBox } from 'element-plus';
const tableData = reactive([])
const visible = reactive({
  dialog: false,
  table: false
})
const defaultData = reactive({
  target_temp: '',
  speed: '',
  mode: ''
})

const setDefault = () => {
  const data = {
    "target_temp": Number(defaultData.target_temp),
    "speed": defaultData.speed,
    "mode": defaultData.mode
  }
  $set_default_param({ data }).then(() => {
    ElMessageBox.alert('设置成功', '成功', {
      confirmButtonText: 'OK',
      callback: () => {
        visible.value = false
      }
    })
  }).catch(() => {
    ElMessageBox.alert('设置失败', '失败', {
      confirmButtonText: 'OK',
      callback: () => {
        visible.value = false
      }
    })
  })
}

const options = {
  speed: [
    { value: 'high', label: '高风' },
    { value: 'medium', label: '中风' },
    { value: 'low', label: '低风' }
  ],
  mode: [
    { value: 'heat', label: '制热' },
    { value: 'cold', label: '制冷' },
  ]
}


const freshTable = async () => {
  tableData.splice(0, tableData.length)
  for (let i = 1; i <= 5; i++) {
    const data = {
      "room_id": i.toString()
    }
    $get_info({ data }).then((response) => {
      const res = response.data
      res.data.room = i.toString()
      tableData.push(res.data)
    }).catch(() => {
      const data = {
        "room": i.toString(),
        "mode": "",
        "target_temp": "",
        "current_temp": "",
        "speed": "",
        "service": "未入住",
        "cost": ""
      }
      tableData.push(data)
    })
  }
}

const open = () => {
  ElMessageBox.alert('This is a message', 'Title', {
    confirmButtonText: 'OK',
    callback: (action: Action) => {
      ElMessage({
        type: 'info',
        message: `action: ${action}`,
      })
    },
  })
}
freshTable()

</script>
<style>
.container {
  position: absolute;
  width: 83%;
  height: 810px;
}

/* 使图像具有响应性 */
.container img {
  width: 120%;
  height: 112%;
}

/* 设置按钮样式并将其放置在容器/图像的中间 */
.container .btn1 {
  position: absolute;
  top: 75%;
  left: 58%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);

  font-size: 30px;
  padding: 20px 30px;

  cursor: pointer;

}

.container .btn2 {
  position: absolute;
  top: 85%;
  left: 57.5%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);

  font-size: 30px;
  padding: 20px 30px;

  cursor: pointer;

}
</style>
