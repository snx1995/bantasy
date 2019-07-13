// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';

Vue.config.productionTip = false

// axios.interceptors.request.use(config => {
//   if (user) {
//       if (!config.params) config.params = {token: user.token};
//       else config.params.token = user.token;
//   }
//   return config;
// }, error => {
//   // toastr.error("error");
//   throw error;
// });

axios.interceptors.response.use(response => {
  if (response.status >= 200 && response.status < 300) return response.data;
  return {error: response.status};
}, error => {
  throw error;
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
