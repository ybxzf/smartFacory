<template>
  <div class="section">
    <div class="title">
      <span>实时监控
        <el-select v-model="selectCameraId" placeholder="请选择" clearable size="mini" popper-class="camera-popper force-top"
          class="camera-select mySelect" :popper-append-to-body="false" @visible-change="resetPopperPosition"
          @change="changeCamera">
          <el-option v-for="item in cameraList" :key="item.id" :label="item.lineBody" :value="item.id">
          </el-option>
        </el-select>
      </span>
      <div class="button">
        <!-- <el-tooltip content="配置更多" placement="top">
          <el-button class="button" type="primary" icon="el-icon-more" size="mini" circle
            @click="handleConfig"></el-button>
        </el-tooltip> -->
        <el-button class="el-button" size="mini" @click="login">登录</el-button>
        <!-- <el-button class="el-button" size="mini" @click="handlePort">获取可用通道</el-button> -->
        <el-button class="el-button" size="mini" @click="see">预览</el-button>
      </div>
    </div>
    <div class="monitor" v-loading="!cameraShow">
      <div ref="divPlugin" id="divPlugin" class="video" v-if="cameraShow" v-loading="isPreview"></div>
      <!-- <video ref="videoPlayer" class="video" autoplay preload="metadata" @ended="autoPlayVideo()">
        <source type="video/mp4" :src="videoSrc">
      </video> -->
    </div>
  </div>
</template>

