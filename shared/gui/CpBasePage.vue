<template>
	<div class="base-page">
		<div v-if="props.header" class="base-page__header-wrap">
			<slot name="header">
				<h1 class="base-page__header">
					{{  $t(props.header) }}
				</h1>
			</slot>
		</div>

		<div class="base-page__content">
			<slot name="content" />
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
.base-page {
    &__header-wrap {
        text-align: center;
    }

    &__header {
        padding: 25px 0;
    }

    &__content {
        padding: 20px 10px 50px;
    }

    @media #{$screen-tablet} {
        &__header {
            padding: 30px 0;
        }
	}

	@media #{$screen-desktop} {
        &__header {
            padding: 40px;
        }

        &__content {
            padding: 30px 20px 70px;
        }
	}
}
</style>