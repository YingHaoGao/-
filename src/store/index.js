import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import modules from './modules';
import actions from './actions';
import mutations from './mutations';
import JSEncodePlugin from '../jsEncodePlugin';

Vue.use(Vuex);
// 参与本地存储
const includeStorageState = [
  'token',
  'userinfo',
  'language',
  'sidebar',
];
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState({
      setState: (key, state, storage) => {
        const saved = {};
        Object.keys(state).filter(s => includeStorageState.includes(s)).forEach((k) => {
          saved[k] = state[k];
        });
        return storage.setItem(key, JSON.stringify(saved));
      },
    }),
    new JSEncodePlugin({
      global: '$',
      jsReg: /^app\..+\.js$/,
      assetsPath: '../../dist/static/js'
    })
  ],
  modules,
  state: {
    isTokenRefreshing: false, // 正在刷新token中
    token: '', // 用户凭证
    userinfo: {}, // 用户信息
    permission: [], // 用户权限
    commonView: '', // 公共视图
    inited: false, // 是否初始化
    menu: [], // 菜单
    sidebar: {
      opened: true,
      withoutAnimation: false,
    },
    language: 'zh',
    workbenchUrl: '',
  },
  mutations,
  actions,
});
export default store;
