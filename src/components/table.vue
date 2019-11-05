<template>
	<div class="tableBox">
		<el-table
		    :data="tableData"
		    border
		    style="width: 100%">
		    <el-table-column
		      v-for="(item, i) in tableKeys"
		      :prop="item.prop"
		      :label="item.label"
		      :width="item.width"
		      :key="i">
		    </el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	props: {
		tableData: {
			type: Array,
			default() {
				return []
			}
		},
		tableKeys: {
			type: Array,
			default() {
				return []
			}
		}
	},
	data() {
		return {}
	}
}
</script>

<style lang="scss" scoped>
.tableBox{

}
</style>