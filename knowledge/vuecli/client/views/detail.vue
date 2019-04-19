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
          <div class="detail" id="detail">
             <div v-html="item.detail"></div>
          </div>
      </div>
      <img-preview></img-preview>
   </div>
</template>

<script>
import { http} from '~utils'
import _ from 'lodash'
import { mapState } from 'vuex'
import imgPreview from '@/components/imgPreview'
import { openPhotoSwipe } from '@/components/imgPreview/utils'
export default {
  components: {
    imgPreview
  },
  data () {
    return {
      item: {}
    }
  },
  computed: {
    ...mapState(['config'])
  },
  mounted() {
    let item = this.config.data.filter(item => item.id == this.$route.params.id)[0]
    this.item = item
    this.$nextTick(() => {
      document.getElementById("detail").addEventListener("click", e => {
        if (e.target.nodeName == 'IMG') {
          let image = new Image()
          image.src = e.target.src
          image.onload = () => {
            let img = {
              width: image.width,
              height: image.height,
              src: e.target.src,
              bigSrc: e.target.src,
              thumbSrc: e.target.src
            }
            openPhotoSwipe({ index: 0, galleryArray: [img] })
          }
        }
      })
    })
  },
  activated () {
  },
  methods: {
    goback () {
      this.$router.push({name:'home'})
    }
  },
  watch: { //
  }
}
</script>

<style scoped>
>>> img{
  max-width: 46vw;
  height: auto;
  cursor: pointer;
}
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
