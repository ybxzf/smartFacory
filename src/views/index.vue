<template>
  <div ref="bigScreenHome" class="big-screen-home">
    <div class="big-screen-header">
      <svg-icon class="full-screen-icon" :icon-class="isFullScreen ? 'exit-fullscreen' : 'fullscreen'" @click="toggleFullScreen()" />
    </div>
    <div class="screen-title">标题</div>
    <div class="screen-content">
      <el-col class="grid-content grid-left">
        <el-col :span="24">
          <div class="left-item item-top" >
            1
          </div>
          <div class="left-item item-middle" >
            2
          </div>
          <div class="left-item item-bottom" >
            3
          </div>
        </el-col>
      </el-col>
      <el-col class="grid-content grid-center">
        <el-col :span="24">
          <div class="center-item item-top" >
            4
          </div>
          <div class="center-item item-bottom" >
            5
          </div>
        </el-col>
      </el-col>
      <el-col class="grid-content grid-right">
        <el-col :span="24">
          <div class="right-item item-top" >
            6
          </div>
          <div class="right-item item-middle" >
            7
          </div>
          <div class="right-item item-bottom" >
            8
          </div>
        </el-col>
      </el-col>
    </div>
  </div>
</template>

<script>

export default {
  name: "Index",
  components: {
  },
  data() {
    return {
      isFullScreen: false,//全屏

    }
  },
  mounted() {

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
    }
  }
};
</script>

<style lang="scss" scoped>
.big-screen-home {
  width: 100%;
  min-height: calc(100vh - 84px);
  /* 设置背景图片 */
  background-image: url('../assets/images/bigScreen-bg.png');
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

  .big-screen-header {
    position: absolute;
    top: 3vh;
    right: 5%;
    .full-screen-icon{
      color: aqua;
    }
  }
}

.big-screen-home :fullscreen {
  width: 100%;
  height: 100vh;
}

.screen-title {
  width:100%;
  height:7vh;
  text-align:center;
  background-color: rgba(33, 255, 28,0.5);
}

.screen-content {
  display:flex;
  // flex-direction: column;
  height: calc(100vh - 7vh);

  .grid-content {
    flex-grow: 1; /* 让子元素填满剩余空间 */
  }
  .grid-left {
    width: 25%;
    .left-item{
      height:33vh;
      width:100%;
    }
    .item-top{
      background-color: rgba(91, 0, 0,0.5);
    }
    .item-middle{
      background-color: rgba(255, 0, 0,0.5);
    }
    .item-bottom{
      background-color: rgba(255, 128, 128,0.5);
    }

  }
  .grid-center {
    width: 50%;
    .center-item{
      width:100%;
    }
    .item-top{
      height:66vh;
      background-color: rgba(194, 198, 57,0.5);
    }
    .item-bottom{
      height:33vh;
      background-color: rgba(255, 128, 64,0.5);
    }
  }
  .grid-right {
    width: 25%;
    .right-item{
      height:33vh;
      width:100%;
    }
    .item-top{
      background-color: rgba(50, 28, 255,0.5);
    }
    .item-middle{
      background-color: rgba(0, 128, 192,0.5);
    }
    .item-bottom{
      background-color: rgba(128, 128, 255,0.5);
    }
  }
}
</style>
