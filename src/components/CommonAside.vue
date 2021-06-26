<template>
	<div class="aside">
		<div class="title">
			<span v-if='!isCollapse'>vue后台管理系统</span>
			<span v-if='isCollapse'>vue</span>
		</div>
		<el-menu
		      default-active="2"
		      class="el-menu-vertical-demo"
		      background-color="#545c64"
		      text-color="#fff"
			  router
			  :collapse="isCollapse"
		      active-text-color="#ffd04b">
			  <template v-for="item in asideMenu">
				  <el-submenu index="1"  v-if="item.children">
				      <template slot="title">
				        <i :class="item.icon"></i>
				        <span>{{item.label}}</span>
				      </template>
				      <el-menu-item-group>
				        <el-menu-item :index="child.path" v-for="child in item.children" @click="selectMenu(child)">{{child.label}}</el-menu-item>
				      </el-menu-item-group>	    
				    </el-submenu>
				  
				    <el-menu-item :index="item.path" v-if="!item.children" @click="selectMenu(item)">
				      <i :class="item.icon"></i>
				      <span slot="title">{{item.label}}</span>
				    </el-menu-item>
				  
			  </template>
		     </el-menu> 
	</div>
	
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			...mapMutations([
				'selectMenu'
			])
		},
		computed:{
			...mapState({
				isCollapse:state=>state.menu.isCollapse,
				asideMenu:state=>state.menu.menus
			})
		}
	}
</script>

<style lang="scss">
	.el-menu{
		border-right:none;
	}
	.title{
		height:60px;
		color:white;
		font-size: 16px;
		text-align: center;
		line-height: 60px;
	}
	 .el-menu-vertical-demo:not(.el-menu--collapse) {
	    width: 200px;
	    min-height: 400px;
	  }
</style>
