<template>
  <div class="container">
    <img class=image src="https://cdn.pixabay.com/photo/2015/04/20/06/46/office-730681_1280.jpg" alt="checkout" />
    <el-button class="btn" plain @click="open">获取报表</el-button>

  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { $weekly_statistic_report } from '@/api/manager';




const open = () => {
  $weekly_statistic_report().then(response => {
    // console.log(response.data)
    ElMessage({
      type: 'success',
      message: '获取报表成功',
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
  height: 112%;
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