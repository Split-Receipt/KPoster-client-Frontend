import { defineRule, configure } from 'vee-validate';
import { required } from '@vee-validate/rules';

export default defineNuxtPlugin((nuxtApp) => {
	const { t } = nuxtApp.$i18n;
	configure({
		generateMessage: () => {
			return t('this_field_is_required');
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
			return t('this_field_is_incorrect');
		}

		return true;
	});

	defineRule('confirmed', (value, [target]: [string], ctx) => {
		if (value === ctx.form[target]) {
			return true;
		}

		return t('passwords_do_not_match');
	});

defineRule('minLength', (value: string, [limit]: [number]) => {
  // The field is empty so it should pass
  if (!value || !value.length) {
    return true;
  }
  if (value.length < limit) {
    return t('this_field_must_be_at_least', { count: limit });
  }

  return true;
});
	defineRule('required_file', (value: FileList | null) => {
		if (!value || value.length === 0) {
			return t('file_is_required');
		}

		return true;
	});

	defineRule('require_number', (value: number | null) => {
		if (!value || value < 1) {
			return t('require_to_type_number');
		}

		return true;
	});

	defineRule('require_checkbox', (value: string[] | number[]) => {
		if (value?.length < 1) {
			return t('choose_at_least_one_point');
		}

		return true;
	});

	defineRule('require_coordinates', (value: number[]) => {
		if (value[0] === -12.046016 && value[1] === -77.030554) {
			return t('require_location_on_map');
		}

		return true;
	});
});
