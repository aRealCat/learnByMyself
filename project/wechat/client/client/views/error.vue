<template>
  <div class="errorBox">
    <div class="errorMsg">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '您未登录'
    }
  }
}
</script>

<style>
.errorBox {
  display: flex;
  justify-content: center;
  align-items: center;
}

.errorMsg{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vw;
  font-size: 40px;
  height: 80vh;
}
</style>
