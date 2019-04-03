<template>
    <el-container>
        <el-header>
            <el-button @click="goback">退出</el-button>
            {{num}}
        </el-header>
        <el-main>
          <div v-for="(msg, index) in messgaes" style="margin-bottom: 10px;" :key="index">
             <span style="color: #409eff;">{{msg.account}} 说 : </span> <span> {{msg.msg}} </span>
          </div>
        </el-main>
        <el-footer>
          <div style="width: 60%;display: float;margin-right: 20px;float: left;">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
          </div>
          <div style="display: inline-block;">
             <el-button @click="send">发送消息</el-button>
          </div>
        </el-footer>
      </el-container>
 </template>
<script lang="ts">
 import _ from 'lodash'
 import { mapState } from 'vuex'
 import { State } from 'vuex-class'
 import { Component, Vue } from 'vue-property-decorator'
 import io from 'socket.io-client'
 @Component({})
export default class Detail extends Vue {
  // 数据定义
  @State public user: any
  public textarea: string = ''
  public messgaes: any = []
  public socket: any = null
  public num: any = 0
  public mounted() {
    this.socket = io.connect('http://192.168.48.65:3001')
    this.socket.emit('start', this.user.account)
    this.socket.on('start_response', (data) => {
      if (data !== true) {
        this.$message({
          message: '链接失败',
          type: 'warning'
        })
      }
    })
    this.socket.on('updateMsg', (data) => {
      this.messgaes.push(data)
    })
    this.socket.on('users', (data) => {
      this.num = data.number
    })
  }
  public goback() {
    this.$router.push({name: 'home'})
  }
  public send() {
    this.messgaes.push({
      account: this.user.account,
      msg: this.textarea
    })
    this.socket.emit('message', {account: this.user.account, msg: this.textarea})
    this.textarea = ''
  }
}
</script>
<style scoped>
  .el-container{
    width: 100%;
    height: 100%;
  }
  .el-main{
    width: 100%;
    height: 100%;
  }
  .el-footer{
    height: 120px !important;
  }
</style>
