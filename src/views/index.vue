<template>
  <div ref="bigScreenHome" class="big-screen-home">
    <div class="big-screen-header">
      <svg-icon class="full-screen-icon" :icon-class="isFullScreen ? 'exit-fullscreen' : 'fullscreen'" @click="toggleFullScreen()" />
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
  background-color: #3157ff;
  position: relative;

  .big-screen-header {
    position: absolute;
    top: 10px;
    right: 10%;
    .full-screen-icon{
      color: aqua;
    }
  }
}

.big-screen-home:fullscreen {
  width: 100%;
  height: 100vh;
}
</style>
