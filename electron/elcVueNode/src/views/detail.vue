<template>
    <div>
      <el-button @click="goback">返回</el-button>
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
