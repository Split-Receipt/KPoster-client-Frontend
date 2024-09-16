export default defineNuxtPlugin((_) => {
	return {
		provide: {
			objToFormData: (formObject: any) => {
				const formData = new FormData();
				if (formObject.data) {
					formData.append('data', JSON.stringify(formObject.data));
				}

				const appendFilesToFormData = (
					files: any,
					parentKey: string = 'files'
				) => {
					Object.keys(files).forEach((key) => {
						const file = files[key];
						const formKey = parentKey ? `${parentKey}.${key}` : key;

						if (file instanceof File || file instanceof Blob) {
							formData.append(formKey, file);
						} else if (file !== null && typeof file === 'object') {
							appendFilesToFormData(file, formKey);
						}
					});
				};

				if (formObject.files) {
					appendFilesToFormData(formObject.files);
				}

				return formData;
			},
		},
	};
});
