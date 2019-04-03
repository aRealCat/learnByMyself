<template>
    <div>
      <el-button @click="goback">返回</el-button>
      <el-button @click="send">发送消息</el-button>
      <div class="main">
      </div>
    </div>
 </template>
<script lang="ts">
 import _ from 'lodash'
 import { mapState } from 'vuex'
 import { State } from 'vuex-class'
 import { Component, Vue } from 'vue-property-decorator'
 import io from 'socket.io-client'
 @Component({})
export default class Detail extends Vue {
  @State public user
  public mounted() {
    let socket = io.connect('http://127.0.0.1:3001')
    socket.emit('start', this.user.account)
    socket.on('start_response', (data) => {
      console.log(data)
      if (data !== true) {
        this.$message({
          message: '链接失败',
          type: 'warning'
        })
      }
    })
  }
  public goback() {
    this.$router.push({name: 'home'})
  }
  public send() {
    this.$socket.emit('message', this.user.account)
  }
}
</script>
<style scoped>
</style>
