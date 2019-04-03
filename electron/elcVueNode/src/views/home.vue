<template>
   <div  class="content">
    <div class="header">
      <div class="h-bar">
        <img src="../assets/hiramlogo.png" alt="">
      </div>
      <div class="main-title" style="font-size: 36px;color: #fff;">
        Vue + Typescript + Electron
        <div style="font-size: 20px;color: #fff;">
        </div>
      </div>
    </div>
    <div class="body">
        <div class="left"></div>
        <div class="right">
          <div style="width: 80%;margin-top: 20%;">
            <el-form :model="form" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
              <el-form-item label="账号" >
                <el-input v-model="form.account" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm()">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
    </div>
   </div>
</template>

<script  lang="ts">
import _ from 'lodash';
import { mapState } from 'vuex';
import { Component, Vue } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { http } from '../utils/index'
@Component({})
export default class Home extends Vue {
  @State public config: any
  @Action('setUser') setUser
  public form: any = {
    account: null,
    password: null
  }
  public data: any[] = []
  public mounted() {
    this.data = this.config.data
  }
  public submitForm() {
    http({
      url: this.config.loginUrl + '?' + 'account=' + this.form.account + '&' + 'password=' + this.form.password,
      method: 'get'
    }).then(res => {
      this.setUser(res.user)
      if (res.isLogin === true) {
        this.$router.push(
          {
            name: 'detail',
            params: {},
          }
        )
      } else {
        this.$message({
          message: '登录失败,请检查账号密码',
          type: 'warning'
        })
      }
    })
  }
  public go(item: any) {
    // this.$router.push({name: 'detail', params: {item}});
  }
}
</script>
<style scoped>
.header{
  height: 20vh;
  background-color: #409eff;
  padding-top: 1vh;
  -webkit-app-region: drag;
}
.main-title{
  text-align: center;
}
.body{
  width: 100%;
  height: 80vh;
  background:url('../../public/bg.jpg') no-repeat center top;
  background-size:100% 100%;
}
.left{
  width: 50%;
  display: inline-block;
}
.right{
  height: 100%;
  width: 50%;
  background: rgba(255,255,255,.4);
  display: inline-block;
  color: #fff;
}
</style>
