<template>
	<div class="textInput">
		<input
			v-if="props.type !== 'password'"
			:id="props.id"
			:type="props.type"
			:placeholder="props.placeholder"
			@input="handleTextValueUpdate"
		/>
		<div v-if="props.type === 'password'" class="textInput-password">
			<input
				v-show="!passIsVisible"
				:id="props.id"
				v-model="passValue"
				class="textInput-password-invisible"
				type="password"
				:placeholder="props.placeholder"
				@input="handleTextValueUpdate"
			/>
			<input
				v-show="passIsVisible"
				:id="props.id"
				v-model="passValue"
				class="textInput-password-visible"
				type="text"
				:placeholder="props.placeholder"
				@input="handleTextValueUpdate"
			/>
			<nuxt-img
				v-show="passIsVisible"
				class="textInput-password-open"
				src="../public/images/eye.svg"
				@click="passVisibilityToggle"/>
			<nuxt-img
				v-show="!passIsVisible"
				class="textInput-password-closed"
				src="../public/images/eye-closed.svg"
				@click="passVisibilityToggle"/>
		</div>
	</div>
</template>

<script setup lang="ts">
type textInputProps = {
	type: string;
	placeholder: string;
	id?: string;
};

type Events = {
	(event: 'update:modelValue', eventData: string): void;
};

const props = defineProps<textInputProps>();
const emit = defineEmits<Events>();
const passValue = ref<string>();
const passIsVisible = ref<boolean>(false);

const handleTextValueUpdate = (e: Event) => {
	const target = e.target as HTMLInputElement;
	emit('update:modelValue', target.value);
};

const passVisibilityToggle = () => {
	passIsVisible.value = !passIsVisible.value;
};
</script>

<style scoped lang="scss">
.textInput {
	width: 100%;
	input {
		width: 100%;
		padding: 15px 15px 10px 15px;
		border: none;
		background-color: #f6f6f6;
		border-radius: 12px;
		color: #353333;

		&:focus {
			outline: none;
		}
	}

	&-password {
		position: relative;

		&-invisible {
			padding-right: 40px !important;
		}

		&-visible {
			padding-right: 40px !important;
		}

		&-open {
			position: absolute;
			cursor: pointer;
			width: 30px;
			top: 13px;
			right: 5px;
		}

		&-closed {
			position: absolute;
			cursor: pointer;
			width: 30px;
			top: 13px;
			right: 5px;
		}
	}
}
</style>
