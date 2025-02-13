import { createRouter, createWebHistory } from 'vue-router'
import NewsList from '@/components/NewsList.vue'
import CategrayNews from "@/components/CategrayNews.vue";

const routes = [
    {
        path: '/',
        name: 'NewsList',
        component: NewsList
    },
    {
        path: '/source/:source',
        name: 'CategrayNews',
        component: CategrayNews,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
