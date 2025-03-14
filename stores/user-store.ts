import { defineStore, setActivePinia, createPinia } from 'pinia';
import type { LoginParams, RegisterParams, RequestError } from '@shared/api/types';
import { loginUser, requestMyUser, registerUser } from '@shared/api';
import type { UserStore } from './types';
import { isRequestError } from '@shared/api/typeGuards';

const pinia = createPinia();

export default { store: setActivePinia(pinia) };

export const useUserStore = defineStore('userData', {
	state: (): UserStore => ({
		user: null,
		isAuth: false,
	}),
	getters: {
		getUserRole: (state) => {
			if (state.user && state.user.role) {
				return state.user.role.type;
			}
		},
	},
	actions: {
		async login(loginParams: LoginParams) {
			if (Object.values(loginParams).some((value) => !value)) {
				return;
			}
			try {
				const response = await loginUser(loginParams);

				localStorage.setItem('AuthToken', response.data.jwt);
				localStorage.setItem('isAuth', 'true');
				this.isAuth = true;

				await this.getMyUser();
			} catch (e) {
				if (isRequestError(e)) {
					throw new Error(e.error.message);
				} else {
					throw new Error('No se pudo iniciar sesión');
				}
			}

		 },

		 loginWithJWT(jwt: string) {
			localStorage.setItem('AuthToken', jwt);
			localStorage.setItem('isAuth', 'true');
			this.isAuth = true;
			this.getMyUser();
		 },
		 async register(registrationParams: RegisterParams) {
			if (Object.values(registrationParams).some((value) => !value)) {
				return;
			}
			try {
				await registerUser(registrationParams);
			} catch (e) {
				if (isRequestError(e)) {
					throw new Error(e.error.message);
				} else {
					throw new Error('No se pudo registrar el usuario');
				}
			}

		 },
		 async getMyUser() {
			if (!localStorage.getItem('AuthToken') || !localStorage.getItem('isAuth')) {
				return;
			}
			try {
				this.isAuth = true;
				const { data } = await requestMyUser();
				this.user = data;
			} catch (e) {
				throw new Error('No has iniciado sesión');
			}
		 },

		 logout() {
			localStorage.removeItem('AuthToken');
			localStorage.removeItem('isAuth');
			this.isAuth = false;
			this.user = null;
		 },
	},
});
