import Vue from 'vue'
import App from './App.vue'
import progresschart from '../packages'
Vue.use(progresschart)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
