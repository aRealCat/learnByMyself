<template>
    <div class="content">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="账号">
                <el-input v-model="form.account"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
                <el-button @click="regist">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import { http } from '~utils'
export default {
  computed: {
    ...mapState(['config'])
  },
  data () {
    return {
      form: {
        account: null,
        password: null
      }
    }
  },
  methods: {
    login () {
      console.log(this.config)
    },
    regist () {
      this.$router.push({path:'/regist'})
    }
  }
}
</script>

<style scoped>
.content{
    display: flex;
}
</style>
