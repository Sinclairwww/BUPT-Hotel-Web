<template>
  <div class="container">
    <img class=image src="https://big.justeasy.cn/effectwater/202105/20210513103142_609c8f8eeb8ab.jpg" alt="checkout" />
    <el-button class="btn" plain @click="visible.dialog = true">结账服务</el-button>
    <el-dialog v-model="visible.dialog" style="width: 300px; position: relative; top: 23%; left: 5%;">


      <el-form-item label="房号  " label-width="70px">
        <el-input v-model="data.msg" size="large" style="width: 240px" placeholder="请输入房号" />
      </el-form-item>

      <el-form-item label="服务类型">
        <el-select v-model="choice.value" placeholder="Select" size="large" style="width: 240px">
          <el-option v-for="item in choice.options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>


      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" size="default" @click="confirm">确认</el-button>
          <el-button type="default" @click="visible.dialog = false">
            关闭
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { $create_ac_bill, $complete, $create_ac_detailed_record, $create_accom_bill } from '@/api/front';


const data = reactive({
  "msg": ''
});

const visible = reactive({
  dialog: false
})

const choice = reactive({
  "value": '',
  "options": [
    {
      value: '1',
      label: '空调账单'
    },
    {
      value: '2',
      label: '空调详单'
    },
    {
      value: '3',
      label: '完成退房'
    },
    {
      value: '4',
      label: '住宿账单'
    }
  ]
})

const confirm = () => {
  if (data.msg === '') {
    ElMessage({
      type: 'error',
      message: '请输入房号'
    })
  } else {
    switch (choice.value) {
      case '1':
        call_check_bill();
        break;
      case '2':
        call_check_detailed_record();
        break;
      case '3':
        call_complete();
        break;
      case '4':
        call_download_bill();
        break;
    }
  }
}

const call_download_bill = async () => {
  $create_accom_bill(data).then(res => {
    downloadFile(res.data.msg);
    ElMessage({
      message: '住宿账单下载成功！',
      type: 'success',
    })
  }).catch(() => {
    ElMessage({
      type: 'error',
      message: '住宿账单下载失败'
    })

  });
}



const call_check_bill = async () => {
  $create_ac_bill(data).then(res => {
    downloadFile(res.data.msg);
    ElMessage({
      message: '空调账单下载成功！',
      type: 'success',
    })
  }
  ).catch(() => {
    ElMessage({
      type: 'error',
      message: '空调账单下载失败'
    })
  });
}

const call_check_detailed_record = async () => {
  $create_ac_detailed_record(data).then(res => {
    downloadFile(res.data.msg);
    ElMessage({
      message: '空调详单下载成功！',
      type: 'success',
    })
  }).catch(() => {
    ElMessage({
      type: 'error',
      message: '空调详单下载失败'
    })
  });
}

const call_complete = async () => {
  $complete(data).then(res => {
    console.log(res);
    ElMessage({
      type: 'success',
      message: '退房成功'
    })
  }).catch(() => {
    ElMessage({
      type: 'error',
      message: '退房失败'
    })
  });
}


const downloadFile = (url: string) => {
  window.open(url);
}

</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 825px;
}

/* 使图像具有响应性 */
.container img {
  width: 100%;
  height: 100%;
}

/* 设置按钮样式并将其放置在容器/图像的中间 */
.container .btn {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);

  font-size: 30px;
  padding: 20px 30px;

  cursor: pointer;

}
</style>