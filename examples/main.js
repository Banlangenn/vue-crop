import Vue from 'vue'
import App from './App.vue'
import progresschart from '../lib/vue-progresschart.umd'
Vue.use(progresschart)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
