<template>
	<div class="section time-table-container">
		<div class="title">
			<span>订单排产计划</span>
		</div>
		<div class="table-c">
			<el-table :data="tableData" height="100%" ref="scrollTable" @mouseenter.native="handleEnter"
				@mouseleave.native="handleLevel" style="width: 100%" header-row-class-name="table-h-bg"
				:row-class-name="tableRowClassName">
				<el-table-column prop="orderNumber" width="115" show-overflow-tooltip label="计单编号">
				</el-table-column>
				<el-table-column prop="orderType" show-overflow-tooltip label="订单编号">
				</el-table-column>
				<el-table-column prop="orderQuantity" width="60" show-overflow-tooltip label="订单数量">
				</el-table-column>
				<el-table-column prop="completedQuantity" width="60" show-overflow-tooltip label="完成数量">
				</el-table-column>
				<el-table-column prop="orderStatus" show-overflow-tooltip label="订单状态">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		list: {
			typeof: Array,
			default: () => []
		}
	},
	data() {
		return {
			tableData: [],
			scrollTimer: null,
		}
	},
	watch: {
		list: {
			handler: function (newVal) {
				this.tableData = newVal;
			},
			deep: true
		}
	},
	mounted() {
		this.autoScroll();
	},
	beforeDestroy() {
		this.autoScroll(true);
	},
	methods: {
		handleLevel() {
			this.autoScroll(false);
		},
		handleEnter() {
			this.autoScroll(true);
		},
		autoScroll(stop) {
			const table = this.$refs.scrollTable
			// 拿到表格中承载数据的div元素
			const divData = table.$refs.bodyWrapper
			// 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果(此配置为每100毫秒移动1像素)
			if (stop) {
				//再通过事件监听，监听到 组件销毁 后，再执行关闭计时器。
				window.clearInterval(this.scrollTimer)
			} else {
				this.scrollTimer = window.setInterval(() => {
					// 元素自增距离顶部1像素
					divData.scrollTop += 1
					// 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
					if (divData.clientHeight + divData.scrollTop == divData.scrollHeight) {
						// 重置table距离顶部距离
						divData.scrollTop = 0
						// 重置table距离顶部距离。值=(滚动到底部时，距离顶部的大小) - 整个高度/2
						// divData.scrollTop = divData.scrollTop - divData.scrollHeight / 2
					}
				}, 150) // 滚动速度
			}
		},
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
	padding-top: 3%;
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
	width: 93%;
	height: 82%;
	// margin: 0 4%;
	overflow: hidden;
}
</style>
<style lang="scss">
.time-table-container {
	.table-c {
		background: transparent;

		.el-table {
			background-color: transparent;

			&::before {
				height: 0px !important;
			}

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
				height: 30px;
				font-size: 10px;
				border-bottom: none;
			}
		}

		// tr:hover>td {
		// 	background-color: rgba(133, 133, 133, 0.5) !important;
		// 	color: #0099ff;
		// }
	}
}

::-webkit-scrollbar {
	display: none;
}
</style>
<style lang="scss">
$width: 10px;
$width_active: 6px;

.time-table-container {

	.el-table__body-wrapper::-webkit-scrollbar {
		width: 0;
	}

	.el-table__header-wrapper,
	.el-table__body-wrapper {
		padding-left: 7%
	}


	.el-table--enable-row-hover .el-table__body tr:hover {
		td {
			background-color: #3c4f72 !important;
			color: #478ddb;

			&:first-child {
				content: "";
				width: $width;


				&::before {
					content: "";
					position: absolute;
					top: 11px;
					left: -12px;
					width: 0;
					height: 0;
					border-bottom: $width_active solid transparent;
					border-top: $width_active solid transparent;
					border-left: $width_active solid #4da3ff;
					border-right: $width_active solid transparent;

				}

			}


		}

	}
}
</style>
