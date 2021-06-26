<template>
	<div class="user">
		<div class="user1">
			<div>
				<el-button size="small" type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
			</div>

			<el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
				<el-form-item>
					<el-input v-model="formInline.keyword" placeholder="请输入..."></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="user2">
			<el-table :data="tableData" style="width: 100%" stripe>
				<el-table-column type="index" label="序号">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ (config.page - 1) * 10 + scope.$index + 1 }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="姓名"></el-table-column>
				<el-table-column prop="age" label="年龄"></el-table-column>
				<el-table-column prop="sexLabel" label="性别"></el-table-column>
				<el-table-column prop="birth" label="出生日期"></el-table-column>
				<el-table-column prop="addr" label="住址" width="400"></el-table-column>

				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination background layout="prev, pager, next" :total="config.total" :page-size="config.pageSize"
				class="pager" :current-page.sync="config.page" @current-change="changePage()">
			</el-pagination>
		</div>
		<el-dialog title="用户编辑" :visible.sync="dialogFormVisible">
			<el-form :model="userForm">
				<el-form-item label="id" :label-width="formLabelWidth">
					<el-input v-model="userForm.id" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="姓名" :label-width="formLabelWidth">
					<el-input v-model="userForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="年龄" :label-width="formLabelWidth">
					<el-input v-model="userForm.age" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
					<el-select v-model="userForm.sex" placeholder="请选择性别">
						<el-option v-for="item in sexOption" :label="item.label" :value="item.value" :key="item.value">
						</el-option>

					</el-select>
				</el-form-item>
				<el-form-item label="出生日期" :label-width="formLabelWidth">
					<el-input v-model="userForm.birth" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="地址" :label-width="formLabelWidth">
					<el-input v-model="userForm.addr" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveUser">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				operateType: 'add',
				formInline: {
					keyword: ''
				},
				tableData: [],
				config: {
					page: 1,
					total: 200,
					pageSize: 10
				},
				dialogFormVisible: false,
				userForm: {
					id: '',
					name: '',
					age: '',
					sex: '',
					sexLabel: '',
					birth: '',
					addr: ''
				},
				formLabelWidth: '120px',
				sexOption: [{
						label: '男',
						value: 1
					},
					{
						label: '女',
						value: 0
					}
				]
			}
		},
		methods: {
			loadData() {
				this.$http.get('/user/getUser', {
					params: {
						page: this.config.page,
						limit: this.config.pageSize,
						name: this.formInline.keyword
					}
				}).then(res => {
					console.log(res)
					this.tableData = res.data.list.map(item => {
						item.sexLabel = item.sex == 0 ? '女' : '男'
						return item
					})
				})
			},
			changePage() {
				this.loadData()
			},
			onSubmit() {
				this.loadData()
			},
			handleAdd() {
				this.operateType = 'add'
				this.userForm = {}
				this.dialogFormVisible = true
			},
			saveUser() {
				if (this.operateType == 'add') {
					this.$http.post('/user/add', this.userForm).then(res => {
						console.log(res)
						this.loadData()
					})

				} else {
					this.$http.post('/user/edit', this.userForm).then(res => {
						console.log(res)
						this.loadData()
					})

				}

				this.dialogFormVisible = false
			},
			handleEdit(index, row) {
				this.operateType = 'edit'
				this.userForm = row
				this.dialogFormVisible = true
			},
			handleDelete(index, row) {
				this.$confirm('此操作将该用户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let msg = this.$http.get('/user/deleteUser', {
						params: {
							id: row.id
						}
					}).then(res=>{
						this.loadData()
						console.log(msg)
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					})
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			}
		},
		created() {
			this.loadData()
		}
	}
</script>

<style lang="scss">
	.user {
		.user1 {
			display: flex;
			justify-content: space-between;
			margin-top: 20px;
		}

		.user2 {
			position: relative;
			border-top: 1px solid #eee;

			.pager {
				position: absolute;
				right: 20px;
				bottom: -40px;

			}
		}
	}
</style>
