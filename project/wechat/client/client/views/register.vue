<template>
  <div>
    <div class="content">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="账号">
                <el-input v-model="form.account"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="regist">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
    <el-button @click="goback">返回</el-button>
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
    regist () {
      http({
        url: '/reg' + '?' + 'account=' + this.form.account + '&' + 'password=' + this.form.password+ 'name=' + this.form.name,
        method: 'get'
      }).then(res => {
        console.log(res)
        if (res.isreg) {
          this.$message({
            message: '该账号已注册',
            type: 'warning'
          })
        } else {
          this.$message({
            message: '注册成功',
            type: 'success'
          })
        }
      })
    },
    goback () {
      this.$router.push({path:'/login'})
    }
  }
}
</script>

<style scoped>
.content{
    display: flex;
}
</style>
