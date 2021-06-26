<template>
	<el-container>
	  <el-aside width="auto">
		  <common-aside></common-aside>
	  </el-aside>
	  <el-container>
	    <el-header>
			<common-header></common-header>
		</el-header>
	    <el-main>
			<common-tags></common-tags>
			<router-view></router-view>
		</el-main>
	  </el-container>
	</el-container>
</template>

<script>
	import CommonAside from '../components/CommonAside.vue'
	import CommonHeader from '../components/CommonHeader.vue'
	import CommonTags from '../components/CommonTags.vue'
	export default{
		components:{
			CommonAside,
			CommonHeader,
			CommonTags
		}
	}
</script>

<style lang="scss">
	.el-container{
		height: 100%;
	}
	.el-aside{
		background-color: #545c64;
	}
	.el-header{
		padding:0;
	}
</style>
