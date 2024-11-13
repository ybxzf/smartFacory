<template>
  <div class="section">
    <div class="title">
      <span>实时监控</span>
    </div>
    <div class="monitor">
      <video ref="videoPlayer" class="video" autoplay preload="metadata" @ended="autoPlayVideo()">
        <source type="video/mp4" :src="videoSrc">
      </video>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      videoSrc: require("../../../assets/images/bigScreen/monitor_demo.mp4")
    }
  },
  mounted() {
    this.autoPlayVideo();
  },
  methods: {
    //自动循环播放视频
    autoPlayVideo() {
      const videoElement = this.$refs.videoPlayer;
      if (videoElement) {
        videoElement.currentTime = 0; // 重置视频播放时间
        videoElement.muted = true; //静音
        videoElement.play();
      }
    },
  }
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

.monitor {
  width: calc(100% - 10%);
  height: calc(85% - 10%);
  margin: 5%;

  .video {
    width: 100%;
    height: 100%;
    transition: all 0.4s;
  }
}

.monitor:hover video {
  transform: scale(1.05);
}
</style>
