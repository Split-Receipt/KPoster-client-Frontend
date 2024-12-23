<template>
	<div class="section">
		<div v-if="props.header" class="section__header-wrap">
			<slot name="header">
				<h3 class="section__header">
					{{  $t(props.header) }}
				</h3>
				<slot name="controls" />
			</slot>
		</div>

		<div class="section__content">
			<slot name="section-content" />
		</div>
	</div>
</template>

<script setup lang="ts">
type Props = {
	header?: string;
};

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.section {
    margin-bottom: 30px;
	@media #{$screen-tablet} {
		margin-bottom: 50px;
	}

    &__header-wrap {
		display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
	}

    &__header-wrap {
		margin-bottom: 10px;
		@media #{$screen-tablet} {
			margin-bottom: 20px;
		}
	}
}
</style>