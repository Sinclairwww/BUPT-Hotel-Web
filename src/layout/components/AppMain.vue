<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view v-slot="{ Component, route }">
        <KeepAlive v-show="!route.meta.divide" :include="cachedViews">
          <component :key="route.fullPath" :is="Component"></component>
        </KeepAlive>
        <KeepAlive>
          <component v-if="route.meta.divide && !route.meta.noCache" :key="route.fullPath" :is="Component"></component>
        </KeepAlive>
        <component v-if="route.meta.divide && route.meta.noCache" :is="Component"></component>
      </router-view>
    </transition>
    <el-backtop :right="100" :bottom="280" />
  </section>
</template>

<script lang="ts" setup>
import { useTagsViewStore } from '@/store/modules/tags-view'
const tagsViewStore = useTagsViewStore()

const cachedViews = computed(() => {
  const cacheViews = tagsViewStore.getCachedViews
  console.log('>>> cacheViews ', cacheViews)
  return cacheViews
})
</script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
}
</style>
