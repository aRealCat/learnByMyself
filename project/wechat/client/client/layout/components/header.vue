<template>
  <div class="header">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="/goldhistory"><router-link :to="{path:'/goldhistory'}">历史金价走势</router-link></el-menu-item>
    </el-menu>
  </div>
</template>

<script>

export default {
computed: {
  activeIndex () {
    return this.$route.path
  }
}
}
</script>

<style scoped>
.header{
  padding: 0 20px;
}
.el-menu-item a{
display:block;
height:100%;
padding: 0 20px;
text-decoration:none;
}
</style>
