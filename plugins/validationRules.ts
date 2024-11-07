import { defineRule, configure } from 'vee-validate';
import { required } from '@vee-validate/rules';

export default defineNuxtPlugin(() => {
	configure({
		generateMessage: () => {
			return 'This field is required';
		},
	});

	defineRule('required', required);

	defineRule('email', (value: string) => {
		if (!value || !value.length) {
			return true;
		}
		if (
			!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				value
			)
		) {
			return 'This field must be a valid';
		}

		return true;
	});

	defineRule('required_file', (value: FileList | null) => {
		if (!value || value.length === 0) {
			return 'A file is required';
		}

		return true;
	});

	defineRule('require_number', (value: number | null) => {
		if (!value || value < 1) {
			return 'require to type number';
		}

		return true;
	});

	defineRule('require_checkbox', (value: string[]) => {
		if (value.length < 1) {
			return 'require to choose at least one point';
		}

		return true;
	});

	defineRule('require_coordinates', (value: number[]) => {
		if (value[0] === -12.046016 && value[1] === -77.030554) {
			return 'require to choose location at map';
		}

		return true;
	});
});
