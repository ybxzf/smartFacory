<template>
	<div class="workshop-container">
		<div :class="active === 'aging' ? 'active-box' : ''" class="workshop-common workshop_aging"
			@click="handleClick('aging')">
			<img class="img" v-show="active !== 'aging'" src="@/assets/images/bigScreen/workshop_aging.png" alt="">
			<img class="img" v-show="active === 'aging'" src="@/assets/images/bigScreen/workshop_aging_selected.png"
				alt="">
		</div>
		<div :class="active === 'assemble' ? 'active-box' : ''" class="workshop-common workshop_assemble"
			@click="handleClick('assemble')">
			<img class="img" v-show="active !== 'assemble'" src="@/assets/images/bigScreen/workshop_assemble.png" alt="">
			<img class="img" v-show="active === 'assemble'" src="@/assets/images/bigScreen/workshop_assemble_selected.png"
				alt="">
		</div>
		<div :class="active === 'smt' ? 'active-box' : ''" class="workshop-common workshop_smt"
			@click="handleClick('smt')">
			<img class="img" v-show="active !== 'smt'" src="@/assets/images/bigScreen/workshop_smt.png" alt="">
			<img class="img" v-show="active === 'smt'" src="@/assets/images/bigScreen/workshop_smt_selected.png" alt="">
		</div>
		<div :class="active === 'check' ? 'active-box' : ''" class="workshop-common workshop_check"
			@click="handleClick('check')">
			<img class="img" v-show="active !== 'check'" src="@/assets/images/bigScreen/workshop_check.png" alt="">
			<img class="img" v-show="active === 'check'" src="@/assets/images/bigScreen/workshop_check_selected.png"
				alt="">
		</div>
		<div :class="active === 'auto' ? 'active-box' : ''" class="workshop-common workshop_auto"
			@click="handleClick('auto')">
			<img class="img" v-show="active !== 'auto'" src="@/assets/images/bigScreen/workshop_auto.png" alt="">
			<img class="img" v-show="active === 'auto'" src="@/assets/images/bigScreen/workshop_auto_selected.png" alt="">
		</div>
		<div :class="active === 'package' ? 'active-box' : ''" class="workshop-common workshop_package"
			@click="handleClick('package')">
			<img class="img" v-show="active !== 'package'" src="@/assets/images/bigScreen/workshop_package.png" alt="">
			<img class="img" v-show="active === 'package'" src="@/assets/images/bigScreen/workshop_package_selected.png"
				alt="">
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: 'aging',
		}
	},
	methods: {
		handleClick(type) {
			if (type === this.active) {
				this.active = "";
				return;
			}
			this.active = type;
			this.$emit('update', this.active);
		},
	},
}
</script>

<style lang="scss" scoped>
.workshop-container {
	width: 100%;
	height: 100%;
	position: relative;
	background-image: url("../../../assets/images/bigScreen/workshop_center.png");
	background-repeat: no-repeat;
	background-size: 60% 80%;
	background-position: center center;
	position: relative;

	.workshop-common {
		width: 145px;
		height: 140px;
		position: absolute;
		// background-color: rgba(255, 255, 255, 0.5);
		// background-repeat: no-repeat;
		// background-position: center center;
		// background-size: 80% 80%;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.workshop_assemble {
		// background-image: url("../../../assets/images/bigScreen/workshop_assemble.png");
		top: 0;
		right: 25%;
	}

	.workshop_aging {
		// background-image: url("../../../assets/images/bigScreen/workshop_aging.png");
		top: 0;
		left: 28%;
	}

	.workshop_smt {
		// background-image: url('../../../assets/images/bigScreen/workshop_smt.png');
		top: 31%;
		left: 15%;
	}

	.workshop_check {
		// background-image: url("../../../assets/images/bigScreen/workshop_check.png");
		top: 31%;
		right: 15%;
	}

	.workshop_auto {
		// background-image: url("../../../assets/images/bigScreen/workshop_auto.png");
		top: 65%;
		left: 25%;
	}

	.workshop_package {
		// background-image: url("../../../assets/images/bigScreen/workshop_package.png");
		top: 65%;
		right: 25%;
	}

}

.img {
	width: 90%;
	height: 85%;
}
</style>./WorkShop.vue