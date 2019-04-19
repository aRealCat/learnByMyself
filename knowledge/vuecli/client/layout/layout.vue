<template>
  
    <keep-alive :exclude="/NoCache$/">
    <router-view/>
    </keep-alive>
  
</template>

<script>

export default {
   components: {
     
  },
  mounted () {
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
