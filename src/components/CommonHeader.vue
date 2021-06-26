<template>
	<div class="header">
		<div class="left">
			<el-button type="primary" icon="el-icon-menu" size="small" @click="collapse"></el-button>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>{{curMenu.label}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="right">
			<el-dropdown trigger="click">
			      <span class="el-dropdown-link">
			        <img src="@/assets/images/user.png" alt="" class="userImg">
			      </span>
			      <el-dropdown-menu slot="dropdown">
			        <el-dropdown-item icon="el-icon-plus">个人中心</el-dropdown-item>
			        <el-dropdown-item icon="el-icon-circle-plus" @click.native='logOut'>退出</el-dropdown-item>
			      </el-dropdown-menu>
			    </el-dropdown>
		</div>
	</div>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default{
		computed:{
			...mapState({
				curMenu:state=>state.menu.curMenu
			})
		},
		methods:{
			...mapMutations([
				'collapse',
				'clearToken',
				'clearMenus'
			]),
			logOut(){
				this.clearMenus()
				this.clearToken()
				location.reload()
			}
		}
	}
</script>

<style lang="scss">
	.header{
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #444;
		height: 100%;
		.left{
			display: flex;
			align-items: center;
			margin-left:10px;
			.el-breadcrumb__inner.is-link{
				color:white;
			}
			.el-breadcrumb__item:last-child .el-breadcrumb__inner{
				color:white;
			}
			.el-breadcrumb{
				margin-left:30px;
			}
		}
		.right{
			margin-right:30px;
			.userImg{
				width:40px;
				height:40px;
				border-radius: 50%;
			}
		}
	}
</style>
