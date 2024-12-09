<template>
	<div class="content-container">
		<el-row :gutter="20" class="base-info">
			<el-col :span="4">
				<div class="com-part">
					<label>当前工单</label>
					<span>{{ baseInfo.no || '-' }}</span>
				</div>
			</el-col>
			<el-col :span="4">
				<div class="com-part">
					<label>工单数量</label>
					<span>{{ baseInfo.orderNum || '-' }}</span>
				</div>
			</el-col>
			<el-col :span="4">
				<div class="com-part">
					<label>客户</label>
					<span>{{ baseInfo.orderNum || '-' }}</span>
				</div>
			</el-col>
			<el-col :span="4">
				<div class="com-part">
					<label>产品名称</label>
					<span>{{ baseInfo.productName || '-' }}</span>
				</div>
			</el-col>
			<el-col :span="4">
				<div class="com-part">
					<label>产品型号规格</label>
					<span>{{ baseInfo.no || '-' }}</span>
				</div>
			</el-col>
			<el-col :span="4">
				<div class="com-part">
					<label>完成率</label>
					<span>{{ baseInfo.no || '-' }}</span>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="20" class="project-info">
			<el-col :span="2" v-for="item, index in projectInfo" :key="index">
				<div class="com-part">
					<label>{{ item.name }}</label>
					<span>{{ item.value || '0' }}</span>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="20" class="bad-info">
			<el-col :span="12">
				<BarChart :chartData="barData"></BarChart>
			</el-col>
			<el-col :span="12">
				<el-row :gutter="20">
					<el-col :span="8">
						<PieChart :chartData="pieData"></PieChart>
					</el-col>
					<el-col :span="8">
						<div class="person-info">
							<div class="person-info-item">
								<label>组长</label>
								<span>{{ personInfo.name || '-' }}</span>
							</div>
							<div class="person-info-item">
								<label>标准定员</label>
								<span>{{ personInfo.no || '-' }}</span>
							</div>
							<div class="person-info-item">
								<label>实际出勤</label>
								<span>{{ personInfo.station || '-' }}</span>
							</div>
							<div class="person-info-item">
								<label>人均产能</label>
								<span>{{ personInfo.station || '-' }}</span>
							</div>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="person-base-info">
							<img src="../../../../assets/images/bigScreen/logo.png" alt="">
							<div class="info-container">
								<div class="item">
									<label>姓名</label>
									<span>{{ personInfo.name || '-' }}</span>
								</div>
								<div class="item">
									<label>工单</label>
									<span>{{ personInfo.name || '-' }}</span>
								</div>
								<div class="item">
									<label>工单数量</label>
									<span>{{ personInfo.name || '-' }}</span>
								</div>
								<div class="item">
									<label>已生产数量</label>
									<span>{{ personInfo.name || '-' }}</span>
								</div>
								<div class="item">
									<label>合格数量</label>
									<span>{{ personInfo.name || '-' }}</span>
								</div>
								<div class="item">
									<label>不合格数量</label>
									<span>{{ personInfo.name || '-' }}</span>
								</div>
							</div>
						</div>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
		<el-row :gutter="20" class="bottom-info">
			<el-col :span="12" class="table-c">
				<el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName" height="100%"
					header-row-class-name="table-h-bg">
					<el-table-column prop="pcb" label="PCB板号">
					</el-table-column>
					<el-table-column prop="bad" label="不良项目">
					</el-table-column>
					<el-table-column prop="order" label="对应工单">
					</el-table-column>
					<el-table-column prop="time" label="生产时间">
					</el-table-column>
				</el-table>
			</el-col>
			<el-col :span="12" class="data-info-c">
				<el-row>
					<el-col :span="24">
						<div class="data-info">
							<el-row :gutter="20" class="item">
								<el-col :span="6" class="item-col">产能分析</el-col>
								<el-col :span="6" class="item-col">目标值</el-col>
								<el-col :span="6" class="item-col">实际值</el-col>
								<el-col :span="6" class="item-col">达成率</el-col>
							</el-row>
							<el-row :gutter="20" class="item">
								<el-col :span="6" class="item-col">每小时产能</el-col>
								<el-col :span="6" class="item-col">0</el-col>
								<el-col :span="6" class="item-col">0</el-col>
								<el-col :span="6" class="item-col">0</el-col>
							</el-row>
							<el-row :gutter="20" class="item">
								<el-col :span="6" class="item-col">当日产能</el-col>
								<el-col :span="6" class="item-col">0</el-col>
								<el-col :span="6" class="item-col">0</el-col>
								<el-col :span="6" class="item-col">0</el-col>
							</el-row>
						</div>
					</el-col>
				</el-row>
				<el-row class="line-chart-c-row">
					<el-col :span="24" class="line-chart-c-col">
						<LineChart height="100%" :chart-data="lineData"></LineChart>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import LineChart from '../chart/LineChart'
