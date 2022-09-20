import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import AboutView from "../views/AboutView.vue"
import UserView from "../views/UserView.vue"
import EditView from "../views/EditView.vue"
import axios from "axios"
import {auth} from "../Auth"
import {port} from "../components/port"
import HomeView from "../views/HomeView.vue"
import CreateView from "../views/CreateView.vue"
import RecoveryView from "../views/RecoveryView.vue"

const Auth = (to, from, next) => {      
  axios.get(`http://localhost:${port}/auth`, auth()).then(() => {
    next()
  }).catch(err => {
    console.log(err.response.data)
    next("/")
  })
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
    beforeEnter: Auth
  },
  {
    path: "/user/create",
    name: "create", 
    component: CreateView,
    beforeEnter: Auth
  },
  {
    path: "/login", 
    name: "login", 
    component: LoginView
  },
  {
    path: "/recovery", 
    name: "recovery", 
    component: RecoveryView
  },
  {
    path: "/user/edit/:id",
    name: "edit",
    component: EditView, 
    beforeEnter(to, from, next) {
      axios.get(`http://localhost:${port}/auth`, auth()).then(() => {
          next()
        }).catch(err => {
          console.log(err.response.data)
          next("/")
        })
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
