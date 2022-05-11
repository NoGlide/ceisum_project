import Vue from 'vue';
import Element from 'element-ui';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
// 导入字体图标
import './assets/fonts/iconfont.css';
// 导入全局样式表
import './assets/css/global.css';
// 引入mock文件，使用模拟数据
import axios from 'axios';
// import 'cesium/Source/Widgets/widgets.css';
// The URL on your server where CesiumJS's static files are hosted.
// window.CESIUM_BASE_URL = '/';

import 'cesium/Build/Cesium/Widgets/widgets.css';

Vue.use(Element);

axios.defaults.baseURL = 'http://127.0.0.1:4523/mock/861485/';
axios.interceptors.request.use((config) => {
    // 为请求头对象，添加Token验证的Authorization字段
    config.headers.Authorization = window.sessionStorage.getItem('token');
    return config;
});
Vue.prototype.$http = axios;

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');