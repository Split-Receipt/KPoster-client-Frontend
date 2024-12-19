<template>
	<div class="help-request">
		<div class="help-request__header">
			<h3 class="help-request__title">{{ $t('help_request_title') }}</h3>
		</div>
		<div class="help-request__content">
			<p>{{ $t('help_request_description') }}</p>
			<div class="help-request__contacts">
				<p class="help-request__contact">
					<nuxt-link
						:to="`mailto:${commonDataStore.platformData?.attributes.platformContacts.mail}`"
					>
						{{ commonDataStore.platformData?.attributes.platformContacts.mail }}
					</nuxt-link>
				</p>
				<p class="help-request__contact">
					<nuxt-link
						:to="`tel:${commonDataStore.platformData?.attributes.platformContacts.tel}`"
					>
						{{ commonDataStore.platformData?.attributes.platformContacts.tel }}
					</nuxt-link>
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useCommonDataStore } from '@stores/common-data-store';
const commonDataStore = useCommonDataStore();
</script>

<style scoped lang="scss">
.help-request {
	border: 1px solid $mercury;
	border-radius: 30px;
	padding: 20px;
	&__contacts {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	&__contact {
		color: #333333;
	}
	&__title {
		margin-bottom: 20px;
		font-size: 30px;
		width: fit-content;
		line-height: initial;
		background: #ff3938;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		color: transparent;
	}
	&__content {
		display: flex;
		flex-direction: column;
		gap: 20px;
		color: #888888;
		font-size: 20px;
	}
}
</style>