<script>
import { getCameraData } from '@/api/bigScreen/index.js';
export default {
  props: {},
  data() {
    return {
      // videoSrc: require("../../../assets/images/bigScreen/monitor_demo.mp4"),
      szIP: "172.17.6.109",     //IP地址
      iPrototocol: 1,
      iPort: '80',               //端口号
      szUserName: 'admin',        //用户名
      szPassword: 'longdian2021',   //管理员密码
      ids: [],
      cameraList: [],
      selectCameraId: null,
      cameraShow: true,
      isPreview: false,
    }
  },
  async mounted() {
    document.body.appendChild(document.querySelector('.force-top.el-select-dropdown'))
    try {
      this.isPreview = true;
      const res = await getCameraData();
      if (res.code === 200 && res.rows && res.rows.length > 0) {
        this.cameraList = res.rows;
        const len = this.cameraList.length;
        const firstData = len ? this.cameraList[0] : null;
        if (firstData) {
          this.selectCameraId = firstData.id;
          this.szIP = firstData.reserved1;
          this.iPort = firstData.reserved2;
          this.szUserName = firstData.reserved3;
          this.szPassword = firstData.reserved4;
        }
      } else {
        this.$message.error("监控信息获取失败！");
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.init();
      window.addEventListener('resize', this.monitorResize);
      // this.autoPlayVideo();
    }

  },
  methods: {
    resetPopperPosition(val) {
      if (val) {
        // 初始化隐藏下拉框防止闪烁
        const popperInit = document.querySelector('.force-top.el-select-dropdown');
        popperInit.style.visibility = 'hidden';
        setTimeout(() => {
          const popper = document.querySelector('.force-top.el-select-dropdown');
          const input = document.querySelector('.mySelect>.el-input');
          //需要下拉框arrow箭头就放开下面代码注释
          // const arrow = document.querySelector('.force-top>.popper__arrow');
          if (popper && input) {
            const inputRect = input.getBoundingClientRect();
            const popperHeight = popper.offsetHeight;

            // 修正后的定位计算
            const topPosition = inputRect.top - popperHeight - 5;
            popper.style.position = 'fixed';
            popper.style.top = `${Math.max(topPosition, 5)}px`; // 确保不超出视窗顶部
            // popper.style.top = Math.max(topPosition, 5) + `px`; // 确保不超出视窗顶部
            popper.style.left = `${inputRect.left}px`;
            popper.style.width = `${inputRect.width + 100}px`;
            popper.style.zIndex = 9999;
            popper.style.visibility = 'visible'; // 计算好再出现
            //需要下拉框arrow箭头就放开下面代码注释
            // arrow.style.top = `${popperHeight - 1}px`;
            // arrow.style.transform = 'rotate(180deg)';
            console.log('定位参数:', {
              inputTop: inputRect.top,
              popperHeight,
              finalTop: topPosition,
              appliedTop: popper.style.top
            });
          }
        }, 100);
      }
    },
    //监控改变
    changeCamera(val) {
      this.cameraShow = false;
      console.log("val", val);
      console.log("this.cameraList", this.cameraList);
      console.log("this.selectCameraId", this.selectCameraId);
      this.selectCameraId = val;
      const selectedCamera = this.cameraList.find(item => item.id === val);
      if (val) {
        this.szIP = selectedCamera.reserved1;
        this.iPort = selectedCamera.reserved2;
        this.szUserName = selectedCamera.reserved3;
        this.szPassword = selectedCamera.reserved4;
      } else {
        this.szIP = '172.17.6.109';
        this.iPort = '80';
        this.szUserName = 'admin';
        this.szPassword = 'longdian2021';
      }
      this.stopSee();
      this.logout();
      this.destruction();
      setTimeout(() => {
        // this.destruction();
      }, 1000)
      setTimeout(() => {
        this.cameraShow = true;
        this.init();
      }, 5000);
    },
    //初始化
    init() {
      const that = this;
      WebVideoCtrl.I_InitPlugin({
        iWndowType: 1,
        bWndFull: true,     //是否支持单窗口双击全屏，默认支持 true:支持 false:不支持
        cbInitPluginComplete: function () {
          WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin").then(() => {
            // 检查插件是否最新
            WebVideoCtrl.I_CheckPluginVersion().then((bFlag) => {
              if (bFlag) {
                that.$message.error("检测到新的插件版本，双击开发包目录里的HCWebSDKPlugin.exe升级！");
              }
            });
            that.login();
          }, (error) => {
            console.log(error);
            const h = that.$createElement;
            that.$message({
              type: 'error',
              message: h('a', {
                attrs: {
                  href: '/webControls/HCWebSDKPluginsUserSetup.exe',
                  style: 'color: teal;text-decoration: none;'
                },
              },
                "插件初始化失败，请确认是否已安装插件；如果未安装，请点击此处安装！")
            });
          });
        },
      });
    },
    login() {
      const that = this;
      WebVideoCtrl.I_Login(this.szIP, this.iPrototocol, this.iPort, this.szUserName, this.szPassword, {
        success: function () {
          that.$message({
            type: 'success',
            message: '监控登录成功!'
          });
          that.see();
        },
        error: function (err) {
          if (err.errorCode === 2000) {
            that.$message.error("监控未登录！");
          } else if (err.errorCode === 2001) {
            that.$message.error("监控已登录！");
          } else if (err.errorCode === 2002) {

          } else {
            that.$message.error("监控登录失败，请检查配置！" + err.errorMsg);
          }
          that.isPreview = false;
        }
      });
    },
    handleConfig() {

    },
    handlePort() {
      const szDeviceIdentify = this.szIP + '_' + this.iPort;
      WebVideoCtrl.I_GetDigitalChannelInfo(szDeviceIdentify, {
        success: function (xmlDoc) {
          const oChannels = $(xmlDoc).find("InputProxyChannelStatus");
          $.each(oChannels, function (i) {
            const id = $(this).find("id").eq(0).text()
            const online = $(this).find("online").eq(0).text()
            if ("false" == online) {// 过滤禁用的数字通道
              return true;
            }
            // 如果你的监控不止一个，则可用的端口id不止一个
            that.ids.push(id)
          });
          console.log("获取可用通道");
        },
      });
    },
    see() {
      const that = this;
      WebVideoCtrl.I_StartRealPlay(this.szIP + '_' + this.iPort, {
        // iWndIndex: 1,
        iChannelID: this.ids[0], // 如果播放通道号给错了，浏览器会报代码为1000的错误
        success: () => {
          that.$message({
            type: 'success',
            message: '监控预览成功!'
          });
          that.isPreview = false;
        },
        error: (err) => {
          if (err.errorCode === 3001) {
            that.$message.error("监控已预览！");
          }
          else if (err.errorCode === 3002) {
          }
          else {
            that.$message.error("监控预览失败，请先登录！" + err.errorMsg);
          }
          that.isPreview = false;
        }
      })
    },
    // 停止预览
    stopSee() {
      // 停止单独的窗口
      WebVideoCtrl.I_Stop({
        iWndIndex: 0, // 想要停止的窗口
        success: () => {
          console.log('停止预览')
        }
      })
      // 停止所有窗口
      // WebVideoCtrl.I_StopAllPlay()
    },
    // 退出登录
    logout() {
      WebVideoCtrl.I_Logout(this.szIP + '_' + this.iPort)
    },
    // 销毁插件
    async destruction() {
      await WebVideoCtrl.I_DestroyPlugin();
    },
    //自动循环播放视频
    autoPlayVideo() {
      const videoElement = this.$refs.videoPlayer;
      if (videoElement) {
        videoElement.currentTime = 0; // 重置视频播放时间
        videoElement.muted = true; //静音
        videoElement.play();
      }
    },
    monitorResize() {
      // 获取窗口宽度
      const width = window.innerWidth;
      const height = window.innerHeight;
      const element = document.getElementById('divPlugin');
      element.style.fontSize = `${220 / 918 * height}px`;
    },
  },
  // 在组件销毁时调用
  beforeDestroy() {
    this.stopSee()
    this.logout()
    this.destruction();
  },
  destroyed() {
    setTimeout(() => {
      this.destruction()
    }, 100)
  },
}
</script>

