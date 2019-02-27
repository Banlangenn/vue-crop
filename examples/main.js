import Vue from 'vue'
import App from './App.vue'
import crop from '../lib/vue-cropbalg.umd'
Vue.use(crop)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
