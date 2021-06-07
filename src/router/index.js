import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import {beforeEach} from './middleware'

Vue.use(Router)

const router = new Router({
  mode:"history",
  routes,
})
router.beforeEach(beforeEach)
export default router