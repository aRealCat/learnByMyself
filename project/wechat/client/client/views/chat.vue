<template>
    <div>
      <el-button @click="goback">退出</el-button>
      欢迎 {{name}}
      <div>这里是wechat</div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import { http } from '~utils'
export default {
  data () {
    return {
      name: ''
    }
  },
  created () {
    if (this.$route.params.user) {
      this.name = this.$route.params.user.name
    }
    console.log(this.$route.params.name)
  },
  computed: {
    ...mapState(['config'])
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    goback () {
      this.$router.push({path:'/login'})
    }
  }
}
</script>

<style scoped>
</style>
