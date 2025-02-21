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
import {apiClient,openaiClient} from '@/apiClient' // 使用全局定义的 apiClient
import {marked} from 'marked';

export default {
  data() {
    return {
      responseMessage: '',
      messages: [], // 添加 messages 数组
      newsDetail: {}, // 添加 newsDetail 对象
      userInput: '', // 添加 userInput 数据属性
      isSending: false, // 添加 isSending 属性
      openAi: openaiClient, // 初始化为 null
      hasFetchedNewsDetail: false, // 添加标志来防止重复调用
      index: 0, // 添加 index 数据属性
    };
  },
  created() {
    this.fetchNewsDetail();
  },
  methods: {
    // 请求https://chat.bncic.com.cn:10000/api/v1/auths/signin获取里面的token
    // async getApiKey() {
    //   try {
    //     const headers = {
    //       'Content-Type': 'application/json',
    //       'Origin': 'https://chat.bncic.com.cn',
    //       'Referer': 'https://chat.bncic.com.cn/auth'
    //     };
    //
    //     const response = await axios.post(
    //         'https://chat.bncic.com.cn/api/v1/auths/signin',
    //         {"email": "", "password": ""},
    //         {headers}
    //     );
    //     // console.log(response.data)
    //     // const token = response.data.token;
    //     // const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 一天后过期
    //     // localStorage.setItem('token', token);
    //     // localStorage.setItem('tokenExpiration', expirationTime);
    //
    //   } catch (error) {
    //     console.error('获取API密钥失败:', error);
    //   }
    // },
    async fetchNewsDetail() {
      try {
        const response = await apiClient.get(`v1/news/${this.$route.params.id}`);
        this.newsDetail = response.data;
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
      await this.sendMessage();
    },
    async sendMessage() {
      if (this.userInput.trim() === "") return;

      this.isSending = true; // 发送开始时禁用按钮

      const userMessage = {
        role: 'user',
        content: this.userInput,
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
      }
      const chatDisplay = document.getElementById("chatDisplay");
      if (chatDisplay) {
        chatDisplay.appendChild(userMessageEle);
      } else {
        console.error('Element with id "chatDisplay" not found');
      }

      // Display the loading message
      const loadingMessage = document.createElement("div");
      loadingMessage.className = "loading-message";
      loadingMessage.innerHTML = "DeepSeek 正在处理中...";
      if (chatDisplay) {
        chatDisplay.appendChild(loadingMessage);
      } else {
        console.error('Element with id "chatDisplay" not found');
      }

      this.messages.push(userMessage);
      this.userInput = ''; // Clear the input box

      try {
        const completion = await this.openAi.chat.completions.create({
          model: "qwen-long", // 此处以qwen-plus为例，可按需更换模型名称。模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
          messages: this.messages,
          stream: true,
        });

        // 创建助手消息元素
        const botMessage = document.createElement("div");
        botMessage.className = "chat-message bot";
        botMessage.innerHTML = `
  <div class="message-header">
    <img src="https://img.icons8.com/ios/50/000000/robot.png" class="avatar" alt="ChatGPT">
    <span class="timestamp">${this.getCurrentTime()}</span>
  </div>
  <div class="message-bubble" id="assistantMessage${++this.index}"></div>
`;
        if (chatDisplay) {
          chatDisplay.appendChild(botMessage);
        } else {
          console.error('Element with id "chatDisplay" not found');
        }

        // 移除加载消息
        if (chatDisplay && chatDisplay.contains(loadingMessage)) {
          chatDisplay.removeChild(loadingMessage);
        }

        let assistantMessageContent = '';
        for await (const chunk of completion) {
          const chunkStr = chunk.choices[0].delta.content || ''; // 确保正确获取 chunk 内容
          assistantMessageContent += chunkStr;
          let assistantMessageElement = document.getElementById("assistantMessage"+this.index);
          assistantMessageElement.innerHTML = this.renderMarkdown(assistantMessageContent);
          // 滚动到底部
          if (chatDisplay) {
            chatDisplay.scrollTop = chatDisplay.scrollHeight;
          }
        }

        const assistantMessage = {
          role: 'system',
          content: assistantMessageContent,
        };
        this.messages.push(assistantMessage);
        this.isSending = false; // 发送成功后启用按钮

      } catch (error) {
        console.error('请求失败:', error);
        this.responseMessage = '请求失败，请稍后再试。';

        this.isSending = false; // 发送失败后启用按钮
      }
    },
    // generateSpecificUUID() {
    //   return uuidv4(); // 使用 uuid 库生成 UUID
    // },
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