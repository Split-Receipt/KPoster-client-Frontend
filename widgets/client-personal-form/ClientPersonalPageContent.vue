<template>
	<div class="client-personal-page">
		<h1 class="client-personal-page__title">
			{{ $t('client_personal_page') }}
		</h1>
		<div class="client-personal-page__content">
			<p class="client-personal-page__description">
				{{ $t('client_personal_page_description') }}
			</p>
			<to-main />
		</div>
	</div>
</template>

<script setup lang="ts">
import ToMain from '@features/to-main/ToMain.vue';
</script>

<style scoped lang="scss">
.client-personal-page {
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 20px;
	&__title {
		font-size: 30px;
	}
	&__content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		@media #{$screen-tablet} {
			align-items: flex-start;
		}
	}

	&__description {
		text-align: center;
		@media #{$screen-tablet} {
			max-width: 70%;
			text-align: left;
		}
	}
}
</style>
