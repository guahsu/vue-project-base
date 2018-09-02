# Vue專案建立步驟：

### Step1: 安裝vue-cli
`npm install -g @vue/cli`

### Step2: 建立專案
`vue init webpack vue-project-base`
```
? Project name vue-project-base
? Project description A Vue.js project
? Author GuaHsu <guaswork@gmail.com>
? Vue build standalone
? Install vue-router? Yes
? Use ESLint to lint your code? Yes
? Pick an ESLint preset Standard 
? Set up unit tests Yes
? Pick a test runner jest
? Setup e2e tests with Nightwatch?
? Should we run `npm install` for you after the project has been created? (recommended) npm
```

### Step3: 安裝專案會使用到的套件們  
  1. elementUI: `npm i element-ui -save`  
	2. Lodash.js: `npm i lodash --save`  
	3. Moment.js `npm i moment --save`  
	4. normalize.css : `npm i normalize.css`  
	5. Vuex: `npm i vuex --save `  
	6. Promise-polyfill: `npm i es6-promise --save`  
	7. SASS: `npm i sass sass-loader node-sass --save`  
	8. FontAwsome: `npm install @fortawesome/fontawesome @fortawesome/fontawesome-free-brands @fortawesome/fontawesome-free-regular @fortawesome/fontawesome-free-solid  --save`  
  9. **統一上面指令：**：  
```
npm install element-ui lodash moment normalize.css vuex es6-promise sass sass-loader node-sass @fortawesome/fontawesome @fortawesome/fontawesome-free-brands @fortawesome/fontawesome-free-regular @fortawesome/fontawesome-free-solid  --save
```
  10. `npm install`
	
### Step4: 設定套件到專案內
> `src/main.js`
```javascript
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// vue-router
import router from './router'
// Vuex
import Vuex from 'vuex'
import store from './store'
import 'es6-promise/auto'
// ElementUI & normalize
import 'normalize.css'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-TW'
// Lodash
import lodash from 'lodash'
// Moment
import moment from 'moment'
// FontAwesome
import fontawesome from '@fortawesome/fontawesome'
import regular from '@fortawesome/fontawesome-free-regular'
import solid from '@fortawesome/fontawesome-free-solid'
import brands from '@fortawesome/fontawesome-free-brands'

fontawesome.library.add(regular)
fontawesome.library.add(solid)
fontawesome.library.add(brands)
Vue.use(Vuex)
Vue.use(ElementUI, { locale })
Vue.prototype.$moment = moment
Vue.prototype.$lodash = lodash

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
```

### Step5: 設定ElementUI的變數總檔
  1. 安裝工具: `npm i element-theme -g`
  2. 安裝預設主題包：`npm i element-theme-chalk -D`
  3. 產生變數總檔：`et -i`
  4. 再產生的檔案`element-variables.scss`中最下方加上這段
```scss
$--font-path: '~element-ui/lib/theme-chalk/fonts';
@import "~element-ui/packages/theme-chalk/src/index";
```

### Step6: 設置專案結構
  1. 建立 `src/api`，這裡存放api
  2. 建立 `src/views`，這裡存放頁面componenet
  3. 建立 `src/store`，這裡存放vuex相關資料 -> Step7
  4. 建立 `src/styles`，這裏存放scss相關設定 -> Step8

### Step7: 設定Vuex相關資料
	1. 建立types檔案 `src/store/mutation-types.js`
```javascript
const rootTypes = {
  SET_USER_NAME: 'SET_USER_NAME'
}

module.exports = {
  rootTypes
}
```
  3. 建立modules資料夾`src/store/modules`
  4. 建立root檔案`src/store/modules/root.js`
```javascript
import { rootTypes } from '@/store/mutation-types'

const state = {
  userName: ''
}

const getters = {
  userName: state => state.userName
}

const actions = {
  setUserName ({ commit }, name) {
    commit(rootTypes.SET_USER_NAME, name)
  }
}

const mutations = {
  [rootTypes.SET_USER_NAME] (state, name) {
    state.userName = name
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
```
	4. 建立index檔案`src/store/index.js`
```javascript
import Vue from 'vue'
import Vuex from 'vuex'

import root from '@/store/modules/root'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    root
  },
  strict: true
})
```

### Step8: 設置共用scss設定
  1. 將`element-variables.scss` 移入 `src/styles`
  2. 建立一個`global.scss`
```scss
html,
body {
  font-family: '微軟正黑體';
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app {
  height: 100vh;
}
```
  3. 建立一個`z-index.scss`
```scss
$z-index: (
  TestRed: 5000,
  TestBlue: 5500
);
```

> 這可以統一管理整個專案的z-index, 需使用的部分import後透過map-get取用
```
@import '@/styles/z-index.scss';
.test {
  z-index: map-get($z-index, TestRed);
}
```

### Step9: 設置App.vue
```javascript
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import '@/styles/element-variables.scss';
@import '@/styles/z-index.scss';
@import '@/styles/global.scss';
</style>
```

### Step10: 寫個測試來測試全部套件與設定已經OK
修改`src/components/HelloWorld.vue`
```javascript
<template>
  <div class="hello">
    <h1>Vuex Test: Hello, {{ userName }}</h1>
    <h2>moment.js Test: {{ currentTime }}</h2>
    <h2>lodash.js Test: {{ lodashTest }}</h2>
    <h2>FontAwsome Test:
      <i class="fas fa-cog"></i>
    </h2>
    <el-row>
      <el-button type="primary">主要按鈕</el-button>
      <el-button type="success">成功按鈕</el-button>
      <el-button type="info">信息按鈕</el-button>
      <el-button type="warning">警告按鈕</el-button>
      <el-button type="danger">危险按鈕</el-button>
    </el-row>
    <div>
      <h2>測試z-index, 藍色要在上面</h2>
      <div class="zindex-test zindex-test-blue"></div>
      <div class="zindex-test zindex-test-red"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      currentTime: this.$moment()
    }
  },
  computed: {
    ...mapGetters('root', ['userName']),
    lodashTest () {
      return this.$lodash.isEmpty('')
    }
  },
  methods: {
    ...mapActions('root', ['setUserName'])
  },
  created () {
    this.setUserName('GuaHsu')
  }
}
</script>

<style lang="scss">
@import '@/styles/z-index.scss';
.zindex-test {
  position: absolute;
  width: 100px;
  height: 100px;
  &-blue {
    background-color: blue;
    z-index: map-get($z-index, TestBlue);
  }
  &-red {
    background-color: red;
    z-index: map-get($z-index, TestRed);
  }
}
</style>
```

### Step12: 安裝lint & standard相關工具
  1. `npm i eslint -g`
  2. `npm i standard -g`
  3. `npm i slint-plugin-html@3.2.2 -g e`
  4. `npm install standard standard-loader --save-dev`
  5. autoFix指令(.js/.vue): `standard --plugin html '**/*.{js,vue}' --fix`

### Step11: Git
  1. `git init`
  2. `git add .`
  3. `git commit -m "project init"`

