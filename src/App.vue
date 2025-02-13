<template>
  <div id="app">
    <AppHeader/>
    <StockIndex/>
    <router-view></router-view>
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue"; // 修改: 引入 AppHeader 组件
import AppFooter from "@/components/AppFooter.vue"; // 修改: 引入 AppFooter 组件
import StockIndex from "@/components/StockIndex.vue";

export default {
  name: 'App',
  components: {
    AppHeader, // 修改: 注册 AppHeader 组件
    AppFooter, // 修改: 注册 AppFooter 组件
    StockIndex // 注册 StockIndex 组件
  }
}
</script>

<style>
/* 全局样式 */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #FFFFFF;
  color: #333333;
}
</style>