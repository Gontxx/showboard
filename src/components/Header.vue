<template>
  <div class="menu-column" id="nav-menu">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#262626"
      text-color="#ffffff"
      active-text-color="#8DB6CD"
      @select="handleSelect"
      :collapse="true">
      <div class="nav-item">
        <p class="link-icon nav-title">导航</p>
      </div>
      <el-submenu index="takeout">
        <template slot="title">
          <i class="fa fa-truck fa-lg fa-icon"></i>
          <span slot="title">外卖</span>
        </template>
        <el-menu-item-group>
          <span slot="title">外卖</span>
          <el-menu-item index="/">总览</el-menu-item>
          <el-menu-item index="takeout-rate">卫生等级</el-menu-item>
          <el-menu-item index="guilin">桂林实例</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="hotel">
        <i class="fa fa-hotel fa-lg fa-icon"></i>
        <span slot="title">酒店</span>
      </el-menu-item>
      <el-submenu index="building">
        <template slot="title">
          <i class="fa fa-building fa-lg fa-icon"></i>
          <span slot="title">住房</span>
        </template>
        <el-menu-item-group>
          <span slot="title">住房</span>
          <el-menu-item index="house">在售二手房</el-menu-item>
          <el-menu-item index="rent">租房</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="tianjin">
        <i class="fa fa-shopping-bag fa-lg fa-icon"></i>
        <span slot="title">跨境电商</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'yheader',
  data () {
    return {
      login_status: 0,
      username: ''
    }
  },
  methods: {
    handleSelect (index, indexPath) {
      if (index === 'takeout' || index === 'building') {
        this.$router.push(indexPath)
      } else if (index === 'tianjin') {
        window.open('http://39.106.6.6:9010/')
      } else {
        this.$router.push(index)
      }
    }
  },
  created () {
    // this.refreshHeader()
  }
}
</script>

<style scoped>
#logout {
  color: #ff5a49;
}
#navbar-menu li {
  font-size: 16px !important;
}
  .el-menu-vertical-demo {
    width: 80px;
    height: 100vh;
  }
  .fa-icon {
    color: #FFFFFF;
  }
</style>
