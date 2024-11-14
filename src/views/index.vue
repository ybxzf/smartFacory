<template>
	<div ref="bigScreenHome" class="big-screen-home">
    <div class="screen-title">
      <div class="big-screen-header">
        <svg-icon class="full-screen-icon" :icon-class="isFullScreen ? 'exit-fullscreen' : 'fullscreen'"
          @click="toggleFullScreen()" />
      </div>
      <div class="big-screen-header-logo">
        <img src="../assets/images/bigScreen/logo.png" alt="">
      </div>
      <span>数智化工厂智慧物联平台</span>
      <div class="time-container">
        {{ dateTime }}
      </div>
    </div>
		<div class="screen-content">
			<el-col class="grid-content grid-left">
				<el-col :span="24">
					<div class="left-item item-top">
						<order-scheduling></order-scheduling>
					</div>
					<div class="left-item item-middle">
						<lineAndStackBar></lineAndStackBar>
					</div>
					<div class="left-item item-bottom">
						<cylinder></cylinder>
					</div>
				</el-col>
			</el-col>
			<el-col class="grid-content grid-center">
				<el-col :span="24">
					<div class="center-item item-top">
						4
					</div>
					<div class="center-item item-bottom">
						<attendance></attendance>
					</div>
				</el-col>
			</el-col>
			<el-col class="grid-content grid-right">
				<el-col :span="24">
					<div class="right-item item-top">
						<CuboidBar></CuboidBar>
					</div>
					<div class="right-item item-middle">
						<StatusShow></StatusShow>
					</div>
					<div class="right-item item-bottom">
						<realTimeMonitor></realTimeMonitor>
					</div>
				</el-col>
			</el-col>
		</div>
	</div>
</template>

<script>
import StatusShow from './bigScreen/components/statusShow'
import moment from 'moment';
import CuboidBar from './bigScreen/components/cuboidBar'
import Cylinder from './bigScreen/components/cylinder.vue';
import lineAndStackBar from './bigScreen/components/lineAndStackBar.vue';
import realTimeMonitor from "./bigScreen/components/realTimeMonitor.vue";
import OrderScheduling from './bigScreen/components/orderScheduling.vue';
import Attendance from './bigScreen/components/attendance.vue';
export default {
	name: "Index",
	components: {
    StatusShow,
		CuboidBar,
		Cylinder,
		lineAndStackBar,
		realTimeMonitor,
		OrderScheduling,
		Attendance
	},
	data() {
		return {
			isFullScreen: false,//全屏
			dateTime: '',
			timeId: null,
		}
	},
	created() {
		this.dateTime = this.getNowTime();
	},
	mounted() {
		this.timeId = setInterval(() => { //初始化定时器
			this.dateTime = this.getNowTime();
		}, 1000);
	},
	methods: {
		toggleFullScreen() {
			const divElement = this.$refs.bigScreenHome;
			if (!document.fullscreenElement && !document.webkitFullscreenElement &&
				!document.mozFullScreenElement && !document.msFullscreenElement) {
				// 启用全屏
				this.isFullScreen = true;
				if (divElement.requestFullscreen) {
					divElement.requestFullscreen();
				} else if (divElement.webkitRequestFullscreen) {
					divElement.webkitRequestFullscreen();
				} else if (divElement.mozRequestFullScreen) {
					divElement.mozRequestFullScreen();
				} else if (divElement.msRequestFullscreen) {
					divElement.msRequestFullscreen();
				}
			} else {
				// 退出全屏
				this.isFullScreen = false;
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				}
			}
		},
		getNowTime() {
			const now = Date.now();
			return moment(now).format("YYYY年MM月DD日  HH:mm:ss");
		},
	}
};
</script>

<style lang="scss" scoped>
.big-screen-home {
	width: 100%;
	min-height: calc(100vh - 84px);
	/* 设置背景图片 */
	background-image: url('../assets/images/bigScreen/bigScreen_bg.png');
	/* 不重复背景图片 */
	background-repeat: no-repeat;
	/* 图片铺满容器 */
	background-size: 100% 100%;
	/* 背景居中显示 */
	background-position: center center;
	/* 背景图片固定，不随滚动 */
	// background-attachment: fixed;
	background-color: #122A4A;
	position: relative;
	color: #ffffff;

}

.big-screen-home :fullscreen {
	width: 100%;
	height: 100vh;
}

.screen-title {
	width: 100%;
	height: 7vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  span{
    text-align: center;
    letter-spacing: 12px;
    vertical-align: bottom;
    font-size: 30px;
    font-weight: 800;
  }

	// background-color: rgba(33, 255, 28, 0.5);
  .big-screen-header {
		position: absolute;
		right: 5%;
		top: 50%;
    transform: translateY(-50%);
    cursor: pointer;

		.full-screen-icon {
			color: aqua;
      width: 20px;
      height: 20px;
		}
	}

	.big-screen-header-logo {
		position: absolute;
		left: 2%;
		top: 50%;
    transform: translateY(-50%);
	}

	.time-container {
		position: absolute;
		right: 0.875rem;
    bottom: 0;
		// top: 1.5625rem;
		color: #04c5d2;
		font-size: 0.875rem;
	}
}

.screen-content {
	display: flex;
	// flex-direction: column;
	height: calc(100vh - 7vh);

	.grid-content {
		flex-grow: 1;
		/* 让子元素填满剩余空间 */
	}

	.grid-left {
		width: 25%;
		background-image: url("../assets/images/bigScreen/column_bg.png");
		background-repeat: no-repeat;
		background-size: 97% 98%;
		background-position: center center;

		.left-item {
			height: 30vh;
			width: 100%;
		}

		.item-top {
			// background-color: rgba(91, 0, 0, 0.5);
		}

		.item-middle {
			// background-color: rgba(255, 0, 0, 0.5);
		}

		.item-bottom {
			// background-color: rgba(255, 128, 128, 0.5);
			height: 32vh;
		}
	}

	.grid-center {
		width: 50%;

		.center-item {
			width: 100%;
		}

		.item-top {
			height: 60vh;
			background-color: rgba(194, 198, 57, 0.5);
		}

		.item-bottom {
			height: 32vh;
      background-image: url("../assets/images/bigScreen/row_bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
			// background-color: rgba(255, 128, 64, 0.5);
		}
	}

	.grid-right {
		width: 25%;
		background-image: url("../assets/images/bigScreen/column_bg.png");
		background-repeat: no-repeat;
		background-size: 97% 98%;
		background-position: center center;

		.right-item {
			height: 30vh;
			width: 100%;
		}

		.item-top {
			// background-color: rgba(50, 28, 255, 0.5);
		}

		.item-middle {
			// background-color: rgba(0, 128, 192, 0.5);
		}

		.item-bottom {
			// background-color: rgba(128, 128, 255, 0.5);
			height: 32vh;
		}
	}
}
</style>
