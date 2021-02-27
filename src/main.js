import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式
import './styles/index.less'
// 导入移动端vant组件
import Vant from 'vant'
import 'vant/lib/index.css'
// 导入动态设置rem基准值
import 'amfe-flexible'
// 导入时间组件
import './utils/dayjs'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
