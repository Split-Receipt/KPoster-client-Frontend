<template>
	<div class="hugeLink">
		<span class="hugeLink__title">
			{{ props.hugeTitle }} 
		</span>
		<a :href="props.hugeLink" class="hugeLink__circle"/>
	</div>
</template>

<script setup lang="ts">
type HugeLinkProps = {
    hugeTitle: string;
    hugeLink: string;
};
const props = defineProps<HugeLinkProps>();
</script>

<style scoped lang="scss">
    .hugeLink {
        display: flex;
        width: 455px;
        height: 156px;  
        border-radius: 20px;
        background: $button-gradient-background-color;
        position: relative;

        &__title {
            width: 80%;
            height: 100%;
            font-size: 30px;
            line-height: 42px;
            color: #353333;
            padding: 34px 24px 24px 24px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }

        &__circle {
            background: #ffffff;
            height: 50px;
            width: 50px;
            border-radius: 50%;
            position: absolute;
            right: 24px;
            bottom: 24px;
            cursor: pointer;
            background-image: url('../../public/images/arrowRight.svg');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            transition: all 0.3s ease;

            &:hover {
                transition: all 0.3s ease;
                transform: scale(1.05);
            }
        }
    }
</style>