<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router' // 添加: 引入 useRoute 钩子
import { apiClient } from '@/apiClient' // 使用全局定义的 apiClient
import AppPagination from './AppPagination.vue' // 添加: 引入 Pagination 组件

const sources = {
  'todayusstock': '今日美股网',
  'eastmoney': '东方财富网',
  'stcn': '证券时报网'
}

// 修改: 使用对象来存储每个栏目的新闻列表
const newsListByCategory = ref({})
const totalNewsCount = ref(0);
const totalPages = ref(0); // 添加: totalPages 计算

// 添加: 使用 useRoute 获取路由参数 source
const route = useRoute()
const source = route.params.source

// 接受page 和 size参数 并默认值 page=1 size=10
let page = parseInt(route.params.page) || 1; // 修改: 添加默认值
let pageSize = parseInt(route.params.pageSize) || 10; // 修改: 添加默认值

const fetchNews = async (source, categoryTitle, page) => {
  try {
    const response = await apiClient.get(`/v1/news/list?source=${source}&page=${page}&pageSize=${pageSize}`);
    newsListByCategory.value[categoryTitle] = response.data.news;
    totalNewsCount.value = parseInt(response.data.totalCount);
    totalPages.value = Math.ceil(totalNewsCount.value / pageSize); // 计算 totalPages
  } catch (error) {
    console.error('Failed to fetch news:', error);
  }
}

// 获取source并获取新闻内容
onMounted(() => {
  fetchNews(source, sources[source], page) // 修改: 使用 source 路由参数
})

// 添加: 计算发布时间与当前时间的差异
const timeAgo = (publishTime) => {
  const now = new Date()
  const timeDifference = now - new Date(publishTime)
  const seconds = Math.floor(timeDifference / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) {
    return `${days}天前`
  } else if (hours > 0) {
    return `${hours}小时前`
  } else if (minutes > 0) {
    return `${minutes}分钟前`
  } else {
    return '刚刚'
  }
}

// 添加: 打开链接的方法
const openLink = (link) => {
  window.open(link, '_blank')
}

// 添加: 处理分页变化
const handlePageChange = (newPage) => {
  page = newPage
  fetchNews(source, sources[source], page)
}
</script>

<template>
  <!-- 新闻内容区域 -->
  <div class="news-container">
    <div class="total-news-count">
      <p>新闻总数: {{ totalNewsCount }}</p>
    </div>
    <div class="news-section">
      <!-- 修改: 使用 sources[category.source] 获取新闻来源名称 -->
      <h2>{{ sources[source] }}</h2>
      <div v-for="article in newsListByCategory[sources[source]]" :key="article.id" class="news-item">
        <h3>
          <div class="news-link" @click="openLink(article.link)">{{ article.title }}</div>
        </h3>
        <p class="content">{{ article.content ? article.content.slice(0, 80) + (article.content.length > 50 ? '...' : '') : '' }}</p>
        <p></p>
        <p>
          <span>{{ article.category }}</span> <!-- 新增: 分类展示元素 -->
          {{ timeAgo(article.publish_time) }}
        </p>
      </div>
    </div>
    <!-- 增加分页组件 -->
    <AppPagination :currentPage="page" :totalPages="totalPages" @page-change="handlePageChange" />
  </div>
</template>

<style scoped>
/* 新闻内容区域 */
.news-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.news-section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 整体阴影 */
}

.news-section h2 {
  color: #003366; /* 红色文字 */
  font-size: 22px;
  margin-bottom: 15px;
}

.news-item {
  margin: 15px 0;
  padding: 15px;
  background-color: #F5F5F5; /* 浅灰色背景 */
  border-radius: 5px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05); /* 轻微阴影 */
}

.news-item h3 {
  margin: 0;
  font-size: 18px;
  color: #003366; /* 红色文字 */
}

.news-item p {
  margin: 5px 0;
  font-size: 14px;
  color: #666666; /* 灰色文字 */
}
</style>