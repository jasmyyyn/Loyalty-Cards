import { createRouter, createWebHistory } from 'vue-router'
import AllCards from '../views/AllCards.vue'
import CreateCard from '../views/CreateCard.vue'
import OneCard from '../views/OneCard.vue'

const routes = [
  { path: '/cards', component: AllCards },
  { path: '/cards/new', component: CreateCard },
  { path: '/cards/:card_number', component: OneCard },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router