<template>
	<cp-base-page>
		<template #content>
			<div class="email-confirmation__content">
				<p class="email-confirmation__text">{{ $t('email_confirmed') }}</p>
			</div>
		</template>
	</cp-base-page>
</template>

<style scoped lang="scss">
.email-confirmation {
	&__content {
		height: 20vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	&__text {
		text-align: center;
	}
}
</style>
