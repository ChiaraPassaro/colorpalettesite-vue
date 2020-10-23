import "./scss/style.scss";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.devtools = true;
Vue.config.productionTip = false;
// Vue.config.errorHandler = function(err, vm, info) {
//   console.log('[Global Error Handler]: Error in ' + info + ': ' + err);
// };


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
