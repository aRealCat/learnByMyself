<template>
    <div>
       <div class="header">
          <span class="link" @click="goback">功能日志</span> <i class="el-icon-arrow-right"></i> <span>{{item.title}}</span>
       </div>
       <div class="body">
           <h1 class="title">{{item.title}}</h1>
           <span style="color: #999;">
             {{item.update_at}}
           </span>
           <div class="detail">
              <div v-html="item.detail"></div>
           </div>
       </div>
    </div>
 </template>
<script lang="ts">
 import _ from 'lodash';
 import { mapState } from 'vuex';
 import { Component, Vue } from 'vue-property-decorator';
 @Component({})
export default class Detail extends Vue {
  public item = {}
  public mounted() {
    if (!this.$route.params.item) {
      this.$router.push({name: 'home'})
    } else {
      this.item = this.$route.params.item
    }
  }
  public goback() {
    this.$router.push({name: 'home'})
  }
}
</script>
<style scoped>
 .title{
   margin: 0 !important;
   padding: 0 !important;
 }
 .header{
   height: 60px;
   line-height: 60px;
   padding-left: 60px;
   color: #555;
   font-size: 14px;
   border-bottom: 1px solid #ddd;
 }
 .link{
   cursor: pointer;
 }
 .link:hover{
   color:rgba(64, 201, 255, 0.829)
 }
 .body{
   width: 660px;
   margin-left: auto;
   margin-right: auto;
   margin-top: 20px;
 }
 .detail{
     margin-top: 40px;
 }
</style>
