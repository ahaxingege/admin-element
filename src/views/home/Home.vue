<template>
	<el-row class="home">
		<el-col :span='8' class="home-l">
			<el-card>
				<div class="home-l1">
					<div class="home-l1-l"><img src="@/assets/images/user-default.png" alt=""></div>
					<div class="home-l1-r">
						<p class="name">Nick</p>
						<p class="role">超级管理员</p>
					</div>
				</div>
				<div class="home-l1-2">
					<p>上次登录时间：2020-12-15</p>
					<p>上次登录地点：广州</p>
				</div>
			</el-card>
			<el-card style="margin-top: 20px;height: 500px;">
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column prop="name" label="姓名" width="120">
					</el-table-column>
					<el-table-column prop="todayBuy" label="今日销量" width="120">
					</el-table-column>
					<el-table-column prop="monthBuy" label="月销量">
					</el-table-column>
					<el-table-column prop="totalBuy" label="总销量">
					</el-table-column>
				</el-table>
			</el-card>


		</el-col>
		<el-col :span='16' class="home-r">
			<el-row class="num">
				<el-col :span="8" v-for="(item,index) in countData" :key="index">
					<el-card>
						<i :class="item.icon" :style="{'background-color':item.color}"></i>
						<div class="detail">
							<p class="item1">￥ {{item.value}}</p>
							<p class="item2">{{item.name}}</p>
						</div>
					</el-card>
				</el-col>

			</el-row>
			<el-card>
				<div class="echart1">
					<Echarts :option="option1"></Echarts>

				</div>
			</el-card>
			<div class="echart2">

				<el-card>
					<div class="echart21">
						<Echarts :option="option2"></Echarts>
					</div>
				</el-card>
				<el-card>
					<div class="echart22">
						<Echarts :option="option3"></Echarts>
					</div>

				</el-card>

			</div>
			</div>

		</el-col>
	</el-row>
</template>

<script>
	import Echarts from '@/components/Echarts.vue'
	export default {
		data() {
			return {
				tableData: [],
				countData: [{
						name: '今日支付订单',
						value: 1234,
						icon: 'el-icon-success',
						color: '#2ec7c9'
					},
					{
						name: '今日收藏订单',
						value: 210,
						icon: 'el-icon-star-on',
						color: '#ffb980'
					},
					{
						name: '今日未支付订单',
						value: 1234,
						icon: 'el-icon-s-goods',
						color: '#5ab1ef'
					},
					{
						name: '本月支付订单',
						value: 1234,
						icon: 'el-icon-success',
						color: '#2ec7c9'
					},
					{
						name: '本月收藏订单',
						value: 210,
						icon: 'el-icon-star-on',
						color: '#ffb980'
					},
					{
						name: '本月未支付订单',
						value: 1234,
						icon: 'el-icon-s-goods',
						color: '#5ab1ef'
					}
				],
				option1: {
					title: {
						text: '折线图堆叠'
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: []
					},
					grid: {
						top: '20%',
						left: '10%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: []
				},
				option2: {
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: []
					},
					grid: {
						top: '10%',
						left: '1%',
						right: '4%',
						bottom: '1%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: []
				},
				option3: {
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: []
					},
					grid: {
						top: '2%',
						left: '1%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					series: []
				}

			}

		},
		components: {
			Echarts
		},
		created() {
			this.$http.get('/home/getData').then(res => {
				console.log(res)
				res = res.data.data
				this.tableData = res.tableData
				const order = res.orderData
				this.option1.xAxis.data = order.date
				let keyArray = Object.keys(order.data[0])
				this.option1.legend.data = keyArray
				// 第二步，循环添加数据
				keyArray.forEach(key => {
					this.option1.series.push({
						name: key,
						data: order.data.map(item => item[key]),
						type: 'line'
					})
				})
				//console.log(this.option1)
				// 用户柱状图
				this.option2.xAxis.data = res.userData.map(item => item.date)
				this.option2.series.push({
					name: '新增用户',
					data: res.userData.map(item => item.new),
					type: 'bar'
				})
				this.option2.series.push({
					name: '活跃用户',
					data: res.userData.map(item => item.active),
					type: 'bar',
					barGap: 0
				})
				console.log(this.option2)
				//this.option2.series[0].data = [120, 200, 150, 80, 70, 110, 130]
				// 视频饼图
				this.option3.series.push({
					data: res.videoData,
					type: 'pie'
				})
			})
		}
	}
</script>

<style lang="scss">
	.home {
		height: 100%;
		margin-top: 20px;

		.home-l {
			height: 100%;

			.home-l1 {
				display: flex;
				align-items: center;
				background-color: #fff;

				.home-l1-l {
					padding: 15px;

					img {
						width: 80px;
					}
				}

				.home-l1-r {
					margin-left: 20px;

					.name {
						font-size: 16px;
						line-height: 30px;
					}

					.role {
						font-size: 14px;
						color: #ccc;
						line-height: 30px;
					}
				}
			}

			.home-l1-2 {
				font-size: 14px;
				color: #ccc;
				padding: 20px;
				line-height: 30px;
				background-color: #fff;
			}

			.home-l2 {
				margin: 20px 0;
				background-color: #fff;
				height: 500px;
			}
		}

		.home-r {
			.num {
				.el-card {
					margin: 0 20px 20px 20px;

					.el-card__body {
						display: flex;
						padding: 0;
						height: 70px;
						align-items: center;

						i {
							font-size: 40px;
							text-align: center;
							width: 70px;
							height: 100%;
							line-height: 70px;
							color: white;
						}

						.detail {
							padding: 20px;

							.item1 {
								font-size: 18px;
								margin-bottom: 10px;
							}

							.item2 {
								font-size: 14px;
								color: #ccc;
							}
						}
					}
				}
			}

			.el-card {
				margin: 0 20px 20px 20px;
			}

			.echart1 {
				width: 100%;
				height: 250px;
			}

			.echart2 {
				display: flex;
				width: 100%;
				height: 300px;

				.el-card {
					flex: 1;

					.echart21 {
						height: 200px;
					}

					.echart22 {
						height: 200px;
					}
				}
			}
		}

	}
</style>
