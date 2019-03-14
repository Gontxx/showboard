<template>
  <div class="menu-column" id="nav-menu">
    <div class="nav-item">
      <p class="link-icon">导航</p>
    </div>
    <div class="divide-bar"></div>
    <div class="nav-item">
      <p class="nav-title">外卖</p>
    </div>
    <div class="nav-item">
      <a href="/#/"><i class="fa fa-truck"></i><br/>总览</a>
    </div>
    <div class="nav-item">
      <a href="/#/takeout-rate"><i class="fa fa-tags"></i><br/>卫生等级</a>
    </div>
    <div class="nav-item">
      <a href="/#/guilin"><i class="fa fa-map-marker"></i><br/>桂林实例</a>
    </div>
    <div class="divide-bar"></div>
    <div class="nav-item">
      <p class="nav-title">酒店</p>
    </div>
    <div class="nav-item">
      <a href="/#/hotel"><i class="fa fa-hotel"></i><br/>总览</a>
    </div>
    <div class="divide-bar"></div>
    <div class="nav-item">
      <p class="nav-title">二手房</p>
    </div>
    <div class="nav-item">
      <a href="/#/house"><i class="fa fa-building"></i><br/>总览</a>
    </div>
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
  },
  computed: {
    isIndex () {
      return !this.$route.path.startsWith('/library')
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
.brand {
  margin-top: auto;
  margin-bottom: auto;
  padding-top: auto;
  padding-bottom: auto;
}
</style>
