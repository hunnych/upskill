import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import './common/filter.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'
import VueMaterial from 'vue-material'
import 'vue-material/dist/theme/default-dark.css'
import 'vue-material/dist/vue-material.min.css'
import router from './router'
import VeeValidate from 'vee-validate';
import 'nprogress/nprogress.css'

Vue.use(VeeValidate);
Vue.use(VueMaterial);


Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router:router,
  store,
  render: h => h(App)
}).$mount('#app')
