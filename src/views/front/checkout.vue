<template>
  <div class="container">
    <img class=image src="https://big.justeasy.cn/effectwater/202105/20210513103142_609c8f8eeb8ab.jpg" alt="checkout" />
    <el-button class="btn" plain @click="open">办理退房</el-button>
  </div>

</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { $check_bill, $complete } from '@/api/front';
const open = () => {
  ElMessageBox.prompt('请输入您的房号', '退房助手', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputPattern: /room_\d+/,
    inputErrorMessage: '房间名格式错误',
  }).then(({ value }) => {
    const params = { "msg": value }
    $check_bill(params).then(res => {
      $complete(params).then(res => {
        ElMessage({ type: 'success', message: `${value}退房成功`, })
      })
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消退房',
    })
  })
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