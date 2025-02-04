import { sub } from "date-fns";

export default defineI18nConfig(() => ({
	legacy: false,
	locale: 'en',
	messages: {
		en: {
			no_event: 'No events',
			events_today: 'Events today',
			how_to_become_event_host: 'How to become an event host?',
			learn_more: 'Learn more',
			event_host_registration_redirect: 'You are about to be redirected to the event organizer registration page.',
			event_host_registration_redirect_content: 'Registering as an event organizer will allow you to publish information about the events you hold. This status is not given immediately, after registration you will need to wait until our administration checks the information you provided',
			event_host_gallery: 'Event Host Gallery',
			yes: 'Yes',
			no: 'No',
			registration_successful: 'Registration Succesfull',
			partner_after_registration_modal_content: 'Our administrators will contact you shortly to confirm the information you provided via email. After the confirmation process, you will receive the status of an event organizer and will be able to create events on the cultural portal',
			check_your_email: 'Check your email for further instructions',
			require_location_on_map: 'require to choose location at map',
			this_field_is_required: 'This field is required',
			choose_at_least_one_point: 'require to choose at least one point',
			require_to_type_number: 'require to type number',
			file_is_required: 'File is required',
			this_fiels_required: 'This field is required',
			this_field_must_be_at_least: 'This field must be at least {count} characters',
			this_field_is_incorrect:'This field is incorrect',
			passwords_do_not_match: 'The passwords do not match',
			new_password: 'New password',
			reset_password: 'Reset your password',
			email_confirmed: 'Your email has been confirmed! Now you can login using authorization form with email and password you provided',
			help_request_title: 'Does the form seem complicated?',
			help_request_description: 'Contact us in any convenient way and we will help you',
			to_main_page: 'Home',
			client_personal_page: 'Client personal page',
			client_personal_page_description: 'Your status in the system is now Client. If you have previously applied for registration as a partner, please wait until the verification process is complete. After you receive the status of an event organizer, your personal account will be displayed on this page. If you have not applied, this section is currently under development, but this will not prevent you from choosing an event to your liking, so we recommend that you return to the main page',
			footer_title_our_socials: 'Our social media',
			sign_out: 'Sign out',
			more_info: 'More info',
			footer_title_addition_info: 'Additional information',
			// home page features
			welcome: 'Welcome',
			about_us_title: 'About us',
			contacts_title: 'Contacts',
			main_title: 'Cultural events of Cusco',
			name_of_platform: 'Cultural Portal of Cusco',
			sales: 'Sales',
			news: 'News',
			create_event: 'Create event',
			charity: 'Charity',
			city_filter_placeholder: 'City',
			event_host_filter_placeholder: 'Event host',
			culture_area_filter_placeholder: 'Culture area',
			event_category_filter_placeholder: 'Category',
			// drag n drop component features
			clear: 'Clear',
			drag_n_drop: 'Drag and drop some files here or click to select files',
			file_drop: 'Drop the files here...',
			size_exceeded: 'Maximum file size exceeded',
			file_dropTypeError: 'File type is not as expected',
			file_extenisionError: 'Valid file extensions',
			file_quantityError: '1 file expected',
			dnd_imageUpload: 'Upload image',
			dnd_videoUpload: 'Upload video',
			dnd_audioUpload: 'Upload audio file',
			dnd_applicationUpload: 'Upload document',
			dnd_resolution_min: 'Resolution at least',
			dnd_resolution_max: 'Max resolution',
			dnd_upTo: 'up to',
			// partners page features
			partners_title: `Supplier Content Management System`,
			partners_subtitle: 'Here you can edit the company card information',
			partners_formTitle: 'Change information',
			partners_oranization_type: 'Type of organization',
			partners_trade_name: 'Trade name',
			partners_company_name: 'Company name',
			partners_RUC: 'R.U.C.',
			partners_oranization_locate: 'Where is your organization located?',
			partners_oranization_explaining: 'Upload the video explaining your service and product or embed the link from Youtube or Vimeo',
			partners_main_banner: 'Upload main banner',
			partners_compony_explaining: 'Upload your company video or embed a link from YouTube or Vimeo',
			partners_compony_popular_product: 'Download the most popular product',
			partners_social_networks: 'Social networks',
			partners_digital_catalog: 'Digital catalog',
			partners_main_products_descriptions: 'Upload your main products and their descriptions',
			partners_photos_gallery: 'Add photos to gallery',
			partners_company_contact_information: 'Add company contact information',
			partners_first_category_goods: 'First category of goods',
			partners_enter_text: 'enter the text',
			partners_second_category_goods: 'Second category of goods',
			partners_create_button_catalog: 'Create your own digital catalog',
			partners_button_more_information: 'More information',
			partners_button_add_more_categories: 'Add more categories',
			partners_country_city: 'Country and city',
			partners_company_phone: 'Company phone',
			partners_placeholder_enter_link: 'enter the link',
			partners_choose_compony: 'Company',
			partners_choose_NGO: 'NGO',
			// gray info circles
			partners_upload_video_info: 'If you upload your own video, it must be in .mp4 format and must not exceed 50 megabytes in size',
			partners_banner_uploaded_info: 'Banner must be uploaded at 1100 by 278 pixels in .png format',
			partners_upload_photos_info: 'Upload a maximum of 6 photos that do not exceed 2MB',
			partners_add_active_number_info: 'Add active number for communication and with international format. ex: 51 933625150',
			//footer
			partners_our_contacts: 'Contacts',
			partners_our_social_networks: 'Our social networks',
			partners_button_become_partner: 'Become a partner',
			facebook: 'Facebook',
			instagram: 'Instagram',
			linkedIn: 'LinkedIn',
			tikTok: 'TikTok',
			submit: 'Submit',
			upload_file: 'Upload file',
			paste_link: 'Paste link',
			type_text: 'Type text',
		},
		es: {
			no_event: 'Sin Eventos',
			events_today: 'Eventos hoy',
			how_to_become_event_host: '¿Cómo convertirse en un organizador de eventos?',
			learn_more: 'Leer más',
			event_host_registration_redirect: 'Estás a punto de ir a la página de registro del organizador del evento.',
			event_host_registration_redirect_content: 'Registrarse como organizador de eventos le permitirá publicar información sobre los eventos que organiza. Este estado no se otorga inmediatamente después del registro; deberá esperar a que nuestra administración verifique la información que proporcionó.',
			event_host_gallery: 'Galería del Organizador',
			yes: 'Si',
			no: 'No',
			registration_successful: 'Registro exitoso',
			partner_after_registration_modal_content: 'Nuestros administradores pronto se comunicarán con usted para confirmar la información que proporcionó por correo electrónico. Después del proceso de confirmación, recibirás el estatus de organizador de eventos y podrás crear eventos en el portal cultural.',
			check_your_email: 'Revisa tu correo electrónico para más instrucciones',
			require_location_on_map: 'Es necesario elegir la ubicación en el mapa',
			choose_at_least_one_point: 'Requiere elegir al menos un punto',
			require_to_type_number: 'requiere escribir el número',
			file_required: 'Se requiere un archivo',
			this_field_is_required: 'Este campo es requerido',
			this_field_must_be_at_least: 'Este campo debe tener al menos {count} caracteres',
			this_field_is_incorrect: 'Este campo es incorrecto',
			passwords_do_not_match: 'Las contraseñas no coinciden',
			new_password: 'Nueva contraseña',
			reset_password: 'Restablece tu contraseña',
			email_confirmed: 'Tu email ha sido confirmado, puedes volver a la página principal',
			help_request_description: 'Contáctanos de forma cómoda y te ayudaremos',
			help_request_title: '¿El formulario parece complicado?',
			to_main_page: 'Inicio',
			client_personal_page_description: 'Ahora su estado en el sistema es Cliente. Si anteriormente envió una solicitud para registrarlo como socio, espere hasta que se complete el proceso de verificación. Después de recibir el estado de organizador de eventos, su cuenta personal se mostrará en esta página. Si no has enviado una solicitud, entonces esta sección se encuentra actualmente en desarrollo, pero esto no te impedirá elegir un evento de tu agrado, por lo que te recomendamos regresar a la página principal.',
			client_personal_page: 'Página personal del cliente',
			footer_title_our_socials: 'Nuestras redes sociales',
			sign_out: 'Finalizar la sesión',
			footer_title_addition_info: 'Información adicional',
			contacts_title: 'Contactos',
			more_info: 'Leer más',
			// home page features
			welcome: 'Bienvenido',
			about_us_title: 'Sobre nosotros',
			name_of_platform: 'Portal Cultural Cusco',
			main_title: 'Eventos culturales de Cusco',
			sales: 'Ventas',
			create_event: 'Crear evento',
			news: 'Noticias',
			charity: 'Donación',
			city_filter_placeholder: 'Ciudad',
			event_host_filter_placeholder: 'Organizador',
			culture_area_filter_placeholder: 'área cultural',
			event_category_filter_placeholder: 'Categoría',
			// drag n drop component features
			clear: 'Eliminar',
			file_is_required: 'El archivo es obligatorio',
			drag_n_drop:
				'Arrastre y suelte algunos archivos aquí o haga clic para seleccionar archivos',
			file_drop: 'Suelta los archivos aquí...',
			size_exceeded: 'Se superó el tamaño máximo de archivo',
			file_dropTypeError: 'El tipo de archivo no es el esperado',
			file_extenisionError: 'Extensiones de archivo válidas',
			file_quantityError: 'Se espera 1 archivo',
			dnd_imageUpload: 'Subir imagen',
			dnd_videoUpload: 'Subir vídeo',
			dnd_audioUpload: 'Subir archivo de audio',
			dnd_applicationUpload: 'Sube el documento',
			dnd_resolution_min: 'Resolución al menos',
			dnd_resolution_max: 'Resolución máxima',
			dnd_upTo: 'hasta',
			// partners page features
			partners_title: 'Sistema de gestión de contenidos del proveedor',
			partners_subtitle: 'Aquí puede editar la información de la tarjeta de empresa',
			partners_formTitle: 'Cambiar la información',
			partners_oranization_type: 'Tipo de organizaón',
			partners_trade_name: 'Nombre comercial',
			partners_company_name: 'Razón social',
			partners_RUC: 'RUC',
			partners_oranization_locate: 'Dónde se ubica tu organización?',
			partners_oranization_explaining: 'Sube el video que explica su servicio y producto o incrusta el enlace desde Youtube o Vimeo',
			partners_main_banner: 'Subir el banner principal',
			partners_compony_explaining: 'Sube el vídeo de tu empresa o incrusta un enlace desde Youtube o Vimeo',
			partners_compony_popular_product: 'Descargar el producto más popular',
			partners_social_networks: 'Redes sociales',
			partners_digital_catalog: 'Catalogo digital',
			partners_main_products_descriptions: 'Sube tus principales productos y sus descripciones',
			partners_photos_gallery: 'Añadir fotos a la galería',
			partners_company_contact_information: 'Añadir datos del contacto de la empresa',
			partners_first_category_goods: 'Primera categoría de bienes',
			partners_enter_text: 'introduzca el texto',
			partners_second_category_goods: 'Segunda categoría de bienes',
			partners_create_button_catalog: 'Crea tu propio catalogo digital',
			partners_button_more_information: 'Más información',
			partners_button_add_more_categories: 'Añadir más categorías',
			partners_country_city: 'País y ciudad',
			partners_company_phone: 'Teléfono de la empresa',
			partners_placeholder_enter_link: 'introduzca el enlace',
			partners_choose_compony: 'Empresa',
			partners_choose_NGO: 'ONG',
			// gray info circles
			partners_upload_video_info: 'Si subes tu propio vídeo, debe estar en formato .mp4 y no debe superar los 50 megabytes de tamaño',
			partners_banner_uploaded_info: 'El banner debe cargarse a 1100 por 278 píxeles en formato .png',
			partners_upload_photos_info: 'Sube un máximo de 6 fotos que no excedan los 2MB',
			partners_add_active_number_info: 'Agregar número activo para la comunicación y con formato internacional. ej: 51 933625150',
			//footer
			partners_our_contacts: 'Contactos',
			partners_our_social_networks: 'Nuestras redes sociales',
			partners_button_become_partner: 'Conviértete en socio',
			facebook: 'Facebook',
			instagram: 'Instagram',
			linkedIn: 'LinkedIn',
			tikTok: 'TikTok',
			submit: 'Enviar',
			upload_file: 'Subir archivo',
			paste_link: 'Pegar enlace',
			type_text: 'Escribir texto',
		},
		qu: {
			event_category_filter_placeholder: 'ñiqichana',
			city_filter_placeholder: 'Llaqtakuna',
			no_event: 'Fiestakunaqa manam kanchu',
			events_today: 'Sucedimientokuna',
			how_to_become_event_host: '¿Imaynatataq evento organizador kayta atisunman?',
			learn_more: 'Astawan ñawinchay',
			event_host_registration_redirect_content: 'Registrarse como organizador de eventos le permitirá publicar información sobre los eventos que organiza. Este estado no se otorga inmediatamente después del registro; deberá esperar a que nuestra administración verifique la información que proporcionó.',
			event_host_registration_redirect: 'Evento organizador nisqapa inscribikusqan paginaman rinaykipaqñam kachkanki',
			event_host_gallery: 'Galería Organizador nisqa',
			yes: 'Arí',
			no: 'No',
			registration_successful: 'Inscripción allin ruwasqa',
			partner_after_registration_modal_content: 'Kamachiqniyku pisimanta pisi qamwan rimanakunqaku, correo electrónico nisqawan qusqayki willayta takyachinankupaq. Takichiy ruway tukukuptin, evento organizador estadota chaskinki chaymanta portal cultural kaqpi eventokuna ruwayta atikunki',
			check_your_email: 'Aswan kamachiykunata tarinaykipaq correo electrónicoykita qhaway',
			require_location_on_map: 'mapapi maypi kasqanmanta akllanapaq mañakunku',
			choose_at_least_one_point: 'huk puntollatapas akllanapaqmi mañakun',
			require_to_type_number: 'yupayta qillqanapaq mañakun',
			file_required: 'Huk willañiqitam necesitakun',
			this_field_is_required: 'Kay chakraqa mañasqam',
			this_field_must_be_at_least: 'Kay pampaqa {count} qillqayuqlla kanan tiyan',
			this_field_is_incorrect: 'Chakraqa pantasqa hunt’asqa kachkan',
			passwords_do_not_match: 'Yaykuna rimaykuna mana tupanchu',
			new_password: 'Musuq Contraseña',
			reset_password: 'Yaykuna rimaykita wakmanta churay',
			email_confirmed: '¡Correo electrónico nisqaykiqa takyachisqañam kachkan! Kunanqa yaykuyta atikunki kamachiy formulariota llamk\'achispa correo electrónico chaymanta contraseña qusqaykiwan',
			name_of_platform: 'Portal Cultural Cusco',
			help_request_description: 'Conveniente manerapi rimanakuy hinaspa yanapasqaykiku',
			help_request_title: '¿Complicadochu rikchakun chay formulario?',
			to_main_page: 'Wasi',
			lient_personal_page_description: 'Kunanqa sistemapi estadoyki Cliente kaq. Sichus ñawpaqta huk mañakuyta apachirqanki huk socio hina registrakunaykipaq, ama hina kaspa suyay chiqaqchay ruway tukukunankama. Huk evento organizador kaqpa estadonta chaskisqaykimanta, sapalla yupayniyki kay p\'anqapi rikuchikunqa. Sichus mana huk mañakuyta apachirqankichu, chaymanta kay t\'aqa kunan wiñachiypi kachkan, ichaqa kayqa mana harkasunkichu huk ruwayta munasqaykiman hina akllanaykipaq, chayrayku yuyaychaykiku hatun p\'anqaman kutinaykipaq',
			client_personal_page: 'Clientepa sapan p\'anqan',
			footer_title_our_socials: 'Redes sociales nisqayku',
			sign_out: 'Lloqsiy',
			contacts_title: 'Kontak',
			footer_title_addition_info: 'Yapamanta willakuy',
			// home page features
			welcome: '¡Sumaq kawsay!',
			about_us_title: 'Ñoqaykumanta',
			main_title: 'Kusko llaqtapi kulturaykuna',
			sales: 'Venta',
			news: 'Ñukanchik',
			charity: 'Kawsay',
			// drag n drop component features
			clear: 'Pichay',
			drag_n_drop:
				`Wakin willañiqikunata kaypi aysay hinaspa urmachiy utaq ñit'iy willañiqikunata akllanaykipaq`,
			file_drop: 'Kayman willañiqikunata aysay...',
			size_exceeded: 'Willañiqip aswan hatun sayayninmi pasasqa',
			file_dropTypeError: 'willañiqip rikchayninqa manam suyasqa hinachu',
			file_extenisionError: `Allin willañiqi mast'ariykuna`,
			file_quantityError: '1 archivo suyasqa',
			dnd_imageUpload: 'Imahinata apachiy',
			dnd_videoUpload: 'Videota churay',
			dnd_audioUpload: 'Uyarinapaq willañiqita kargay',
			dnd_applicationUpload: 'Qillqata apachiy',
			dnd_resolution_min: 'Resolución al menos',
			dnd_resolution_max: 'Máxima resolución nisqa',
			dnd_upTo: 'kama',
			// partners page features
			partners_title: 'Proveedor Contenido kamachiy Sistema',
			partners_subtitle: 'Kaypiqa empresa tarjeta willayta allichayta atikunki',
			partners_formTitle: 'Willakuykunata tikray',
			partners_oranization_type: 'Tipo de organización nisqa',
			partners_trade_name: 'Qhatuy suti',
			partners_company_name: 'Empresapa sutin',
			partners_RUC: 'R.U.C.',
			partners_oranization_locate: '¿Maypitaq organizacionniyki kachkan?',
			partners_oranization_explaining: 'Servicioykimanta chaymanta ruruykimanta sut`inchaspa videota yapay utaq Youtube utaq Vimeo kaqmanta linkta churay',
			partners_main_banner: 'Principal bannerta churay',
			partners_compony_explaining: 'Empresaykipa videonta churay utaq Youtube utaq Vimeo nisqamanta huk linkta churay',
			partners_compony_popular_product: 'Aswan riqsisqa ruruta uraykachiy',
			partners_social_networks: 'Redes sociales nisqakuna',
			partners_digital_catalog: 'Catálogo digital nisqa',
			partners_main_products_descriptions: 'Hatun ruruykikunata chaymanta sut`inchayninkunata yapay',
			partners_photos_gallery: 'Fotokunata galería nisqaman yapay',
			partners_company_contact_information: 'Empresamanta willakuykunata yapay',
			partners_first_category_goods: 'Ñawpaq kaq categoría de bienes',
			partners_enter_text: 'qillqasqata qillqay',
			partners_second_category_goods: 'Iskay kaq t’aqa qhatukuna',
			partners_create_button_catalog: 'Kikin catálogo digital nisqa ruway',
			partners_button_more_information: 'Astawan yachaykuna',
			partners_button_add_more_categories: 'Astawan categoría nisqakunata yapay',
			partners_country_city: 'Llaqta, llaqta',
			partners_company_phone: 'Empresapa telefonon',
			partners_placeholder_enter_link: 'chay link nisqaman yaykuy',
			partners_choose_compony: 'Ruwana',
			partners_choose_NGO: 'ONG',
			// grey info circles
			partners_upload_video_info: 'Sichus kikiykiq videoykita churanki chayqa, .mp4 formatopin kanan, manataqmi 50 megabytemanta aswan hatunchu kanan',
			partners_banner_uploaded_info: 'Bannerqa 1100 278 pixel nisqapi .png nisqapi churasqa kanan tiyan',
			partners_upload_photos_info: '6 fotokunata aswan achkata churay, mana 2MB nisqamanta aswan hatun kaqta',
			partners_add_active_number_info: 'Yapay activo yupayta willanapaq chaymanta formato internacional kaqwan. ex: 51 933625150 nisqapi',
			//footer
			partners_our_contacts: 'Contactos nisqakuna',
			partners_our_social_networks: 'Redes sociales nisqayku',
			partners_button_become_partner: 'Socioman tukupuy',
			facebook: 'Facebook',
			instagram: 'Instagram',
			linkedIn: 'LinkedIn',
			tikTok: 'TikTok',
			upload_file: 'Apachiy willay',
			paste_link: 'T’inkina apachiy',
			type_text: 'Qillqay simi',
		},
	},
}));
