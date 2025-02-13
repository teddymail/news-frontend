<template>
  <!-- 顶部导航栏 -->
  <header>
    <div class="logo">
      <img src="@/assets/logo.webp" alt="股票新闻聚合 Logo" class="logo-image"> <!-- 修改: 插入 logo 图片 -->
      股票新闻聚合
    </div>
    <nav>
      <a href="/">首页</a> <!-- 修改: 将 href="#" 改为 href="/" -->
      <a href="#">财经新闻</a>
      <a href="#">市场动态</a>
      <a href="#">关于我们</a>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader' // 修改: 将组件名称改为 AppHeader
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}

/* 顶部导航栏 */
header {
  background-color: #FFFFFF; /* 白色背景 */
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #FF0000; /* 红色底边 */
}

header .logo {
  font-size: 24px;
  font-weight: bold;
  color: #FF0000; /* 红色文字 */
  display: flex; /* 添加: 使用 flex 布局 */
  align-items: center; /* 添加: 垂直居中 */
}

header .logo .logo-image {
  width: 40px; /* 添加: 设置 logo 宽度 */
  height: 40px; /* 添加: 设置 logo 高度 */
  margin-right: 10px; /* 添加: 设置 logo 与文字间距 */
}

header nav a {
  color: #333333; /* 深灰色文字 */
  margin: 0 15px;
  font-size: 16px;
}

header nav a:hover {
  color: #FF0000; /* 红色悬停效果 */
}
</style>