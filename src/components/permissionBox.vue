<template>
	<div class="permissionBox" v-if="is">
		<slot>{{text}}</slot>
	</div>
</template>

<script>
import util from "@/util";

export default {
	props: {
		text: String,
		permission: String
	},
	data() {
		return {
			is: false
		}
	},
	watch() {
		permission: {
			handler: function(val) {
				this.is = is = this.util.permissionCalculate(this.permission);
			},
			immediate: true
		}
	}
}
</script>

<style scoped>
.permissionBox{
	display: inline;
}
</style>