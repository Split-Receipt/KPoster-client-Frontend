export default defineNuxtPlugin((_) => {
	return {
		provide: {
			objToFormData: (obj: any) => {
				const result = new FormData();
				for (const key in obj) {
					if (obj.hasOwnProperty(key)) {
						result.append(key, obj[key]);
					}
				}

				return result;
			},
		},
	};
});
