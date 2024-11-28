<template>
	<div class="section">
		<div class="title">
			<span>成品检验</span>
		</div>
		<div class="content">成品合格率（%）</div>
		<div class="cuboidBar" id="cuboidBar"></div>
	</div>
</template>

<script>
import * as echarts from 'echarts';
import { mapGetters } from 'vuex';
export default {
	props: {
		homeData: {
			typeof: Array,
			default: () => []
		},
		overseasData: {
			typeof: Array,
			default: () => []
		},
		xData: {
			typeof: Array,
			default: () => []
		},
		targetData: {
			typeof: Array,
			default: () => []
		},
		barWidth: {
			typeof: Number,
			default: 5
		},
	},
	data() {
		return {
			cuboidChart: null,
		}
	},
	computed: {
		...mapGetters([
			'sidebar',
		]),
	},
	watch: {
		"sidebar.opened"(newVal) {
			setTimeout(() => {
				this.chartResize();
			}, 150);
		},
		xData: {
			handler: function (newVal) {
				newVal.length && this.init();
			},
			deep: true,
			immediate: true
		}
	},
	mounted() {
		this.init();
	},
	methods: {
		init() {
			this.cuboidChart = echarts.init(document.getElementById('cuboidBar'));
			this.drawShape(this.barWidth);
			window.addEventListener('resize', this.chartResize);
		},
		drawShape(width) {
			const leftShape = echarts.graphic.extendShape({
				buildPath(ctx, shape) {
					const { topBasicsYAxis, bottomYAxis, basicsXAxis } = shape;
					// 侧面宽度
					const WIDTH = width;
					// 斜角高度
					const OBLIQUE_ANGLE_HEIGHT = 3.6;

					const p1 = [basicsXAxis - WIDTH, topBasicsYAxis - OBLIQUE_ANGLE_HEIGHT];
					const p2 = [basicsXAxis - WIDTH, bottomYAxis];
					const p3 = [basicsXAxis, bottomYAxis];
					const p4 = [basicsXAxis, topBasicsYAxis];

					ctx.moveTo(p1[0], p1[1]);
					ctx.lineTo(p2[0], p2[1]);
					ctx.lineTo(p3[0], p3[1]);
					ctx.lineTo(p4[0], p4[1]);
				},
			});

			const rightShape = echarts.graphic.extendShape({
				buildPath(ctx, shape) {
					const { topBasicsYAxis, bottomYAxis, basicsXAxis } = shape;
					// 侧面宽度
					const WIDTH = width;
					// 斜角高度
					const OBLIQUE_ANGLE_HEIGHT = 3.6;

					const p1 = [basicsXAxis, topBasicsYAxis];
					const p2 = [basicsXAxis, bottomYAxis];
					const p3 = [basicsXAxis + WIDTH, bottomYAxis];
					const p4 = [basicsXAxis + WIDTH, topBasicsYAxis - OBLIQUE_ANGLE_HEIGHT];

					ctx.moveTo(p1[0], p1[1]);
					ctx.lineTo(p2[0], p2[1]);
					ctx.lineTo(p3[0], p3[1]);
					ctx.lineTo(p4[0], p4[1]);
				},
			});

			const topShape = echarts.graphic.extendShape({
				buildPath(ctx, shape) {
					const { topBasicsYAxis, basicsXAxis } = shape;
					// 侧面宽度
					const WIDTH = width;
					// 斜角高度
					const OBLIQUE_ANGLE_HEIGHT = 3.6;

					const p1 = [basicsXAxis, topBasicsYAxis];
					const p2 = [basicsXAxis + WIDTH, topBasicsYAxis - OBLIQUE_ANGLE_HEIGHT];
					const p3 = [basicsXAxis, topBasicsYAxis - OBLIQUE_ANGLE_HEIGHT * 2];
					const p4 = [basicsXAxis - WIDTH, topBasicsYAxis - OBLIQUE_ANGLE_HEIGHT];

					ctx.moveTo(p1[0], p1[1]);
					ctx.lineTo(p2[0], p2[1]);
					ctx.lineTo(p3[0], p3[1]);
					ctx.lineTo(p4[0], p4[1]);
				},
			});

			echarts.graphic.registerShape("leftShape", leftShape);
			echarts.graphic.registerShape("rightShape", rightShape);
			echarts.graphic.registerShape("topShape", topShape);
			this.drawChart();
		},
		getFinalDom(params) {
			const labelValue = params[0].axisValue;
			const label = `<span>${labelValue}</span>`;
			const map = {
				'国内': '#22a3f3',
				'国外': '#ff831f',
				'目标值': '#06C039',
			};
			let str = '';
			let len = params.length;
			params.map((item, index) => {
				let marker = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${map[item['seriesName']]};"></span>`;
				let dom = `${marker}${item['seriesName']}：${item.value}`;
				if (index !== len - 1) {
					dom = dom + '<br/>'
				}
				str += dom;
			})
			return `${label}<br/>${str}`;
		},
		drawChart() {
			const that = this;
			const option = {
				legend: {
					data: [
						{
							name: "国内",
							textStyle: {
								color: "#fff"
							},
							itemStyle: {
								color: "#22a3f3"
							},
						},
						{
							name: "国外",
							textStyle: {
								color: "#fff"
							},
							itemStyle: {
								color: "#ff831f"
							},
						}, {
							name: '目标值',
							itemStyle: {
								color: '#06C039'
							},
							icon: 'path://m0.010277,5.945418l24.979446,0l0,2.109164l-24.979446,0l0,-2.109164z',
							textStyle: {
								color: "#fff"
							}
						}],
				},
				grid: {
					top: 30,
					left: 15,
					right: 20,
					bottom: 5,
					containLabel: true,
				},
				xAxis: {
					type: "category",
					data: this.xData,
					axisTick: {
						show: false,
					},
					axisLine: {
						// show: false,
					},
					axisLabel: {
						// interval: 0,
						color: "#04CDD6",
					}
				},

				yAxis: {
					type: "value",
					axisLabel: {
						color: "#04CDD6",
					},
					splitLine: {
						lineStyle: {
							color: "#222",
						},
					},
				},
				tooltip: {
					trigger: "axis",
					formatter: (params) => {
						const renderDom = that.getFinalDom(params);
						return renderDom;
					}
				},
				series: [
					{
						type: "custom",
						data: this.homeData,
						name: '国内',
						renderItem(params, api) {
							// 基础坐标
							const basicsCoord = api.coord([api.value(0), api.value(1)]);
							// 顶部基础 y 轴
							const topBasicsYAxis = basicsCoord[1];
							// 基础 x 轴
							const basicsXAxis = basicsCoord[0];
							// 底部 y 轴
							const bottomYAxis = api.coord([api.value(0), 0])[1];
							return {
								type: "group",
								children: [
									{
										type: "leftShape",
										shape: {
											topBasicsYAxis,
											basicsXAxis,
											bottomYAxis,
										},
										style: {
											fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
												{
													offset: 0,
													color: 'rgb(23,192,251)',
												},

												{
													offset: 0.8,
													color: 'rgb(25,171,233)',
												},
												{
													offset: 1,
													color: 'rgb(26,84,150)',
												},
											]),
											emphasis: {
												fill: 'yellow', // 鼠标高亮时的填充颜色
											},
										},
									},
									{
										type: "rightShape",
										shape: {
											topBasicsYAxis,
											basicsXAxis,
											bottomYAxis,
										},
										style: {
											fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
												{
													offset: 0,
													// color: '#278ee7',
													color: 'rgb(15,51,99)',
												},

												{
													offset: 0.8,
													color: 'rgb(18,82,135)',
												},
												{
													offset: 1,
													// color: 'rgb(15,51,99)',
													color: '#278ee7',
												},
											]),
										},
									},
									{
										type: "topShape",
										shape: {
											topBasicsYAxis,
											basicsXAxis,
											bottomYAxis,
										},
										style: {
											fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
												{
													offset: 0.3,
													color: '#22a3f3',
												},
												{
													offset: 1,
													color: '#22a3f3',
												},
											]),
										},
									},
								],
							};
						}
					},
					{
						name: '国外',
						type: "custom",
						data: this.overseasData,
						renderItem(params, api) {
							// 基础坐标
							const basicsCoord = api.coord([api.value(0), api.value(1)]);
							// 顶部基础 y 轴
							const topBasicsYAxis = basicsCoord[1];
							// 基础 x 轴
							const basicsXAxis = basicsCoord[0] + that.barWidth * 1.5;
							// 底部 y 轴
							const bottomYAxis = api.coord([api.value(0), 0])[1];
							return {
								type: "group",
								children: [
									{
										type: "leftShape",
										shape: {
											topBasicsYAxis,
											basicsXAxis,
											bottomYAxis,
										},
										style: {
											fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
												{
													offset: 0,
													color: '#ff831f',
												},

												{
													offset: 0.8,
													color: 'rgb(235,124,37)',
												},
												{
													offset: 1,
													// color: 'rgb(255,131,31)',
													color: '#604e51',
												},
											]),
											emphasis: {
												fill: 'yellow', // 鼠标高亮时的填充颜色
											},
										},
									},
									{
										type: "rightShape",
										shape: {
											topBasicsYAxis,
											basicsXAxis,
											bottomYAxis,
										},
										style: {
											fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
												{
													offset: 0,
													color: 'rgb(34,44,78)',
												},

												{
													offset: 0.8,
													color: '#b4662f',
												},
												{
													offset: 1,
													color: 'rgb(248,128,32)',
												},
											]),
										},
									},
									{
										type: "topShape",
										shape: {
											topBasicsYAxis,
											basicsXAxis,
											bottomYAxis,
										},
										style: {
											fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
												{
													offset: 0.3,
													color: '#ff831f',
												},
												{
													offset: 1,
													color: '#ff831f',
												},
											]),
										},
									},
								],
							};
						}
					},
					{ /* TIP: 增加的series */
						type: 'line',
						symbol: 'none',
						name: '目标值',
						data: this.targetData,
						itemStyle: {
							normal: {
								color: '#06C039',
								lineStyle: {
									color: '#06C039',
								}
							}
						},
						// markLine: {
						// 	symbol: "none",   //是否显示首尾箭头
						// 	data: [
						// 		//第一条线
						// 		{
						// 			yAxis: 200,
						// 			name: "平均线",
						// 			lineStyle: {
						// 				type: "solid",
						// 				color: "#FA6400",
						// 				width: 2,
						// 			},
						// 			label: {
						// 				//将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
						// 				position: "middle",
						// 				fontSize: 14,
						// 				formatter: "",
						// 			},
						// 		}]
						// },
					}
				],
			};
			this.cuboidChart.setOption(option);
		},
		chartResize() {
			this.cuboidChart && this.cuboidChart.resize();
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

.content {
	height: 5%;
	font-size: 10%;
	text-align: center;
	color: #04CDD6;
}

#cuboidBar {
	width: 100%;
	height: 77%;
}
</style>
