import type { RegisterParams } from '@shared/api/types';
import { registerUser, requestMyUser } from '@shared/api';
 const register = async (registrationParams: RegisterParams) => {
	if (Object.values(registrationParams).some((value) => !value)) {
		return;
	}
	try {
		const response = await registerUser(registrationParams);
		localStorage.setItem('AuthToken', response.data.jwt);

		const myUser = await requestMyUser();
		localStorage.setItem('myUser', JSON.stringify(myUser.data));
		window.dispatchEvent(new CustomEvent('login', { detail: myUser.data }));

		return response.data.user.id;
	} catch (e) {
		console.error(e);
	}

 };

export default register;
