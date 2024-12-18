<template>
	<div class="grid">
		<slot name="header"/>
		<div class="grid__container">
			<slot />
		</div>
	</div>
</template>

<style scoped lang="scss">
.grid {
	padding: 20px 16px 40px 16px;

	&__container {
		display: grid;
		gap: 16px;
		grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
	}
}
</style>
