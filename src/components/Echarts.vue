<template>
	<div class="Echarts" ref='main'>

	</div>
</template>

<script>
	export default {
		props: {
			option: Object
		},
		watch: {
			option: {
			  handler: function() {
			    this.initChart()
			  },
			  deep: true
			}
		},
		methods: {
			initChart() {
				// 基于准备好的dom，初始化echarts实例，所以只能在mounted中调用
				let myChart = this.$echarts.init(this.$refs.main)
				console.log(this.option)
				// 绘制图表
				myChart.setOption(this.option);
			}
		}
	}
</script>

<style scoped>
	.Echarts {
		width: 90%;
		height: 90%;
	}
</style>
