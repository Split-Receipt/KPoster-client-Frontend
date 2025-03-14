<template>
	<div class="textInput">
		<label
			v-if="props.labelText"
			:for="props.id"
			:class="{ 'required-field': props.isRequired }"
		>
			{{ props.labelText }}
		</label>
		<input
			v-if="props.type === 'text' || props.type === 'email'"
			:id="props.id"
			type="text"
			:class="{ textInput_rounded: rounded }"
			:placeholder="props.placeholder"
			:value="modelValue"
			@input="handleInputValueUpdate"
		/>
		<div v-if="props.type === 'password'" class="textInput-password">
			<input
				:id="props.id"
				ref="passInput"
				v-model="passValue"
				:class="{ textInput_rounded: rounded }"
				class="textInput-password-invisible"
				type="password"
				:placeholder="props.placeholder"
				@input="handleInputValueUpdate"
			/>
			<nuxt-img
				v-if="withEye"
				class="textInput-password-open"
				:src="`../public/images/eye${!passIsVisible ? '-closed' : ''}.svg`"
				@click="passVisibilityToggle"
			/>
		</div>
		<label
			v-if="props.type === 'date' && props.labelText"
			:for="props.id"
			:class="{ 'required-field': props.isRequired }"
		>
			{{ props.labelText }}
		</label>
		<input
			v-if="props.type === 'date'"
			:id="props.id"
			type="date"
			:class="{ textInput_rounded: rounded }"
			:value="modelValue"
			placeholder="ingrese la fecha"
			@focus="dateInputFocus"
			@input="handleInputValueUpdate"
		/>
		<input
			v-if="props.type === 'number'"
			:id="props.id"
			type="number"
			:class="{ textInput_rounded: rounded }"
			min="0"
			:value="modelValue"
			:placeholder="props.placeholder"
			@input="handleInputValueUpdate"
			@keypress="numberInputValidate"
		/>
	</div>
</template>

<script setup lang="ts">
type textInputProps = {
	modelValue: string | number | Date | null;
	type: string;
	placeholder: string;
	id?: string;
	withEye?: boolean;
	labelText?: string;
	isRequired?: boolean;
	rounded?: boolean;
};

type Events = {
	(event: 'update:modelValue', eventData: string | number): void;
};

const props = defineProps<textInputProps>();

const emit = defineEmits<Events>();

onBeforeMount(() => {
	handleNullInModelValue();
});

const handleNullInModelValue = () => {
	if (props.modelValue === null) {
		emit('update:modelValue', '');
	}
};

const passValue = ref<string>();
const passInput = ref<HTMLInputElement | null>(null);
const passIsVisible = ref<boolean>(false);

const dateInputFocus = (e: Event) => {
	const target = e.target as HTMLInputElement;
	target.type = 'date';
};

// const  dateInputBlur = (e: Event) => {
// 	const target = e.target as HTMLInputElement;
// 	target.type = 'text';
// };

const handleInputValueUpdate = (e: Event) => {
	const target = e.target as HTMLInputElement;
	if (props.type === 'number') {
		emit('update:modelValue', Number(target.value));
	} else {
		emit('update:modelValue', target.value);
	}
};

const passVisibilityToggle = () => {
	const passArea = passInput.value as HTMLInputElement;
	passIsVisible.value = !passIsVisible.value;
	if (passIsVisible.value) {
		passArea.type = 'text';
	} else {
		passArea.type = 'password';
	}
};

const numberInputValidate = (event: any) => {
	if (!/[0-9]/.test(event.key)) {
		event.preventDefault();
	}
};
</script>

<style scoped lang="scss">
.textInput {
	width: 100%;

	&_rounded {
		border-radius: 50px;
	}

	label {
		font-size: 22px;
		line-height: 33.6px;
		color: #353333;
		display: flex;
		align-items: center;
		margin-bottom: 5px;

		strong {
			color: red;
			font-size: 32px;
			margin-left: -15px;
			margin-right: 5px;
		}
	}

	input {
		width: 100%;
		padding: 15px 10px;
		border: none;
		background-color: $white;
		border: 1px solid $gray;
		color: $gray;

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
			width: 25px;
			top: 17px;
			right: 10px;
		}

		&-closed {
			position: absolute;
			cursor: pointer;
			width: 25px;
			top: 18px;
			right: 10px;
		}
	}
}
</style>
