<template>
  <div class="container">
    <img class=image src="https://big.justeasy.cn/effectwater/202105/20210513103142_609c8f8eeb8ab.jpg" alt="checkout" />
    <el-button class="btn" plain @click="open">结账服务</el-button>
    <el-dialog v-model="visible.dialog" style="width: 400px; position: relative; top: 23%; left: 5%;">


      <el-form-item label="房号  " label-width="70px">
        <el-input v-model="data.msg" size="large" style="width: 240px" placeholder="请输入房号" />
      </el-form-item>

      <el-form-item label="服务类型">
        <el-select v-model="choice.value" placeholder="Select" size="large" style="width: 240px">
          <el-option v-for="item in choice.options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item style="    position: relative; right: -60%; bottom: 0px;">
        <el-button type="primary" @click="confirm">确认</el-button>
        <el-button @click="visible.dialog = false">取消</el-button>
      </el-form-item>

    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { $check_bill, $complete, $check_detailed_record } from '@/api/front';
const open = () => {
  visible.dialog = true;
}

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
      label: '打印账单'
    },
    {
      value: '2',
      label: '打印详单'
    },
    {
      value: '3',
      label: '完成退房'
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
    }
  }
}




const call_check_bill = async () => {
  $check_bill(data).then(res => {
    console.log(res);
    ElMessageBox.alert(`${res.data.url}`, '点击下载账单', {
      confirmButtonText: 'OK',
      callback: () => {
        ElMessage({
          type: 'info',
          message: `下载账单成功`,
        })
      },
    }
    );
  }
  );
}

const call_check_detailed_record = async () => {
  $check_detailed_record(data).then(res => {
    console.log(res);

    ElMessageBox.alert(`${res.data.url}`, '点击下载详单', {
      confirmButtonText: 'OK',
      callback: () => {
        ElMessage({
          type: 'info',
          message: `下载账单成功`,
        })
      },
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