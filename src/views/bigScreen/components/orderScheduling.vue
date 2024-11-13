<template>
	<div class="section time-table-container">
		<div class="title">
			<span>订单排产计划</span>
		</div>
		<div class="table-c">
			<el-table :data="tableData" height="100%" style="width: 100%" header-row-class-name="table-h-bg"
				:row-class-name="tableRowClassName">
				<el-table-column prop="number" show-overflow-tooltip label="计单编号">
				</el-table-column>
				<el-table-column prop="orderType" show-overflow-tooltip label="订单编号">
				</el-table-column>
				<el-table-column prop="orderNum" show-overflow-tooltip label="订单数量">
				</el-table-column>
				<el-table-column prop="finishNum" show-overflow-tooltip label="完成数量">
				</el-table-column>
				<el-table-column prop="status" show-overflow-tooltip label="订单状态">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
export default {
	props: {

	},
	data() {
		return {
			tableData: [{
				number: '1',
				orderType: "这就是订単状态",
				orderNum: 1000,
				finishNum: 200,
				status: '未处理'
			}, {
				number: '2',
				orderType: "这就是订単状态",
				orderNum: 1000,
				finishNum: 200,
				status: '未处理'
			}, {
				number: '3',
				orderType: "这就是订単状态",
				orderNum: 1000,
				finishNum: 200,
				status: '未处理'
			}, {
				number: '4',
				orderType: "这就是订単状态",
				orderNum: 1000,
				finishNum: 200,
				status: '未处理'
			}, {
				number: '5',
				orderType: "这就是订単状态",
				orderNum: 1000,
				finishNum: 200,
				status: '未处理'
			}, {
				number: '6',
				orderType: "这就是订単状态",
				orderNum: 1000,
				finishNum: 200,
				status: '未处理'
			}]
		}
	},
	mounted() {

	},
	methods: {
		tableRowClassName({ row, rowIndex }) {
			return rowIndex % 2 === 0 ? 'odd-row' : 'even-row';
		}
	},
}
</script>

<style lang="scss" scoped>
.section {
	width: 100%;
	height: 100%;
}

.title {
	width: 100%;
	height: 15%;
	background-image: url("../../../assets/images/bigScreen/title_bg.png");
	background-repeat: no-repeat;
	background-size: 90% 75%;
	background-position: center center;
	position: relative;

	span {
		position: absolute;
		top: 50%;
		left: 8%;
		transform: translateY(-50%);
	}

}

.table-c {
	width: 90%;
	height: 80%;
	margin: 0 24px;
	// overflow: auto;
}
</style>
<style lang="scss">
.time-table-container {
	.table-c {
		background: transparent;
		.el-table {
			tr {
				color: #fff;
			}

			.table-h-bg {
				th {
					background: #0483d6;
					color: #fff;
				}
			}

			.odd-row {
				background: #0e2550;
			}

			.even-row {
				background: #032963;
			}
		}

		.el-table--medium {
			.el-table__cell {
				padding: 6px 0 !important;
				height: 36px;
				border-bottom: none;
			}
		}
	}
}
</style>