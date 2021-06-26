<template>
	<div class="tags">

		<template v-for="tag in tags">
			<router-link :to="tag.path">
				<el-tag :key="tag.name" :closable="tag.name!='home'" :effect="tag.name==curMenu.name?'dark':'plain'" @click="selectMenu(tag)"
				 @close="closeTag(tag)">
					{{tag.label}}
				</el-tag>
			</router-link>
		</template>


	</div>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		computed: {
			...mapState({
				tags: state => state.menu.tagsList,
				curMenu: state => state.menu.curMenu
			})
		},
		methods: {
			...mapMutations([
				'closeTag',
				'selectMenu'
			])
		}
	}
</script>

<style lang="scss">
	.tags {
		.el-tag {
			margin-right: 15px;
		}
	}
</style>
