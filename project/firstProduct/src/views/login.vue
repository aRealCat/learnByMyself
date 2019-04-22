<template>
    <div class="content">
      <div class="box">
         <section class="container">
          <div class="login">
            <h1>登录</h1>
            <el-form :model="loginData" :rules="rules" ref="loginForm">
              <el-form-item prop="account">
                <el-input type="text" name="login"  size="large"  v-model="loginData.account" placeholder="账号"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" name="password"  size="large"  v-model="loginData.password" placeholder="密码"></el-input>
              </el-form-item>
            </el-form>
            <p class="remember_me">
                <label>
                  <input type="checkbox" name="remember_me" id="remember_me">
                  记住密码(开发中)
                </label>
              </p>
            <p class="submit"><input class="submit-btn"  @click="submitForm" name="commit" value="登录"></p>
          </div>
          <div class="login-help">
            <p>忘记密码?</p>
          </div>
        </section>
      </div>
    </div>
 </template>
 
<script  lang="ts">
 import _ from 'lodash'
 import { mapState } from 'vuex'
 import { Component, Vue } from 'vue-property-decorator'
 import { State, namespace, Action } from 'vuex-class'
 import { http } from '../utils/index'
 const homeModule = namespace('home')
 @Component({})
 export default class Home extends Vue {
   @State public config
   @Action('updateConfig') public updateConfig
   // @homeModule.State public test: string
   public data
   public loginData = {
    account: null,
    password: null
   }
   public rules = {
      account: {
        required: true, message: '请输入登录账号', trigger: 'blur'
      },
      password: {
        required: true, message: '请输入登录密码', trigger: 'blur'
      }
   }
   public mounted() {
     this.data = this.config.data
   }
   public submitForm() {
      (this.$refs.loginForm as any).validate((vaild: boolean) => {
        // as any https://blog.csdn.net/u010564430/article/details/54096848?utm_source=blogxgwz4
        http({
          url: this.config.loginUrl,
          data: {
            account: this.loginData.account,
            password: this.loginData.password
          }
        }).then((res: any) => {
          this.updateConfig(res)
          if (res.result === true) {
            this.$router.push({name: '高级分配'})
          }
        })
      })
      // http({
      //   url: '/site/login',
      //   config: {
      //     headers: {
      //       'Content-Type': 'application/x-www-form-urlencoded'
      //     }
      //   },
      //   data: {
      //     email: 'djj@hiram.cn',
      //     password: '123456',
      //     date: '2018-11-26'
      //   }
      // }).then(res => {
      //   http({
      //     url: '/site/selectlogin',
      //     config: {
      //       headers: {
      //         'Content-Type': 'application/x-www-form-urlencoded'
      //       }
      //     },
      //     data:
      //     {
      //       date: '2018-09-26',
      //       bloc: '21b83e20-99b6-11e6-baae-fd4a6e3be748',
      //       corp: '3e0e5420-99cb-11e6-b17f-2d58ed2c8099'
      //     }
      //   }).then(() => {

      //   })
      // })
   }
   public checkInput(type) {
     console.log(type)
   }
 }
 </script>
 <style lang="less" scoped>
 @import url('../assets/styles/loginform.css');
 .content{
   width: 100vw;
   height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
   font: 13px/20px 'Lucida Grande', Tahoma, Verdana, sans-serif;
   color: #404040;
   background: #0ca3d2;
 }
 .el-input{
   width: 100%;
 }
 </style>
 