<style lang="scss" scoped>
.section {
  width: 100%;
  height: 100%;
}

.camera-select {
  position: fixed;
  width: 100px;
  top: -3px;
  left: 80px;

  ::v-deep .el-input__inner {
    background-color: transparent;
    color: #ffffff;
    border: 1px solid #11a6ff;
  }

  ::v-deep .el-select__caret {
    color: #ffffff;
  }

}

.camera-popper {
  background-color: transparent !important;

  .el-select-dropdown__item {
    // color: #ff2727;
  }
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

  .button {
    position: absolute;
    top: 50%;
    right: 8%;
    transform: translateY(-50%);

    .el-button {
      background-color: #1890ff00;
      border-color: #1890ff47;
      color: #ffffff;
    }

    .el-button--primary {
      background-color: #1890ff00;
      border-color: #1890ff47;
      color: #ffffff;
    }
  }

  .el-icon-more {
    position: absolute;
    top: 50%;
    right: 8%;
    transform: translateY(-50%);
    cursor: pointer;
  }

}

.monitor {
  width: calc(100% - 10%);
  height: calc(85% - 10%);
  margin: 5%;
  position: relative;

  .video {
    position: absolute;
    width: 100%;
    height: 100%;
    height: 200px;
    transition: all 0.4s;
    border: 1px solid #0d5a8d;
  }
}

.monitor:hover video {
  transform: scale(1.05);
}
</style>
<style>
.camera-popper {
  /* //z-index: 10001!important; */
}

.force-top.el-select-dropdown {
  /* 需要下拉框arrow箭头可以设置margin-top: -6px; */
  margin: 0 !important;
  transform-origin: center bottom !important;
  position: fixed !important;
  top: 0;
  left: 0;

  .popper__arrow {
    display: none !important;
  }

  &.el-zoom-in-top-enter-active {
    transform-origin: center bottom !important;
  }
}
.force-top.el-select-dropdown.hover {
  background-color: #e35f5f;
}
</style>