import PieChart from '../chart/PieChart'
import BarChart from '../chart/BarChart'
export default {
	components: {
		LineChart,
		PieChart,
		BarChart
	},
	name: 'DIPContent',
	data() {
		return {
			baseInfo: {},
			personInfo: {},
			tableData: [],
			barData: {
				xData: ['项目1', '项目2', '项目3', '项目4', '项目5', '项目6', '项目7', '项目8'],
				yData: [3, 8, 1, 6, 9, 4, 1, 3]
			},
			lineData: {
				legendData: ['实际产能', '目标产能'],
				expectedData: [120, 200, 150, 80, 70, 110, 130, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150],
				actualData: [60, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130],
				xData: ['0时', '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时']
			},
			pieData: {
				legendData: ['物料异常', '设备异常', '软件异常'],
				yData: [
					{
						val: 1.5,
						name: '软件异常',
						itemStyle: {
							color: 'rgba(18, 76, 154, 1)',
						}
					},
					{
						val: 1,
						name: '物料异常',
						itemStyle: {
							color: 'rgba(15, 176, 255, 1)',
						}
					},
					{
						val: 0.5,
						name: '设备异常',
						itemStyle: {
							color: 'rgba(0, 244, 188, 1)',
						}
					},
				]
			},
			projectInfo: [
				{
					name: '测试项目1',
					value: 100
				},
				{
					name: '测试项目2',
					value: 100
				},
				{
					name: '测试项目3',
					value: 100
				},
				{
					name: '测试项目4',
					value: 100
				},
				{
					name: '测试项目5',
					value: 100
				},
				{
					name: '测试项目6',
					value: 100
				},
				{
					name: '测试项目7',
					value: 100
				},
				{
					name: '测试项目8',
					value: 100
				},
				{
					name: '不良总数',
					value: 100
				},
				{
					name: '不良比例',
					value: "100%"
				}
			],
		}
	},
	mounted() {
		for (let index = 0; index < 100; index++) {
			const obj = {
				pcb: 'xxx',
				bad: 'xxx',
				order: 'xxx',
				time: "xxxx"
			}
			this.tableData.push(obj);
		}
	},
	methods: {
		tableRowClassName({ row, rowIndex }) {
			return rowIndex % 2 === 0 ? 'odd-row' : 'even-row';
		}
	},
	beforeDestroy() {

	}
}
</script>

<style scoped lang="scss">
$minHeight: 300px;

.content-container {
	.base-info {
		.com-part {
			min-height: 40px;
			display: flex;
			line-height: 40px;
			color: #fff;
			font-size: 14px;
			background-color: rgba(25, 129, 246, 0.5);
			border: 1px solid transparent;

			label {
				min-width: 100px;
				text-align: center;
				margin-right: 4px;
				border-right: 3px solid #3666e3;
			}

			span {
				flex: 1;
				padding-left: 4px;
			}
		}
	}

	.project-info {
		display: flex;
		justify-content: space-between;
		margin-top: 16px;

		.com-part {
			min-height: 40px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			line-height: 40px;
			color: #fff;
			font-size: 14px;
			background-color: rgba(25, 129, 246, 0.5);
			border: 1px solid transparent;
		}
	}

	.bad-info {
		min-height: $minHeight;
		margin-top: 16px;

		.person-info {
			display: flex;
			flex-direction: column;
			color: #fff;
			padding: 16px;
			align-items: center;

			.person-info-item {
				width: 100%;
				height: 36px;
				margin-top: 16px;
				line-height: 36px;
				background-color: rgba(25, 129, 246, 0.5);
				border: 1px solid transparent;

				label {
					min-width: 100px;
					text-align: center;
					margin-right: 4px;
					font-weight: 500;
					font-size: 14px;
					padding: 0 8px;
					border-right: 3px solid #3666e3;
				}

				span {
					padding-left: 8px;
				}
			}
		}

		.person-base-info {
			display: flex;
			flex-direction: column;
			align-items: center;

			img {
				width: 60px;
				height: 90px;
				object-fit: contain;
			}

			.info-container {
				width: 100%;

				.item {
					width: 100%;
					height: 27px;
					line-height: 27px;
					margin-top: 8px;
					background-color: rgba(25, 129, 246, 0.5);
					// box-shadow: 0 0 3px 3px rgba(25, 129, 246, 0.7);
					border: 1px solid transparent;

					label {
						min-width: 100px;
						text-align: center;
						font-weight: 500;
						font-size: 14px;
						padding: 0 8px;
						border-right: 3px solid #3666e3;
					}

					span {
						padding-left: 8px;
					}
				}
			}
		}
	}

	.bottom-info {
		height: calc(100% - 472px);
		margin-top: 16px;

		.table-c {
			background: transparent;
			height: 100%;

			::v-deep.el-table {
				background: transparent;

				&::before {
					height: 0px !important;
				}

				tr {
					background: transparent;
					color: #fff;

					th,
					td {
						border-bottom: none;
					}
				}

				.table-h-bg {
					th {
						background: rgba(25, 129, 246, 0.5);
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
		}

		.data-info-c {
			height: 100%;

			.line-chart-c-row {
				height: calc(100% - 100px);

				.line-chart-c-col {
					height: 100%;
				}
			}
		}

		.data-info {
			color: #fff;
			background-color: rgba(25, 129, 246, 0.5);
			margin-bottom: 4px;

			.item-col {
				height: 32px;
				line-height: 32px;
				text-align: center;
			}
		}
	}


}
</style>
<style lang='scss'>
.content-container {
	height: calc(100% - 40px);

	::-webkit-scrollbar {
		// display: none; 
	}

	.bottom-info {
		.el-table th.gutter {
			display: none;
			width: 0
		}

		.el-table colgroup col[name='gutter'] {
			display: none;
			width: 0;
		}

		.el-table__body {
			width: 100% !important;
		}

		.el-table__body-wrapper {
			&::-webkit-scrollbar {
				width: 0;
				height: 6px;
				border: none;
			}

			&::-webkit-scrollbar-track {
				border: none;
			}
		}

		// .el-table__body-wrapper::-webkit-scrollbar {
		// 	width: 0;
		// 	height: 6px;
		// }

		// .el-table__body-wrapper:hover::-webkit-scrollbar {
		// 	width: 6px;
		// 	height: 6px;
		// }

		// .el-table__body-wrapper::-webkit-scrollbar-track-piece {
		// 	background-color: transparent;
		// }

		.el-table--enable-row-hover .el-table__body tr:hover {
			td {
				background-color: #3c4f72 !important;
				color: #478ddb;
			}

		}
	}
}
</style>