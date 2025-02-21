(function(){"use strict";var e={4232:function(e,t,n){var a=n(5130),s=n(6768);const r={id:"app"};function o(e,t,n,a,o,l){const i=(0,s.g2)("AppHeader"),c=(0,s.g2)("StockIndex"),d=(0,s.g2)("router-view"),u=(0,s.g2)("AppFooter");return(0,s.uX)(),(0,s.CE)("div",r,[(0,s.bF)(i),(0,s.bF)(c),(0,s.bF)(d),(0,s.bF)(u)])}var l=n.p+"img/logo.e6b7f4bc.webp";function i(e,t,n,a,r,o){return(0,s.uX)(),(0,s.CE)("header",null,t[0]||(t[0]=[(0,s.Fv)('<div class="logo" data-v-09aa433c><img src="'+l+'" alt="股票新闻聚合 Logo" class="logo-image" data-v-09aa433c> 股票新闻聚合 </div><nav data-v-09aa433c><a href="/" data-v-09aa433c>首页</a><a href="/ranking" data-v-09aa433c>热门行业排行榜</a><a href="#" data-v-09aa433c>市场动态</a><a href="#" data-v-09aa433c>关于我们</a></nav>',2)]))}var c={name:"AppHeader"},d=n(1241);const u=(0,d.A)(c,[["render",i],["__scopeId","data-v-09aa433c"]]);var p=u;function h(e,t,n,a,r,o){return(0,s.uX)(),(0,s.CE)("footer",null,t[0]||(t[0]=[(0,s.Lk)("div",{class:"copyright"}," © 2025 股票新闻聚合. 保留所有权利. ",-1)]))}var v={name:"AppFooter"};const g=(0,d.A)(v,[["render",h],["__scopeId","data-v-d56266c4"]]);var k=g,m=(n(8992),n(4520),n(1454),n(1851)),f=n(144);const _={class:"stock-indices"},b={class:"stock-indices-container"},L=["href"],y={class:"index-name"},w={class:"index-value"},C={key:0,class:"index-change-value positive"},I={key:1,class:"index-change-value negative"},z={key:2,class:"index-change positive"},E={key:3,class:"index-change negative"},x={class:"index-volume"},D={key:0},$={key:1},M={class:"index-turnover"},P={key:0},S={key:1},X="https://sqt.gtimg.cn/qt?app=tengxuncaijing&q=s_sh000001,s_sz399001,s_sz399006,s_sh000688,s_sh000300,s_hkHSI,s_usDJI,s_usIXIC,s_usINX";var F={__name:"StockIndex",setup(e){const t=(0,f.KR)([]),n=async()=>{try{const e=await fetch(X,{headers:{Accept:"text/html; charset=GBK"}}),n=await e.arrayBuffer(),a=new TextDecoder("gbk"),s=a.decode(n),r=s.split(";").filter((e=>""!==e.trim()));t.value=r.map((e=>{const t=e.split("=")[0]?.replace(/"/g,"").trim(),n=e.split("=")[1]?.replace(/"/g,"").trim();if(!n)return null;const a=n.split("~"),s=t.replace("v_s_","");return{id:a[0],name:decodeURIComponent(a[1]),code:s,value:parseFloat(a[3]),change:parseFloat(a[4]),percentageChange:parseFloat(a[5]),volume:parseFloat(a[6]),turnover:parseFloat(a[7])}})).filter((e=>e))}catch(e){console.error("数据请求失败:",e)}};return(0,s.sV)((()=>{n()})),(e,a)=>((0,s.uX)(),(0,s.CE)("div",_,[(0,s.Lk)("div",b,[(0,s.Lk)("button",{onClick:n,class:"refresh-button"},"刷新数据"),((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(t.value,(e=>((0,s.uX)(),(0,s.CE)("div",{class:"stock-item",key:e.id},[(0,s.Lk)("a",{class:"stock-link",href:`https://gu.qq.com/${e.code}/zs`,target:"_blank"},[(0,s.Lk)("div",y,(0,m.v_)(e.name),1),(0,s.Lk)("div",w,(0,m.v_)(e.value),1),e.change.toString().includes("-")?((0,s.uX)(),(0,s.CE)("div",C,(0,m.v_)(e.change),1)):((0,s.uX)(),(0,s.CE)("div",I,(0,m.v_)(e.change),1)),e.percentageChange.toString().includes("-")?((0,s.uX)(),(0,s.CE)("div",z,(0,m.v_)(e.percentageChange)+"% ",1)):((0,s.uX)(),(0,s.CE)("div",E,(0,m.v_)(e.percentageChange)+"% ",1)),(0,s.Lk)("div",x,[e.volume>=1e8?((0,s.uX)(),(0,s.CE)("span",D,(0,m.v_)(Math.floor(e.volume/1e8))+"亿手",1)):((0,s.uX)(),(0,s.CE)("span",$,(0,m.v_)(Math.floor(e.volume/1e4))+"万手",1))]),(0,s.Lk)("div",M,[e.turnover>=1e4?((0,s.uX)(),(0,s.CE)("span",P,(0,m.v_)(Math.floor(e.turnover/1e4))+"亿",1)):((0,s.uX)(),(0,s.CE)("span",S,(0,m.v_)(e.turnover)+"万",1))])],8,L)])))),128))])]))}};const A=(0,d.A)(F,[["__scopeId","data-v-b5ee3092"]]);var T=A,q={name:"App",components:{AppHeader:p,AppFooter:k,StockIndex:T}};const H=(0,d.A)(q,[["render",o]]);var K=H,N=n(1387),R=n(4373),j=n(59);const O=R.A.create({baseURL:"https://news.ykcode.top/api/"}),B=new j.Ay({apiKey:"sk-13fa96f5a29f4afebd5ae793767a26f6",baseURL:"https://dashscope.aliyuncs.com/compatible-mode/v1",dangerouslyAllowBrowser:!0}),U={class:"news-container"},V={class:"total-news-count"},W={class:"content"};var G={__name:"NewsList",setup(e){const t=[{title:"今日美股网",source:"todayusstock"},{title:"东方财富网",source:"eastmoney"},{title:"证券时报网",source:"stcn"}],n=(0,f.KR)({});var a=0;const r=async(e,t)=>{try{const s=await O.get(`/v1/news/list?source=${e}`);n.value[t]=s.data.news,a+=s.data.totalCount}catch(s){console.error("Failed to fetch news:",s)}};t.forEach((e=>{r(e.source,e.title)})),(0,s.sV)((()=>{}));const o=e=>{const t=new Date,n=t-new Date(e),a=Math.floor(n/1e3),s=Math.floor(a/60),r=Math.floor(s/60),o=Math.floor(r/24);return o>0?`${o}天前`:r>0?`${r}小时前`:s>0?`${s}分钟前`:"刚刚"};return(e,r)=>{const l=(0,s.g2)("router-link");return(0,s.uX)(),(0,s.CE)("div",U,[(0,s.Lk)("div",V,[(0,s.Lk)("p",null,"新闻总数: "+(0,m.v_)((0,f.R1)(a)),1)]),((0,s.uX)(),(0,s.CE)(s.FK,null,(0,s.pI)(t,((e,t)=>(0,s.Lk)("div",{key:t,class:"news-section"},[(0,s.bF)(l,{to:`/source/${e.source}`,class:"no-underline"},{default:(0,s.k6)((()=>[(0,s.Lk)("h2",null,(0,m.v_)(e.title),1)])),_:2},1032,["to"]),((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(n.value[e.title],(e=>((0,s.uX)(),(0,s.CE)("div",{key:e.id,class:"news-item"},[(0,s.bF)(l,{class:"no-underline",to:`/newsdetail/${e.id}`},{default:(0,s.k6)((()=>[(0,s.Lk)("h3",null,(0,m.v_)(e.title),1)])),_:2},1032,["to"]),(0,s.Lk)("p",W,(0,m.v_)(e.content?e.content.slice(0,80)+(e.content.length>50?"...":""):""),1),r[0]||(r[0]=(0,s.Lk)("p",null,null,-1)),(0,s.Lk)("p",null,[(0,s.Lk)("span",null,(0,m.v_)(e.category),1),(0,s.eW)(" "+(0,m.v_)(o(e.publish_time)),1)])])))),128))]))),64))])}}};const J=(0,d.A)(G,[["__scopeId","data-v-9c43feda"]]);var Q=J;const Y={class:"pagination"},Z=["disabled"],ee=["disabled"];function te(e,t,n,a,r,o){return(0,s.uX)(),(0,s.CE)("div",Y,[(0,s.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>o.prevPage&&o.prevPage(...e)),disabled:1===n.currentPage},"上一页",8,Z),(0,s.Lk)("span",null,(0,m.v_)(n.currentPage),1),(0,s.Lk)("button",{onClick:t[1]||(t[1]=(...e)=>o.nextPage&&o.nextPage(...e)),disabled:n.currentPage===n.totalPages},"下一页",8,ee)])}var ne={name:"PaginationComponent",props:{currentPage:{type:Number,required:!0},totalPages:{type:Number,required:!0}},emits:["page-change"],methods:{prevPage(){this.currentPage>1&&this.$emit("page-change",this.currentPage-1)},nextPage(){this.currentPage<this.totalPages&&this.$emit("page-change",this.currentPage+1)}}};const ae=(0,d.A)(ne,[["render",te],["__scopeId","data-v-0065ceb0"]]);var se=ae;const re={class:"news-container"},oe={class:"total-news-count"},le={class:"news-section"},ie=["onClick"],ce={class:"content"};var de={__name:"CategrayNews",setup(e){const t={todayusstock:"今日美股网",eastmoney:"东方财富网",stcn:"证券时报网"},n=(0,f.KR)({}),a=(0,f.KR)(0),r=(0,f.KR)(0),o=(0,N.lq)(),l=o.params.source;let i=parseInt(o.params.page)||1,c=parseInt(o.params.pageSize)||10;const d=async(e,t,s)=>{try{const o=await O.get(`/v1/news/list?source=${e}&page=${s}&pageSize=${c}`);n.value[t]=o.data.news,a.value=parseInt(o.data.totalCount),r.value=Math.ceil(a.value/c)}catch(o){console.error("Failed to fetch news:",o)}};(0,s.sV)((()=>{d(l,t[l],i)}));const u=e=>{const t=new Date,n=t-new Date(e),a=Math.floor(n/1e3),s=Math.floor(a/60),r=Math.floor(s/60),o=Math.floor(r/24);return o>0?`${o}天前`:r>0?`${r}小时前`:s>0?`${s}分钟前`:"刚刚"},p=e=>{window.open(e,"_blank")},h=e=>{i=e,d(l,t[l],i)};return(e,o)=>((0,s.uX)(),(0,s.CE)("div",re,[(0,s.Lk)("div",oe,[(0,s.Lk)("p",null,"新闻总数: "+(0,m.v_)(a.value),1)]),(0,s.Lk)("div",le,[(0,s.Lk)("h2",null,(0,m.v_)(t[(0,f.R1)(l)]),1),((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(n.value[t[(0,f.R1)(l)]],(e=>((0,s.uX)(),(0,s.CE)("div",{key:e.id,class:"news-item"},[(0,s.Lk)("h3",null,[(0,s.Lk)("div",{class:"news-link",onClick:t=>p(e.link)},(0,m.v_)(e.title),9,ie)]),(0,s.Lk)("p",ce,(0,m.v_)(e.content?e.content.slice(0,80)+(e.content.length>50?"...":""):""),1),o[0]||(o[0]=(0,s.Lk)("p",null,null,-1)),(0,s.Lk)("p",null,[(0,s.Lk)("span",null,(0,m.v_)(e.category),1),(0,s.eW)(" "+(0,m.v_)(u(e.publish_time)),1)])])))),128))]),(0,s.bF)(se,{currentPage:(0,f.R1)(i),totalPages:r.value,onPageChange:h},null,8,["currentPage","totalPages"])]))}};const ue=(0,d.A)(de,[["__scopeId","data-v-fb7f894c"]]);var pe=ue;const he={class:"news-container"},ve={class:"table-responsive"},ge={class:"industry-table"},ke={key:0},me=["href"],fe=["href"],_e={class:"news-container"},be={class:"table-responsive"},Le={class:"industry-table"},ye=["href"],we=["href"];function Ce(e,t,n,a,r,o){return(0,s.uX)(),(0,s.CE)(s.FK,null,[(0,s.Lk)("div",he,[t[2]||(t[2]=(0,s.Lk)("h2",null,"行业涨幅排行榜",-1)),(0,s.Lk)("div",ve,[(0,s.Lk)("table",ge,[t[1]||(t[1]=(0,s.Lk)("thead",null,[(0,s.Lk)("tr",null,[(0,s.Lk)("th",{class:"responsive-header"},"行业"),(0,s.Lk)("th",{class:"responsive-header"},"指数"),(0,s.Lk)("th",{class:"responsive-header"},"涨跌"),(0,s.Lk)("th",{class:"responsive-header"},"涨幅"),(0,s.Lk)("th",{class:"responsive-header"},"近5日涨幅"),(0,s.Lk)("th",{class:"responsive-header"},"近20日涨幅"),(0,s.Lk)("th",{class:"responsive-header"},"代表个股"),(0,s.Lk)("th",{class:"responsive-header"},"最新价"),(0,s.Lk)("th",{class:"responsive-header"},"个股涨跌")])],-1)),(0,s.Lk)("tbody",null,[r.upIndustries.length?(0,s.Q3)("",!0):((0,s.uX)(),(0,s.CE)("tr",ke,t[0]||(t[0]=[(0,s.Lk)("td",{colspan:"9"},"暂无数据",-1)]))),((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(r.upIndustries,(e=>((0,s.uX)(),(0,s.CE)("tr",{key:e.bd_code},[(0,s.Lk)("td",null,[(0,s.Lk)("a",{href:`https://stockapp.finance.qq.com/mstats/#mod=list&id=${e.bd_code}&typename=${e.bd_name}&sign=web`,target:"_blank"},(0,m.v_)(e.bd_name),9,me)]),(0,s.Lk)("td",null,(0,m.v_)(e.bd_zxj),1),(0,s.Lk)("td",{style:(0,m.Tr)({color:e.bd_zd<0?"green":"red"})},(0,m.v_)(e.bd_zd),5),(0,s.Lk)("td",{style:(0,m.Tr)({color:e.bd_zdf<0?"green":"red"})},(0,m.v_)(e.bd_zdf)+"%",5),(0,s.Lk)("td",{style:(0,m.Tr)({color:e.bd_zdf5<0?"green":"red"})},(0,m.v_)(e.bd_zdf5)+"%",5),(0,s.Lk)("td",{style:(0,m.Tr)({color:e.bd_zdf20<0?"green":"red"})},(0,m.v_)(e.bd_zdf20)+"%",5),(0,s.Lk)("td",null,[(0,s.Lk)("a",{href:`https://gu.qq.com/${e.nzg_code}/gp`,target:"_blank"},(0,m.v_)(e.nzg_name),9,fe)]),(0,s.Lk)("td",null,(0,m.v_)(e.nzg_zxj),1),(0,s.Lk)("td",{style:(0,m.Tr)({color:e.nzg_zd<0?"green":"red"})},(0,m.v_)(e.nzg_zd)+" ("+(0,m.v_)(e.nzg_zdf)+"%) ",5)])))),128))])])])]),(0,s.Lk)("div",_e,[t[4]||(t[4]=(0,s.Lk)("h2",null,"行业跌幅排行榜",-1)),(0,s.Lk)("div",be,[(0,s.Lk)("table",Le,[t[3]||(t[3]=(0,s.Lk)("thead",null,[(0,s.Lk)("tr",null,[(0,s.Lk)("th",null,"行业"),(0,s.Lk)("th",null,"指数"),(0,s.Lk)("th",null,"涨跌"),(0,s.Lk)("th",null,"跌幅"),(0,s.Lk)("th",null,"近5日跌幅"),(0,s.Lk)("th",null,"近20日跌幅"),(0,s.Lk)("th",null,"代表个股"),(0,s.Lk)("th",null,"最新价"),(0,s.Lk)("th",null,"个股涨跌")])],-1)),(0,s.Lk)("tbody",null,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(r.downIndustries,(e=>((0,s.uX)(),(0,s.CE)("tr",{key:e.bd_code},[(0,s.Lk)("td",null,[(0,s.Lk)("a",{href:`https://stockapp.finance.qq.com/mstats/#mod=list&id=${e.bd_code}&typename=${e.bd_name}&sign=web`,target:"_blank"},(0,m.v_)(e.bd_name),9,ye)]),(0,s.Lk)("td",null,(0,m.v_)(e.bd_zxj),1),(0,s.Lk)("td",{style:(0,m.Tr)({color:e.bd_zd<0?"green":"red"})},(0,m.v_)(e.bd_zd),5),(0,s.Lk)("td",{style:(0,m.Tr)({color:e.bd_zdf<0?"green":"red"})},(0,m.v_)(e.bd_zdf)+"%",5),(0,s.Lk)("td",{style:(0,m.Tr)({color:e.bd_zdf5<0?"green":"red"})},(0,m.v_)(e.bd_zdf5)+"%",5),(0,s.Lk)("td",{style:(0,m.Tr)({color:e.bd_zdf20<0?"green":"red"})},(0,m.v_)(e.bd_zdf20)+"%",5),(0,s.Lk)("td",null,[(0,s.Lk)("a",{href:`https://gu.qq.com/${e.nzg_code}/gp`,target:"_blank"},(0,m.v_)(e.nzg_name),9,we)]),(0,s.Lk)("td",null,(0,m.v_)(e.nzg_zxj),1),(0,s.Lk)("td",{style:(0,m.Tr)({color:e.nzg_zd<0?"green":"red"})},(0,m.v_)(e.nzg_zd)+" ("+(0,m.v_)(e.nzg_zdf)+"%) ",5)])))),128))])])])])],64)}var Ie={name:"HotIndustryRanking",data(){return{upIndustries:[],downIndustries:[]}},created(){this.startPolling()},methods:{async fetchIndustryData(){try{const e=await R.A.get("https://proxy.finance.qq.com/ifzqgtimg/appstock/app/mktHs/rank?l=30&p=1&t=01/averatio&ordertype=&o=0");e.data&&e.data.data&&(this.upIndustries=e.data.data),console.log(this.upIndustries)}catch(e){console.error("获取行业数据失败:",e)}},async fetchDownIndustryData(){try{const e=await R.A.get("https://proxy.finance.qq.com/ifzqgtimg/appstock/app/mktHs/rank?l=30&p=1&t=01/averatio&ordertype=&o=1");e.data&&e.data.data&&(this.downIndustries=e.data.data),console.log(this.downIndustries)}catch(e){console.error("获取行业跌幅数据失败:",e)}},startPolling(){this.fetchIndustryData(),this.fetchDownIndustryData(),this.timer=setInterval((()=>{this.fetchIndustryData(),this.fetchDownIndustryData()}),6e4)},stopPolling(){this.timer&&clearInterval(this.timer)}}};const ze=(0,d.A)(Ie,[["render",Ce],["__scopeId","data-v-288a9131"]]);var Ee=ze;const xe={class:"news-detail-container"},De={class:"news-content"},$e={class:"news-title"},Me={class:"news-detail"},Pe={class:"view-original"},Se=["href"],Xe={class:"chat-box"},Fe={class:"chat-input-area"},Ae=["disabled"];function Te(e,t,n,r,o,l){return(0,s.uX)(),(0,s.CE)("div",xe,[(0,s.Lk)("div",De,[(0,s.Lk)("div",$e,(0,m.v_)(o.newsDetail.title),1),(0,s.Lk)("div",Me,[(0,s.Lk)("p",null,(0,m.v_)(o.newsDetail.content),1)]),(0,s.Lk)("div",Pe,[(0,s.Lk)("a",{href:o.newsDetail.link,target:"_blank"},"查看原文",8,Se)])]),(0,s.Lk)("div",Xe,[t[2]||(t[2]=(0,s.Lk)("div",{class:"chat-display",id:"chatDisplay"},null,-1)),(0,s.Lk)("div",Fe,[(0,s.bo)((0,s.Lk)("input",{type:"text",class:"chat-input",id:"userInput",placeholder:"请输入您的问题...","onUpdate:modelValue":t[0]||(t[0]=e=>o.userInput=e)},null,512),[[a.Jo,o.userInput]]),(0,s.Lk)("button",{class:(0,m.C4)(["chat-submit",{disabled:o.isSending}]),onClick:t[1]||(t[1]=(...e)=>l.sendMessage&&l.sendMessage(...e)),disabled:o.isSending},"发送",10,Ae)])])])}n(4114);var qe=n(357),He={data(){return{responseMessage:"",messages:[],newsDetail:{},userInput:"",isSending:!1,openAi:B,hasFetchedNewsDetail:!1,index:0}},created(){this.fetchNewsDetail()},methods:{async fetchNewsDetail(){try{const e=await O.get(`v1/news/${this.$route.params.id}`);this.newsDetail=e.data}catch(e){console.error("获取新闻详情失败:",e)}this.userInput="你是一个股票专家，专业分析时事新闻，寻找其中投资方向，并找到相关股票代码：\n1. 完整股票代码，并给出选中原因\n2. 你是一个新手玩家，只投资股价很低的潜力股票，大资金量的盘不参与不推荐。\n3. 给出初级入门投资前景，涨幅高的潜力股票，你得资金只有3W，只玩国内科创板的条件，如果不适合开头直接给出不适合投资的意见即可。\n4. 给出合理的投资事件和买入时机和抛出时机，并给出理由\n5. 今天看到以下新闻内容："+this.newsDetail.content+"\n6. 从中能发现利好哪些股票？给出具体股票名字 没有就不给即可 适不适合低门槛我这个资金量的人玩？  ",await this.sendMessage()},async sendMessage(){if(""===this.userInput.trim())return;this.isSending=!0;const e={role:"user",content:this.userInput},t=this.getCurrentTime(),n=document.createElement("div");n.className="chat-message user",this.messages.length>1&&(n.innerHTML=`\n<div class="message-header">\n  <img src="https://img.icons8.com/ios/50/000000/user-male.png" class="avatar" alt="User">\n  <span class="timestamp">${t}</span>\n</div>\n<div class="message-bubble">${this.renderMarkdown(this.userInput)}</div>\n`);const a=document.getElementById("chatDisplay");a?a.appendChild(n):console.error('Element with id "chatDisplay" not found');const s=document.createElement("div");s.className="loading-message",s.innerHTML="DeepSeek 正在处理中...",a?a.appendChild(s):console.error('Element with id "chatDisplay" not found'),this.messages.push(e),this.userInput="";try{const e=await this.openAi.chat.completions.create({model:"qwen-long",messages:this.messages,stream:!0}),t=document.createElement("div");t.className="chat-message bot",t.innerHTML=`\n  <div class="message-header">\n    <img src="https://img.icons8.com/ios/50/000000/robot.png" class="avatar" alt="ChatGPT">\n    <span class="timestamp">${this.getCurrentTime()}</span>\n  </div>\n  <div class="message-bubble" id="assistantMessage${++this.index}"></div>\n`,a?a.appendChild(t):console.error('Element with id "chatDisplay" not found'),a&&a.contains(s)&&a.removeChild(s);let n="";for await(const s of e){const e=s.choices[0].delta.content||"";n+=e;let t=document.getElementById("assistantMessage"+this.index);t.innerHTML=this.renderMarkdown(n),a&&(a.scrollTop=a.scrollHeight)}const r={role:"system",content:n};this.messages.push(r),this.isSending=!1}catch(r){console.error("请求失败:",r),this.responseMessage="请求失败，请稍后再试。",this.isSending=!1}},renderMarkdown(e){return(0,qe.xI)(e)},getCurrentTime(){const e=new Date,t=e.getFullYear(),n=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0"),s=String(e.getHours()).padStart(2,"0"),r=String(e.getMinutes()).padStart(2,"0"),o=String(e.getSeconds()).padStart(2,"0");return`${t}-${n}-${a} ${s}:${r}:${o}`}}};const Ke=(0,d.A)(He,[["render",Te]]);var Ne=Ke;const Re=[{path:"/",name:"NewsList",component:Q},{path:"/source/:source",name:"CategrayNews",component:pe},{path:"/ranking",name:"HotIndustryRanking",component:Ee},{path:"/newsdetail/:id",name:"NewsDetail",component:Ne}],je=(0,N.aE)({history:(0,N.LA)("/"),routes:Re});var Oe=je;const Be=(0,a.Ef)(K);Be.use(Oe),Be.mount("#app")}},t={};function n(a){var s=t[a];if(void 0!==s)return s.exports;var r=t[a]={exports:{}};return e[a].call(r.exports,r,r.exports,n),r.exports}n.m=e,function(){var e=[];n.O=function(t,a,s,r){if(!a){var o=1/0;for(d=0;d<e.length;d++){a=e[d][0],s=e[d][1],r=e[d][2];for(var l=!0,i=0;i<a.length;i++)(!1&r||o>=r)&&Object.keys(n.O).every((function(e){return n.O[e](a[i])}))?a.splice(i--,1):(l=!1,r<o&&(o=r));if(l){e.splice(d--,1);var c=s();void 0!==c&&(t=c)}}return t}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[a,s,r]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/"}(),function(){var e={524:0};n.O.j=function(t){return 0===e[t]};var t=function(t,a){var s,r,o=a[0],l=a[1],i=a[2],c=0;if(o.some((function(t){return 0!==e[t]}))){for(s in l)n.o(l,s)&&(n.m[s]=l[s]);if(i)var d=i(n)}for(t&&t(a);c<o.length;c++)r=o[c],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(d)},a=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=n.O(void 0,[504],(function(){return n(4232)}));a=n.O(a)})();
//# sourceMappingURL=app.e85ed960.js.map