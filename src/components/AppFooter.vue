<template>
  <!-- 底部样式 -->
  <footer>
<!--    <div class="footer-links">-->
<!--      <a href="#">关于我们</a>-->
<!--      <a href="#">联系我们</a>-->
<!--      <a href="#">隐私政策</a>-->
<!--      <a href="#">服务条款</a>-->
<!--    </div>-->
<!--    <div class="social-icons">-->
<!--      <a href="#"><img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook"></a>-->
<!--      <a href="#"><img src="https://img.icons8.com/color/48/000000/twitter.png" alt="Twitter"></a>-->
<!--      <a href="#"><img src="https://img.icons8.com/color/48/000000/linkedin.png" alt="LinkedIn"></a>-->
<!--    </div>-->
    <div class="copyright">
      &copy; 2025 股票新闻聚合. 保留所有权利.
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter' // 修改: 将组件名称改为 AppFooter
}
</script>

<style scoped>
/* 底部样式 */
footer {
  background-color: #FFFFFF; /* 白色背景 */
  padding: 20px;
  text-align: center;
  border-top: 2px solid #FF0000; /* 红色顶边 */
}

footer .footer-links a {
  color: #FF0000; /* 红色文字 */
  margin: 0 10px;
  font-size: 14px;
}

footer .footer-links a:hover {
  color: #003366; /* 深蓝色悬停效果 */
}

footer .social-icons {
  margin: 10px 0;
}

footer .social-icons img {
  width: 24px;
  height: 24px;
  margin: 0 10px;
  transition: opacity 0.3s ease;
}

footer .social-icons img:hover {
  opacity: 0.7;
}

footer .copyright {
  color: #333333; /* 深灰色文字 */
  font-size: 14px;
  margin-top: 10px;
}
</style>