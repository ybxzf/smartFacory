<template>
  <div class="dip-two-container">
    <div class="big-screen-header">
      <svg-icon class="full-screen-icon" :icon-class="isFullScreen ? 'exit-fullscreen' : 'fullscreen'"
        @click="toggleFullScreen()" />
    </div>
    <!-- <custom-header class="header-container">
            <template #title>
                SMT-02生产线可视化看板
            </template>
<template #button>
                <el-button type="success" round size="mini" @click="nextLevel">下一级</el-button>
            </template>
</custom-header> -->
    <custom-content class="content-container"></custom-content>
  </div>
</template>

<script>
import CustomHeader from '@/components/layout/header.vue';
import CustomContent from './components/layout/content.vue';

export default {
  name: "",
  components: {
    CustomHeader,
    CustomContent,
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
    },
    nextLevel() {
      this.$router.push('BigScreenSmt3')
    },
  },
}
</script>
<style lang="scss" scoped>
.dip-two-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
  /* 设置背景图片 */
  background-image: url("../../assets/images/bigScreen/kb_bg.png");
  /* 不重复背景图片 */
  background-repeat: no-repeat;
  /* 图片铺满容器 */
  background-size: 100% 100%;
  /* 背景居中显示 */
  background-position: center center;
  // background: #070f20;
  // background-color: #409eff;
  color: #ffffff;

  .header-container {
    margin: 0 10px;
  }

  .content-container {
    padding: 10px;
  }
}

.big-screen-header {
  position: absolute;
  left: 20px;
  top: 30px;
  transform: translateY(-50%);
  cursor: pointer;

  .full-screen-icon {
    color: aqua;
    width: 20px;
    height: 20px;
  }
}
</style>
