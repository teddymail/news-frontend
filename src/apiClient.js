import axios from 'axios'

// 设置全局API请求地址基础路径
export const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL // 使用环境变量
})
