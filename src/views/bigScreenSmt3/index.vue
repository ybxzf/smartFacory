<template>
    <div class="dip-three-container">
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
    name: "bigScreenSmt3",
    components: {
        CustomHeader,
        CustomContent,
    },
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {
        nextLevel() {
            this.$router.push('BigScreenSmt3')
        },
    },
}
</script>
<style lang="scss" scoped>
.dip-three-container {
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
</style>
