<template>
  <div class="news-detail-container">
    <div class="news-content">
      <!-- 新闻标题 -->
      <div class="news-title">{{ newsDetail.title }}</div>
      <!-- 新闻内容 -->
      <div class="news-detail">
        <p>{{ newsDetail.content }}</p>
      </div>
      <!-- 查看原文 -->
      <div class="view-original">
        <a :href="newsDetail.link" target="_blank">查看原文</a>
      </div>
    </div>

    <div class="chat-box">
      <div class="chat-display" id="chatDisplay">
        <!-- 聊天记录会动态显示在这里 -->
      </div>
      <div class="chat-input-area">
        <input type="text" class="chat-input" id="userInput" placeholder="请输入您的问题..." v-model="userInput">
        <button class="chat-submit" @click="sendMessage" :disabled="isSending" :class="{ 'disabled': isSending }">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import {v4 as uuidv4} from 'uuid'; // 引入 uuid 库
import axios from 'axios';
import {apiClient} from '@/apiClient' // 使用全局定义的 apiClient
import {marked} from 'marked';

export default {
  data() {
    return {
      apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU5MjNlNDQ0LTRkNWUtNGQ0OS04Y2Y5LTA0MzBjYTQ3OTIwMCJ9.qsS2WZzb3coiPpfFiuEkDF3oZoDLHNPAhAHFxCQcA6g',
      responseMessage: '',
      messages: [], // 添加 messages 数组
      newsDetail: {}, // 添加 newsDetail 对象
      userInput: '', // 添加 userInput 数据属性
      isSending: false // 添加 isSending 属性
    };
  },
  created() {
    this.fetchNewsDetail(); // 在组件创建时获取新闻详情
  },
  methods: {
    async fetchNewsDetail() {
      try {
        const response = await apiClient.get(`v1/news/${this.$route.params.id}`);
        this.newsDetail = response.data;
        console.log(response)
      } catch (error) {
        console.error('获取新闻详情失败:', error);
      }
      // 初始化时就发送新闻固定内容sendMessage
      this.userInput = "你是一个股票专家，专业分析时事新闻，寻找其中投资方向，并找到相关股票代码：\n" +
          "1. 完整股票代码，并给出选中原因\n" +
          "2. 你是一个新手玩家，只投资股价很低的潜力股票，大资金量的盘不参与不推荐。\n" +
          "3. 给出初级入门投资前景，涨幅高的潜力股票，你得资金只有3W，只玩国内科创板的条件，如果不适合开头直接给出不适合投资的意见即可。\n" +
          "4. 给出合理的投资事件和买入时机和抛出时机，并给出理由\n" +
          "5. 今天看到以下新闻内容：" + this.newsDetail.content + "\n" +
          "6. 从中能发现利好哪些股票？给出具体股票名字 没有就不给即可 适不适合低门槛我这个资金量的人玩？  ";
      this.sendMessage();
    },
    async sendMessage() {
      if (this.userInput.trim() === "") return;

      this.isSending = true; // 发送开始时禁用按钮

      const userMessage = {
        id: this.generateSpecificUUID(),
        role: 'user',
        content: this.userInput,
        timestamp: Date.now(),
      };

      // Get the current time
      const time = this.getCurrentTime();

      // Create the user message element
      const userMessageEle = document.createElement("div");
      userMessageEle.className = "chat-message user";
      if (this.messages.length > 1) {
        userMessageEle.innerHTML = `
<div class="message-header">
  <img src="https://img.icons8.com/ios/50/000000/user-male.png" class="avatar" alt="User">
  <span class="timestamp">${time}</span>
</div>
<div class="message-bubble">${this.renderMarkdown(this.userInput)}</div>
`;
        document.getElementById("chatDisplay").appendChild(userMessageEle);
      }

      // Display the loading message
      const loadingMessage = document.createElement("div");
      loadingMessage.className = "loading-message";
      loadingMessage.innerHTML = "ChatGPT 正在处理中...";
      document.getElementById("chatDisplay").appendChild(loadingMessage);

      this.messages.push(userMessage);
      this.userInput = ''; // Clear the input box

      try {
        const response = await axios.post(
            'https://chat.bncic.com.cn:10000/api/chat/completions',
            {
              model: 'deepseek-r1:32b',
              messages: this.messages,
              chat_id: 'local',
              session_id: 'kb_czCzoLJfNEwLbAAJE',
              id: 'c27cf990-a0f7-49cc-8a46-f854e88d1cff',
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`,
              },
            }
        );

        const assistantMessage = {
          id: this.generateSpecificUUID(),
          role: 'assistant',
          content: response.data.choices[0].message.content,
          timestamp: Date.now(),
        };

        this.messages.push(assistantMessage);
        this.responseMessage = response.data.choices[0].message.content;

        // Remove the loading message
        const chatDisplay = document.getElementById("chatDisplay");
        if (chatDisplay.contains(loadingMessage)) {
          chatDisplay.removeChild(loadingMessage);
        }

        // Create the assistant message element
        const botMessage = document.createElement("div");
        botMessage.className = "chat-message bot";
        botMessage.innerHTML = `
  <div class="message-header">
    <img src="https://img.icons8.com/ios/50/000000/robot.png" class="avatar" alt="ChatGPT">
    <span class="timestamp">${this.getCurrentTime()}</span>
  </div>
  <div class="message-bubble">${this.renderMarkdown(this.responseMessage)}</div>
`;
        chatDisplay.appendChild(botMessage);

        // Scroll to the bottom
        chatDisplay.scrollTop = chatDisplay.scrollHeight;

        this.isSending = false; // 发送成功后启用按钮
      } catch (error) {
        console.error('请求失败:', error);
        this.responseMessage = '请求失败，请稍后再试。';

        this.isSending = false; // 发送失败后启用按钮
      }
    },
    generateSpecificUUID() {
      return uuidv4(); // 使用 uuid 库生成 UUID
    },
    renderMarkdown(content) {
      return marked(content);
    },
    getCurrentTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
  }
}
</script>

<style>
/* 内容容器 */
.news-detail-container {
  display: flex;
  justify-content: center; /* 居中 */
  padding: 20px;
  width: 100%; /* 占满整个屏幕 */
  max-width: 1200px; /* 最大宽度 */
  margin: 0 auto; /* 自动居中 */
}


/* 左侧新闻内容 */
.news-content {
  width: 30%; /* 左侧占30%宽度 */
  padding-right: 20px;
}

.news-title {
  color: #003366;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}

.news-detail {
  font-size: 16px;
  line-height: 1.6;
  color: #666666;
}

/* 查看原文按钮样式 */
.view-original a {
  display: inline-block;
  padding: 10px 20px;
  background-color: #003366;
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.view-original a:hover {
  background-color: #FF0000;
}

/* 右侧 ChatGPT 聊天框 */
.chat-box {
  width: 70%; /* 右侧占70%宽度 */
  background-color: #F5F5F5;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #E0E0E0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 500px;
}

.chat-display {
  height: 95%;
  overflow-y: auto;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 5px;
  min-height: 500px;
}

.chat-message {
  margin: 10px 0;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* 用户消息样式 */
.chat-message.user {
  align-items: flex-end; /* 让用户的消息靠右 */
  text-align: right;
}

/* 系统消息样式 */
.chat-message.bot {
  align-items: flex-start; /* 让机器人的消息靠左 */
  text-align: left;
}

.chat-message .message-bubble {
  padding: 10px;
  border-radius: 10px;
  max-width: 80%;
  word-wrap: break-word;
  line-height: 1.5;
  font-size: 14px;
  text-align: left;
}

.chat-message.user .message-bubble {
  background-color: #003366;
  color: #fff;
}

.chat-message.bot .message-bubble {
  background-color: #F1F1F1;
  color: #333;
}

/* 头像和时间布局 */
.chat-message .message-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.chat-message .timestamp {
  font-size: 12px;
  color: #999;
  margin-left: 10px;
}

.chat-message .avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

/* 输入框区域 */
.chat-input-area {
  display: flex;
  align-items: center;
}

.chat-input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #E0E0E0;
  border-radius: 5px;
  margin-right: 10px;
}

.chat-submit {
  padding: 10px 20px;
  background-color: #003366;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.chat-submit:hover {
  background-color: #FF0000;
}

.chat-submit.disabled {
  background-color: #cccccc; /* 灰色 */
  cursor: not-allowed;
}
</style>