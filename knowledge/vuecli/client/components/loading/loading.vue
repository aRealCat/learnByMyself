<template>
  <div class="loding">
     <i class="el-icon-loading"></i>{{msg | myfilter}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '1'
    }
  }
}
</script>

<style>
</style>
