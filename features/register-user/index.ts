import type { RegisterParams } from '@shared/api/types';
import { registerUser } from '@shared/api';
 const register = async (registrationParams: RegisterParams) => {
	if (Object.values(registrationParams).some((value) => !value)) {
		return;
	}
	try {
		const response = await registerUser(registrationParams);
		localStorage.setItem('AuthToken', response.jwt);

		return response.user.id;
	} catch (e) {
		console.error(e);
	}

 };

export default register;
