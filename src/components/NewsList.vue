<script setup>
import {ref, onMounted} from 'vue'
import {apiClient} from '@/apiClient' // 使用全局定义的 apiClient

// 添加栏目列表
const categories = [
  {title: '今日美股网', source: 'todayusstock'},
  {title: '东方财富网', source: 'eastmoney'},
  {title: '证券时报网', source: 'stcn'},
]

// 修改: 使用对象来存储每个栏目的新闻列表
const newsListByCategory = ref({})
var totalNewsCount=0;

const fetchNews = async (source, categoryTitle) => {
  try {
    const response = await apiClient.get(`/v1/news/list?source=${source}`)
    // 修改: 将获取的新闻列表存储在对应栏目的数组中
    newsListByCategory.value[categoryTitle] = response.data.news
    totalNewsCount += response.data.totalCount
  } catch (error) {
    console.error('Failed to fetch news:', error)
  }
}

// 根据栏目列表请求新闻
categories.forEach(category => {
  fetchNews(category.source, category.title)
})

onMounted(() => {
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

</script>

<template>
  <!-- 新闻内容区域 -->
  <div class="news-container">
    <div class="total-news-count">
      <p>新闻总数: {{ totalNewsCount }}</p>
    </div>
    <div v-for="(category, index) in categories" :key="index" class="news-section">
      <!-- 修改: 添加路由跳转 -->
      <router-link :to="`/source/${category.source}`" class="no-underline">
        <h2>{{ category.title }}</h2>
      </router-link>
      <div v-for="article in newsListByCategory[category.title]" :key="article.id" class="news-item">
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

/* 添加: 去除 router-link 的下划线 */
.no-underline {
  text-decoration: none;
}
</style>