// 按需全局引入 vant 组件
import Vue from 'vue';
import { Toast, Button, List, Cell, Tabbar, TabbarItem } from 'vant';

Vue.use(Toast);
Vue.use(Button);
Vue.use(List);
Vue.use(Cell);
Vue.use(Tabbar).use(TabbarItem);
