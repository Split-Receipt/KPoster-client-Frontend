import type { LoginParams } from '@shared/api/types';
import { loginUser, requestMyUser } from '@shared/api';
 const login = async (loginParams: LoginParams) => {
	if (Object.values(loginParams).some((value) => !value)) {
		return;
	}
	try {
		const response = await loginUser(loginParams);
		localStorage.setItem('AuthToken', response.data.jwt);

		const myUser = await requestMyUser();
		localStorage.setItem('myUser', JSON.stringify(myUser.data));
		window.dispatchEvent(new CustomEvent('login', { detail: myUser.data }));
	} catch (e) {
		console.error(e);
	}

 };

export default login;
