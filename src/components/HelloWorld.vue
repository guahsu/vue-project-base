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
