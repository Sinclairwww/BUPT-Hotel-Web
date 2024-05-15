<template>
  <br>
  <br>
  <text class="title">Welcome to BUPT Hotel</text>
  <br>
  <div class="block text-center">
    <el-carousel height="680px" type="card" :interval="2000">
      <el-carousel-item v-for="item in state.data" :key="item">
        <h3 class="small justify-center" text="2xl">
          <img :src="item" alt="" />
        </h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>



<script setup>
const state = reactive({
  data: [
    "https://dimg04.c-ctrip.com/images/hotel/20000/19994/48be3f57dad94115aa9bdb945193fe8c_W_1080_808_R5_D.jpg",
    "https://dimg04.c-ctrip.com/images/200t050000000smqt33A6_W_1080_808_R5_D.jpg",
    "https://dimg04.c-ctrip.com/images/2005050000000smqw12FD_W_1080_808_R5_D.jpg",
    "https://dimg04.c-ctrip.com/images/2008070000002p3r15CC0_W_1080_808_R5_D.jpg",
  ],
});
</script>


<style scoped>
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.title {
  font-size: 60px;
  font-family: "Sans-serif";
  font: "Helvetica";
  justify-content: center;
  display: flex;
  text-align: center;
  text-shadow: rgba(255, 255, 255, 0.5) 0 5px 6px, rgba(255, 255, 255, 0.2) 1px 3px 3px;
  background: #EEE url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAAHklEQVQImWNkYGBgYGD4//8/A5wF5SBYyAr+//8PAPOCFO0Q2zq7AAAAAElFTkSuQmCC) repeat;
  text-shadow: 3px -3px black, 2px -2px white;
  font-weight: bold;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
}
</style>
