<template>
	<div class="link">
		<h5 class="link__title">
			{{ props.title }} 
		</h5>
		<a :href="props.link" class="link__circle" target="_blank"/>
	</div>
</template>

<script setup lang="ts">
type Props = {
    title: string;
    link: string;
};
const props = defineProps<Props>();
</script>

<style scoped lang="scss">
    .link {
        display: flex;
        width: 300px;
        height: 130px;  
        border-radius: 20px;
        background: $button-gradient-background-color;
        padding: 15px;
        display: grid;
        grid-template-columns: auto 35px;

        &__title {
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }

        &__circle {
            background: $white;
            height: 35px;
            width: 35px;
            border-radius: 50%;
            cursor: pointer;
            background-image: url('../../public/images/arrowRight.svg');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            transition: all 0.3s ease;
            align-self: flex-end;

            &:hover {
                transition: all 0.3s ease;
                transform: scale(1.05);
            }
        }

        @media screen and (min-width: 600px) {
            padding: 24px;
			width: 455px;
            height: 156px; 
            grid-template-columns: auto 50px;

            &__circle {
                height: 50px;
                width: 50px;
            }
		}
    }
</style>