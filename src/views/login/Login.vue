<template>
	<div class="login">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
				    <span class="title">VUE后台管理系统</span>			    
				  </div>
			  <div class="loginForm">
			    <el-form ref="form" :model="form" label-width="80px">
			      <el-form-item label="用户名">
			        <el-input v-model="form.username"></el-input>
			      </el-form-item>		     
			      <el-form-item label="密码">
			        <el-input type="password" v-model="form.password"></el-input>
			      </el-form-item>
			      <el-form-item>
			        <el-button type="primary" @click="onSubmit">登陆</el-button>
			        <el-button>取消</el-button>
			      </el-form-item>
			    </el-form>
			  </div>
			</el-card>
		</div>
</template>

<script>
	import {mapMutations} from 'vuex';
	export default{
		data(){
			return{
				form:{
					username:'',
					password:''
				}
			}
		},
		methods:{
			onSubmit(){
				this.$http.post('api/permission/getMenu',this.form).then(res=>{
					console.log(res)
					res=res.data
					if(res.code==20000){
						this.clearMenus()
						this.setMenus(res.data.menu)
						this.setToken(res.data.token)
						this.addMenus(this.$router)
						this.$router.push({name:'home'})
					}
				})
			},
			...mapMutations([
				'setMenus',
				'clearMenus',
				'addMenus',
				'setToken'
			])
		}
	}
</script>

<style lang="scss">
	.login{
		display: flex;
		justify-content: center;
		align-items: center;
		height:100vh;
		background: url('~@/assets/images/login_bak.png') no-repeat center center/cover;
		.box-card{
			width:480px;
			.title{
				display: block;
				text-align: center;
				height:50px;
				line-height: 50px;
			}
			.loginForm{
				margin-top:30px;
			}
		}
		
	}
	
</style>
