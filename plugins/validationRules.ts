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
});
