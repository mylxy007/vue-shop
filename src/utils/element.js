import Vue from 'vue'
//引入elementUI
import {
    Button,
    MessageBox
} from 'element-ui'
Vue.use(Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;