<template>
    <div class="news-container">
        <div class="news-section">
            <h2>行业涨幅排行榜</h2>
            <table class="industry-table">
                <thead>
                    <tr>
                        <th>行业</th>
                        <th>指数</th>
                        <th>涨跌</th>
                        <th>涨幅</th>
                        <th>近5日涨幅</th>
                        <th>近20日涨幅</th>
                        <th>代表个股</th>
                        <th>最新价</th>
                        <th>个股涨跌</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="!upIndustries.length">
                        <td colspan="9">暂无数据</td>
                    </tr>
                    <tr v-for="industry in upIndustries" :key="industry.bd_code">
                        <td><a :href="`https://stockapp.finance.qq.com/mstats/#mod=list&id=${industry.bd_code}&typename=${industry.bd_name}&sign=web`" target="_blank">{{industry.bd_name}}</a></td>
                        <td>{{ industry.bd_zxj }}</td>
                        <td :style="{ color: industry.bd_zd < 0 ? 'green' : 'red' }">{{ industry.bd_zd }}</td>
                        <td :style="{ color: industry.bd_zdf < 0 ? 'green' : 'red' }">{{ industry.bd_zdf }}%</td>
                        <td :style="{ color: industry.bd_zdf5 < 0 ? 'green' : 'red' }">{{ industry.bd_zdf5 }}%</td>
                        <td :style="{ color: industry.bd_zdf20 < 0 ? 'green' : 'red' }">{{ industry.bd_zdf20 }}%</td>
                        <td><a :href="`https://gu.qq.com/${industry.nzg_code}/gp`" target="_blank">{{ industry.nzg_name }}</a></td>
                        <td>{{ industry.nzg_zxj }}</td>
                        <td :style="{ color: industry.nzg_zd < 0 ? 'green' : 'red' }">{{ industry.nzg_zd }} ({{ industry.nzg_zdf }}%)</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="news-section">
            <h2>行业跌幅排行榜</h2>
            <table class="industry-table">
                <thead>
                    <tr>
                        <th>行业</th>
                        <th>指数</th>
                        <th>涨跌</th>
                        <th>跌幅</th>
                        <th>近5日跌幅</th>
                        <th>近20日跌幅</th>
                        <th>代表个股</th>
                        <th>最新价</th>
                        <th>个股涨跌</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="industry in downIndustries" :key="industry.bd_code">
                        <td><a :href="`https://stockapp.finance.qq.com/mstats/#mod=list&id=${industry.bd_code}&typename=${industry.bd_name}&sign=web`" target="_blank">{{industry.bd_name}}</a></td>
                        <td>{{ industry.bd_zxj }}</td>
                        <td :style="{ color: industry.bd_zd < 0 ? 'green' : 'red' }">{{ industry.bd_zd }}</td>
                        <td :style="{ color: industry.bd_zdf < 0 ? 'green' : 'red' }">{{ industry.bd_zdf }}%</td>
                        <td :style="{ color: industry.bd_zdf5 < 0 ? 'green' : 'red' }">{{ industry.bd_zdf5 }}%</td>
                        <td :style="{ color: industry.bd_zdf20 < 0 ? 'green' : 'red' }">{{ industry.bd_zdf20 }}%</td>
                        <td><a :href="`https://gu.qq.com/${industry.nzg_code}/gp`" target="_blank">{{ industry.nzg_name }}</a></td>
                        <td>{{ industry.nzg_zxj }}</td>
                        <td :style="{ color: industry.nzg_zd < 0 ? 'green' : 'red' }">{{ industry.nzg_zd }} ({{ industry.nzg_zdf }}%)</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
/* 排行榜内容区域 */
.news-container {
  padding: 20px;
  max-width: 1200px;
  margin: 10px auto;
  background-color: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.news-section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.news-section h2 {
  color: #003366;
  font-size: 22px;
  margin-bottom: 15px;
}

.news-section a {
  text-decoration: none;
  color: #003366;

}
.industry-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background-color: #f0f2f5;
}

.industry-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  margin-top: 20px;
}

.industry-table th,
.industry-table td {
  padding: 10px;
  border: 1px solid #ddd;
}

.industry-table th {
  background-color: #003366;
  color: #FFFFFF;
}

.industry-table tbody tr:nth-child(even) {
  background-color: #f5f5f5;
}
</style>

<script>
import axios from 'axios'

export default {
  name: 'HotIndustryRanking',
  data() {
    return {
      upIndustries: [],
      downIndustries: []
    }
  },
  created() {
    this.startPolling()
  },
  methods: {
    async fetchIndustryData() {
      try {
        const response = await axios.get('https://proxy.finance.qq.com/ifzqgtimg/appstock/app/mktHs/rank?l=30&p=1&t=01/averatio&ordertype=&o=0')
        
        if (response.data && response.data.data) {
          this.upIndustries = response.data.data
        }
        console.log(this.upIndustries)
      } catch (error) {
        console.error('获取行业数据失败:', error)
      }
    },
    async fetchDownIndustryData() {
      try {
        const response = await axios.get('https://proxy.finance.qq.com/ifzqgtimg/appstock/app/mktHs/rank?l=30&p=1&t=01/averatio&ordertype=&o=1')
        
        if (response.data && response.data.data) {
          this.downIndustries = response.data.data
        }
        console.log(this.downIndustries)
      } catch (error) {
        console.error('获取行业跌幅数据失败:', error)
      }
    },
    startPolling() {
      // 立即执行一次
      this.fetchIndustryData()
      this.fetchDownIndustryData()
      // 设置定时器,每分钟执行一次
      this.timer = setInterval(() => {
        this.fetchIndustryData();
        this.fetchDownIndustryData();
      }, 60000)
    },
    stopPolling() {
      if (this.timer) {
        clearInterval(this.timer)
      }
    }
  }
}
</script>