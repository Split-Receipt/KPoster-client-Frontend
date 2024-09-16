export default defineNuxtPlugin((_) => {
	return {
			provide: {
					objToFormData: (formObject: any) => {
							const formData = new FormData();

							if (formObject.data) {
									formData.append('data', JSON.stringify(formObject.data));
							}

							const appendFilesToFormData = (files: any, parentKey: string = 'files') => {
									if (files instanceof File || files instanceof Blob) {
											formData.append(parentKey, files);
									} else if (Array.isArray(files)) {
											files.forEach((file) => {
													if (file instanceof File || file instanceof Blob) {
															formData.append(parentKey, file);
													} else if (file !== null && typeof file === 'object') {
															appendFilesToFormData(file, parentKey);
													}
											});
									} else if (files !== null && typeof files === 'object') {
											Object.keys(files).forEach((key) => {
													const file = files[key];
													const formKey = parentKey ? `${parentKey}.${key}` : key;
													appendFilesToFormData(file, formKey);
											});
									}
							};

							if (formObject.files) {
									appendFilesToFormData(formObject.files);
							}

							return formData;
					},
			},
	};
});
