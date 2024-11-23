<template>
	<slot name="header" />
	<div class="grid-container">
		<slot />
	</div>
</template>

<style scoped lang="scss">
.grid-container {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
	padding: 55px 16px 16px 16px;
}
</style>
