<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col>
        <file-header></file-header>
      </el-col>
    </el-row>
    </el-header>

    <el-main>
      <keep-alive :exclude="/NoCache$/">
      <router-view/>
      </keep-alive>
    </el-main>
  </el-container>
</template>

<script>
import fileHeader from './components/header'

export default {
   components: {
    fileHeader
  },
  mounted () {
    
    // var a = 'cusbaseagent'
    // this.$router.push({
    //     path: a,
    //     name: a
    //   })
  },
  computed: {

  },
  methods: {
  }
}
</script>

<style scoped>
.el-container {
  padding: 0 0 6px;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.el-header {
  background-color: #fff;
  color: #333;
  text-align: center;
}
.el-main {
  background-color: #fff;
  color: #333;
  text-align: left;
  position: relative;
  overflow: auto;
}
</style>
