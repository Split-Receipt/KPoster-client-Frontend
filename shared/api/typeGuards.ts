import type { RequestError } from './types';
export function isRequestError(error: any): error is RequestError {
	return Boolean(error.error);
}
