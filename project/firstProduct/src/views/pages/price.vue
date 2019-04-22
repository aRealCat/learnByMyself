<template>
	<section>
		<div class="content">
			<p style="font-size: 38px; color: #20a0ff; text-align: center;">功能开发中...</p>
			<div class="img">
				<img :src="src" width="400" height="400" alt="">
			</div>
		</div>
	</section>
</template>
<script  lang="ts">
 import { Component, Vue } from 'vue-property-decorator'
 @Component({})
 export default class Home extends Vue {
   public src = './DCSR607158.jpg'
 }
 </script>
<style lang="less" scoped>
</style>
