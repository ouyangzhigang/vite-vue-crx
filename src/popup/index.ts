import 'ant-design-vue/dist/reset.css'
import { createApp } from 'vue'

import Antd from 'ant-design-vue'
import Popup from './Popup.vue'

createApp(Popup).use(Antd).mount('#app')
