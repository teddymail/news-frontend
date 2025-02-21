import axios from 'axios'
import OpenAI from "openai";
import CryptoJS from 'crypto-js'; // 引入CryptoJS库

// 设置全局API请求地址基础路径
export const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL // 使用环境变量
})

// 假设你有一个密钥用于加密和解密
const secretKey = 'dsfdsfdsfdsfdsfsdf'; // 请使用一个安全的密钥

// 加密API密钥 sk-13fa96f5a29f4afebd5ae793767a26f6
let encryptedApiKey = 'U2FsdGVkX1+9VSMcw1i5Cw4CcGWQQqsdtJgGyHhMVFCvTCfV0rxGyYZTclBMIMp2vE6A4NHhI9ZKE7Rsj8bmIw==';

export const openaiClient = new OpenAI({
  apiKey: CryptoJS.AES.decrypt(encryptedApiKey, secretKey).toString(CryptoJS.enc.Utf8), // 解密API密钥
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  dangerouslyAllowBrowser: true // 允许在浏览器环境中使用OpenAI客户端
});