import Vue from 'vue';
import ElementUI, { Dialog } from 'element-ui';
import { API_LOG_URL } from './config';
/**
 * 全局样式
 */
import './assets/styles/index.scss';
/**
 * 入口组件
 */
import App from './App.vue';
/**
 * 路由
 */
import router from './router';
/**
 * 数据仓库
 */
import store from './store';
/**
 * http服务资源
 */
import './service';
/**
 * http服务资源，封装api接口
 */
import './service/api';
/**
 * 自定义指令
 */
import './directive';
/**
 * 自定义过滤器
 */
import './filter';
/**
 * 标签集
 */
// import Tabset from './lib/tabset';
/**
 * 权限管理
 */
import Permission from './lib/permission';
/**
 * 日记管理
 */
import Log from './lib/log';
/**
 * 日记管理
 */
import Perf from './lib/perf';

Dialog.props = Object.assign(Dialog.props, {
  appendToBody: {
    type: Boolean,
    default: true,
  },
  closeOnClickModal: {
    type: Boolean,
    default: false,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: false,
  },
});
Vue.use(ElementUI);
// Vue.use(Tabset, store, {});
Vue.use(Permission, store);
Vue.use(Log, {
  url: API_LOG_URL,
  delay: 30000,
  enable: false,
});
Vue.use(Perf, false);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
