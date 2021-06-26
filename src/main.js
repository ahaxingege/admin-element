import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from '@/api/config.js'
import '@/mock/index.js'
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$http=http
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
router.beforeEach((to,from,next)=>{
	store.commit('getToken')
	let token=store.state.user.token
	if(!token && to.name!='login'){
		next({name:'login'})
	}else{
		next()
	}
})
new Vue({
  router,
  store,
  created() {
  	store.commit('getTags')
	store.commit('addMenus',router)		
  },
  render: h => h(App)
}).$mount('#app')
