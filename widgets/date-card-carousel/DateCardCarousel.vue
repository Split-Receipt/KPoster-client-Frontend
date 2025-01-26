<template>
	<div class="date-card-carousel__wrapper">
		<div v-if="dateLoaded" class="date-card-carousel">
			<cp-button
				shape="circle"
				size="small"
				left-icon="arrow-left"
				class="date-card-button-prev date-card-carousel__button"
			/>

			<swiper
				:modules="[SwiperNavigation, SwiperMousewheel]"
				:mousewheel="true"
				slides-per-view="auto"
				space-between="15"
				:navigation="{
					enabled: true,
					nextEl: '.date-card-button-next',
					prevEl: '.date-card-button-prev',
				}"
				:breakpoints="{
					0: {
						slidesPerGroup: 3,
					},
					768: {
						slidesPerGroup: 5,
					},
					1280: {
						slidesPerGroup: 7,
					},
				}"
			>
				<swiper-slide
					v-for="(card, index) in allDaysOfInterval"
					:key="index"
					class="date-card-carousel__item"
				>
					<div v-if="card.day == '1'" class="date-card-carousel__month">
						{{ card.mounth.toUpperCase() }}
					</div>
					<div>
						<date-card
							class="date-card-carousel__day"
							:date="card"
							:disabled="card.disabled"
							:active="!!(index === activeItem)"
							@date-click="$emit('change:filterDate', card.dateString)"
							@click="activeItem = index"
						/>
					</div>
				</swiper-slide>
			</swiper>

			<cp-button
				shape="circle"
				size="small"
				left-icon="arrow-right"
				class="date-card-button-next date-card-carousel__button"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import { ref, onMounted } from 'vue';
import {
	eachDayOfInterval,
	format,
	setDefaultOptions,
	startOfDay,
	addDays,
	addMonths,
	isEqual,
} from 'date-fns';
import { enGB, es } from 'date-fns/locale';

const props = withDefaults(defineProps<Props>(), {
	dateStart: () => addDays(new Date(), -3),
	dateEnd: () => addMonths(new Date(), 3),
	preSelectedDate: () => startOfDay(new Date()),
});

const emit = defineEmits<Events>();

const { locale } = useI18n();

type Props = {
	dateStart?: Date;
	dateEnd?: Date;
	preSelectedDate?: Date;
};

type AllDaysOfInterval = {
	dateString: Date;
	day: string;
	weekDay: string;
	mounth: string;
	disabled: boolean;
};

type Events = {
	(event: 'change:filterDate', eventData: Date): void;
};

const activeItem: Ref<number> = ref(3);

const dateLoaded = ref(false);
const allDaysOfInterval: Ref<Array<AllDaysOfInterval>> = ref([]);
const dateNow = new Date();

setDefaultOptions({ locale: locale.value === 'en' ? enGB : es }); // #TODO - вынести date fns в отдельный модуль

const createAllDaysOfInterval = () => {
	eachDayOfInterval({
		start: props.dateStart,
		end: props.dateEnd,
	}).forEach((date) => {
		return allDaysOfInterval.value.push({
			dateString: date,
			day: format(date, 'd'),
			weekDay: format(date, 'EEEEEE').toLowerCase(),
			mounth: format(date, 'MMMM'),
			disabled:
				startOfDay(date).getTime() < startOfDay(dateNow).getTime()
					? true
					: false,
		});
	});

	dateLoaded.value = true;
};

const selectDateFromDefault = () => {
	if (props.preSelectedDate) {
		activeItem.value = allDaysOfInterval.value.findIndex(
			(item: AllDaysOfInterval) =>
				isEqual(props.preSelectedDate, item.dateString)
		);
		emit('change:filterDate', props.preSelectedDate);
	}
};

onMounted(async () => {
	createAllDaysOfInterval();
	selectDateFromDefault();
});
</script>

<style scoped lang="scss">
.date-card-carousel {
	position: relative;
	display: flex;
	align-items: center;
	gap: 15px;
	width: 100%;
	height: 100%;

	&__wrapper {
		height: 120px;
		@media #{$screen-desktop} {
			height: 130px;
		}
	}

	&__button {
		position: static;
		display: none;
		width: auto;
		margin: 0;
		border: none;
		background: none;

		@media #{$screen-desktop} {
			display: block;
			margin: $date-card-carousel-button-margin;
		}
	}

	&__item {
		position: relative;
		display: flex;
		align-items: flex-end;
		padding-bottom: 15px;
		@media #{$screen-desktop} {
			align-items: flex-start;
			padding-bottom: 0;
		}
	}

	&__month {
		position: absolute;
		top: 0;
		font-size: 14px;
		line-height: normal;
		border-bottom: 1px solid $date-card-carousel-month-border-color;
		color: $date-card-carousel-month-color;

		@media #{$screen-desktop} {
			font-size: $date-card-carousel-month-font-size;
			line-height: $date-card-carousel-month-line-height;
		}
	}
}

.swiper {
	height: 100%;
	overflow: hidden;
	margin-left: 0;
}

.date-card-button-next {
	&::after {
		content: '';
	}

	.swiper-rtl .date-card-button-next {
		right: $date-card-carousel-button-next-right;
	}
}

.date-card-button-prev {
	&::after {
		content: '';
	}

	.swiper-rtl .date-card-button-prev {
		left: $date-card-carousel-button-prev-left;
	}
}

.swiper-slide {
	width: auto;

	@media #{$screen-tablet} {
		padding: $date-card-carousel-swiper-slide-padding-tablet;
	}
}
</style>
