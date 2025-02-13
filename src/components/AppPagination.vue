<template>
  <div class="pagination">
    <!-- 上一页按钮 -->
    <button @click="prevPage" :disabled="currentPage === 1">上一页</button>

    <!-- 当前页码 -->
    <span>{{ currentPage }}</span>

    <!-- 下一页按钮 -->
    <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
  </div>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  emits: ['page-change'],
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.$emit('page-change', this.currentPage - 1)
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('page-change', this.currentPage + 1)
      }
    }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

button {
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  background-color: #FF0000; /* 修改: 主色调改为红色 */
  color: white;
  cursor: pointer;
}

button:disabled {
  background-color: #CCCCCC;
  cursor: not-allowed;
}

span {
  margin: 0 10px;
  font-size: 16px;
}
</style>