import { createRouter, createWebHistory } from 'vue-router'
import NewsList from '@/components/NewsList.vue'
import CategrayNews from "@/components/CategrayNews.vue";
import HotIndustryRanking from "@/components/HotIndustryRanking.vue";
import NewsDetail from "@/components/NewsDetail.vue";

const routes = [
    {
        path: '/',
        name: 'NewsList',
        component: NewsList
    },
    {
        path: '/source/:source',
        name: 'CategrayNews',
        component: CategrayNews
    },
    {
        path: '/ranking',
        name: 'HotIndustryRanking',
        component: HotIndustryRanking,
    },
    {
        path: '/newsdetail/:id',
        name: 'NewsDetail',
        component: NewsDetail,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
