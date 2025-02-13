<script setup>
import { ref, onMounted } from 'vue';

const stocks = ref([]);

const apiUrl = "https://sqt.gtimg.cn/qt?app=tengxuncaijing&q=s_sh000001,s_sz399001,s_sz399006,s_sh000688,s_sh000300,s_hkHSI,s_usDJI,s_usIXIC,s_usINX";

const fetchData = async () => {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'text/html; charset=GBK'
      }
    });
    const arrayBuffer = await response.arrayBuffer();
    const decoder = new TextDecoder('gbk');
    const textData = decoder.decode(arrayBuffer);

    // 解析数据
    const stockLines = textData.split(";").filter((line) => line.trim() !== "");

    stocks.value = stockLines.map((line) => {
      
      // 提取等号后的数据并去除引号和空格
      const id = line.split("=")[0]?.replace(/"/g, "").trim();
      const dataString = line.split("=")[1]?.replace(/"/g, "").trim();

      if (!dataString) return null;

      const data = dataString.split("~");
      // 修改: id去除 v_s_ 前缀
      const code = id.replace("v_s_", "");
      return {
        id: data[0], // 指数类型 (1:上证, 51:深证, 100:港股, 200:美股)
        name: decodeURIComponent(data[1]), // 指数名称,解决中文乱码
        code: code, // 指数代码 (如000001, 399001, HSI等)
        value: parseFloat(data[3]), // 当前点位
        change: parseFloat(data[4]), // 涨跌值
        percentageChange: parseFloat(data[5]), // 涨跌幅 %
        volume: parseFloat(data[6]), // 成交量(手)
        turnover: parseFloat(data[7]), // 成交额(万元)
      };
    }).filter((stock) => stock); // 过滤掉可能为空的数据

  } catch (error) {
    console.error("数据请求失败:", error);
  }
};

onMounted(() => {
  fetchData(); // 组件挂载时加载数据
});
</script>

<template>
  <!-- 新增股票指数板块 -->
  <div class="stock-indices">
    <div class="stock-indices-container">
      <button @click="fetchData" class="refresh-button">刷新数据</button>

      <div class="stock-item" v-for="stock in stocks" :key="stock.id">
        <a class="stock-link" :href="`https://gu.qq.com/${stock.code}/zs`" target="_blank">
          <div class="index-name">{{ stock.name }}</div>
          <div class="index-value">{{ stock.value }}</div>
          <!-- 通过正负数来填写是positive 还是 negative -->
          <div v-if="stock.change.toString().includes('-')" class="index-change-value positive">
            {{ stock.change }}
          </div>
          <div v-else class="index-change-value negative">
            {{ stock.change }}
          </div>
          <div v-if="stock.percentageChange.toString().includes('-')" class="index-change positive">
            {{ stock.percentageChange }}%
          </div>
          <div v-else class="index-change negative">
            {{ stock.percentageChange }}%
          </div>
          <div class="index-volume">
            <!-- 修改: 根据单位展示成交量 -->
            <span v-if="stock.volume >= 100000000">{{ Math.floor(stock.volume / 100000000) }}亿手</span>
            <span v-else>{{ Math.floor(stock.volume / 10000) }}万手</span>
          </div>
          <div class="index-turnover">
            <!-- 修改: 根据单位展示成交额 -->
            <span v-if="stock.turnover >= 10000">{{ Math.floor(stock.turnover / 10000) }}亿</span>
            <span v-else>{{ stock.turnover }}万</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 新增股票指数板块样式 */
.stock-indices {
  background-color: #FFFFFF;
  padding: 15px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  border-bottom: 1px solid #F5F5F5; /* 底部浅灰分隔线 */
}

.stock-indices-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  overflow-x: auto; /* 支持横向滚动 */
}

.stock-item {
  flex: 1;
  min-width: 180px; /* 最小宽度避免内容挤压 */
  padding: 10px;
  text-align: center;
  background-color: #F5F5F5;
  border-radius: 5px;
  transition: transform 0.2s ease; /* 悬停动效 */
}

.stock-item:hover {
  transform: translateY(-2px);
}

.index-name {
  color: #333333;
  font-size: 14px;
  margin-bottom: 5px;
}

.index-value {
  color: #000000;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.index-volume {
  color: #000000;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.index-turnover {
  color: #000000;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.index-change {
  font-size: 14px;
}

.positive {
  color: #00AA00; /* 上涨绿色 */
}

.negative {
  color: #FF0000; /* 下跌红色 */
}

.stock-link {
  text-decoration: none; /* 移除下划线 */
  color: inherit; /* 继承父元素颜色 */
  cursor: pointer; /* 添加鼠标指针样式 */
}

/* 新增按钮样式 */
.refresh-button {
  background-color: #003366; /* 修改为红色 */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.refresh-button:hover {
  background-color: #666666; /* 修改为深红色 */
}
</style>