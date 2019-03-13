<template>
  <div class="wrapper">
    <el-tooltip v-for="(img,index) in images" :key="index" transition="el-fade-in-linear" effect="light" class="wrapper">
      <div slot="content">
        <img :src="img.thumbSrc + '&h=250'" class="big">
      </div>
      <div class="imgWrapper">
        <img :src="img.thumbSrc + '&h=50'" style="margin-right:5px;"
        @click="clickImg(img.thumbSrc)"
        :style="imgStyle(img)"
        >

      </div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  props: ['images', 'colWidth'],
  methods: {
    clickImg (src) {
      this.$emit('clickImg', src)
    },
    imgStyle (img){
      let result = {}
      if (img.height && (img.width * 50 / img.height > this.colWidth)){
        result.width = this.colWidth + 'px'
      }
      return result
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
}
.imgWrapper {
  height: 50px;
  display: flex;
  align-items: center;
}
.big {
  width: 100%;
}
</style>

