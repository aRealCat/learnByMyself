<template>
	<section>
		<el-table
		border
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
	</section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { http } from '../../utils/index'
@Component({})
export default class Home extends Vue {
  @State public config
  public tableData: any[] = []
  public mounted() {
    if (process.env.NODE_ENV !== 'production') {
      http({
        url: this.config.tableUrl,
        method: 'get'
      }).then((res: any) => {
        console.log(res)
      })
    }
  }
}
</script>
