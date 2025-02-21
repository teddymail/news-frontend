import axios from 'axios'
import OpenAI from "openai";

// 设置全局API请求地址基础路径
export const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL // 使用环境变量
})


export const openaiClient = new OpenAI({
  apiKey: process.env.VUE_APP_OPENAI_API_KEY, // 使用环境变量中的API密钥
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  dangerouslyAllowBrowser: true // 允许在浏览器环境中使用OpenAI客户端
});
