<template>
	<div class="workshop-container">
		<div :class="active === 'aging' ? 'active-box' : ''" class="workshop-common workshop_aging" @click="handleClick('aging')">
		</div>
		<div :class="active === 'assemble' ? 'active-box' : ''" class="workshop-common workshop_assemble"
			@click="handleClick('assemble')"></div>
		<div :class="active === 'smt' ? 'active-box' : ''" class="workshop-common workshop_smt" @click="handleClick('smt')"></div>
		<div :class="active === 'check' ? 'active-box' : ''" class="workshop-common workshop_check" @click="handleClick('check')">
		</div>
		<div :class="active === 'auto' ? 'active-box' : ''" class="workshop-common workshop_auto" @click="handleClick('auto')">
		</div>
		<div :class="active === 'package' ? 'active-box' : ''" class="workshop-common workshop_package"
			@click="handleClick('package')"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: '',
		}
	},
	methods: {
		handleClick(type) {
			console.log(type);
			if (type === this.active) {
				this.active = "";
				return;
			}
			this.active = type;
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
	background-size: 60%;
	background-position: center center;
	position: relative;

	.workshop-common {
		width: 175px;
		height: 145px;
		background-repeat: no-repeat;
		position: absolute;
		cursor: pointer;
	}

	.workshop_assemble {
		background-image: url("../../../assets/images/bigScreen/workshop_assemble.png");
		top: 0px;
		right: 22%;
	}

	.workshop_aging {
		background-image: url("../../../assets/images/bigScreen/workshop_aging.png");
		top: 0px;
		left: 22%;
	}

	.workshop_smt {
		background-image: url(/static/img/workshop_smt.3ba9ad5a.png);
		top: 31%;
		left: 10%;
	}

	.workshop_check {
		background-image: url("../../../assets/images/bigScreen/workshop_check.png");
		top: 30%;
		right: 5%;
	}

	.workshop_auto {
		background-image: url("../../../assets/images/bigScreen/workshop_auto.png");
		top: 66%;
		left: 20%;
	}

	.workshop_package {
		background-image: url("../../../assets/images/bigScreen/workshop_package.png");
		top: 65%;
		right: 20%;
	}
}
</style>