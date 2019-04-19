<template>
   <div class="content">
    <div class="header">
      <div class="h-bar">
        <img src="../../assets/images/hiramlogo.png" alt="">
      </div>
      <div class="main-title" style="font-size: 36px;color: #fff;">
        功能日志
        <div style="font-size: 20px;color: #fff;"> 看看我们最近更新了什么<my-loading></my-loading><my-loading2></my-loading2></div>
      </div>
    </div>
    <div class="body">
        <table border="0">
          <tr v-for="(item, index) in data" :key="index">
            <td>
              <div class="t-icon">
                <img v-if="item.logo" :src="item.logo" class="t-icon-in">
                <i v-else class="el-icon-document"></i>
                <span v-if="data.length != index + 1" class="t-line"></span>
              </div>
            </td>
            <td>
              <div class="t-title">
                <div style="font-size: 22px;">{{item.title}}</div>
                <span style="color: #999;">
                  {{item.update_at}}
                </span>
              </div>
            </td>
            <td>
              <div class="t-detail">
                <div style="color: #555;font-size: 14px;">{{item.subdetail}}</div>
                <span class="t-link" @click="go(item)">
                  查看详情 <i class="el-icon-d-arrow-right"></i>
                </span>
              </div>
            </td>
          </tr>
        </table>
    </div>
   </div>
</template>

<script>
import { http} from '~utils'
import _ from 'lodash'
import { mapState } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['config']),
    data () {
      return this.config.data
    }
  },
  mounted () {
    // console.log(this.config)
  },
  methods: {
    go (item) {
      let url = window.location.href.slice(0, window.location.href.indexOf('#') + 1)
      let params = '/detail' + '/' + item.id
      let href = url + params
      window.location.href = href
    }
  },
  watch: {
  }
}
</script>

<style scoped>
.header{
  height: 20vh;
  background-color: #409EFF;
  padding-top: 1vh;
}
.main-title{
  text-align: center;
}
.body{
  width: 660px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}
.b-box{
  margin-left: 30%;
  margin-top: 22px;
}
.t-icon{
  height: 80px;
  width: 80px;
  border-radius: 4px;
  background: #409eff;
  margin-bottom: 100px;
  border: 1px solid #409eff;
  box-sizing: border-box;
  /* text-align: center;
  line-height: 80px; */
  display: flex;
  align-items:center;
  justify-content:center;
  color: #fff;
  position: relative;
  font-size: 36px;
}
.t-icon-in{
  max-width: 72px;
  max-height: 72px;
}
.t-line{
  height: 106px;
  width: 4px;
  background-color: rgba(64, 201, 255, 0.829);
  position: absolute;
  top: 78px;
  left: 38px;
}
.t-title{
  height: 180px;
  width: 235px;
  box-sizing: border-box;
  padding-left: 12px;
}
.t-detail{
  height: 180px;
  width: 345px;
}
.t-link{
  color: #409EFF;
  cursor: pointer;
  font-size: 14px;
  margin-top: 6px;
}
.t-link:hover{
  color: rgb(64, 210, 255)
}
</style>
