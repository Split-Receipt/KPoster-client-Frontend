<template>
	<div class="organizer">
		<h1>Culture events of Peru</h1>
		<div class="organizer-greet">
			<div class="organizer-greet-text">
				<span class="organizer-greet-text-top">Creador de contenido en plataformas digitales</span>
				<div class="organizer-greet-text-desctop">
					<h3 class="organizer-greet-text-middle">Nombre del organizador</h3>
					<span class="organizer-greet-text-bottom">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A diam maecenas sed enim ut sem viverra aliquet eget. </span>
				</div>
			</div>
			<div class="organizer-greet-image"/>
			<div class="organizer-greet-text-mobile">
				<h3 class="organizer-greet-text-middle">Nombre del organizador</h3>
				<span class="organizer-greet-text-bottom">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A diam maecenas sed enim ut sem viverra aliquet eget. </span>
			</div>
		</div>

		<div class="organizer-calendar">
			<h3 class="organizer-calendar-title">Calendario de eventos <br/> del organizador</h3>
			<date-card-carousel />
		</div>
        
		<div class="organizer-filters">
			<cp-drop-down
				v-model="categoriesToFilter"
				:options="testFilterOptions1"
				drop-down-label="Filter by category"
				:value="categoriesToFilter"
			/> 

			<cp-drop-down
				v-model="categoriesToFilter2"
				:options="testFilterOptions2"
				drop-down-label="Filter by city"
				:value="categoriesToFilter2"
			/> 
		</div>
        
		<div class="organizer-events">
			<event-carousel id="organizer-events-carousel" :event-data="sectionData[0].eventData" />
		</div>
        
		<div class="organizer-infoImage">
			<nuxt-img loading="lazy" src="../public/images/partnrerInfoImg.jpg"/>
		</div>
		<div class="organizer-contacts">
			<div class="organizer-contacts-title">
				<h3>Contactos del organizador</h3>
				<span>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt
					ut labore et dolore magna aliqua. 
					A diam maecenas sed enim ut sem viverra aliquet eget. 
				</span>
			</div>
			<div class="organizer-contacts-referenses">
				<div class="organizer-contacts-referenses-mail">
					<span class="organizer-contacts-referenses-mail-title">E-mail</span>
					<span class="organizer-contacts-referenses-mail-ref">organizador@cusco.com</span>
				</div>
				<div class="organizer-contacts-referenses-tel">
					<span class="organizer-contacts-referenses-tel-title">Número de teléfono</span>
					<span class="organizer-contacts-referenses-tel-ref">+ 111 81959 193491</span>
				</div>
				<div class="organizer-contacts-referenses-place">
					<span class="organizer-contacts-referenses-place-title">País y ciudad</span>
					<span class="organizer-contacts-referenses-place-ref">cusco, peru</span>
				</div>
				<div class="organizer-contacts-referenses-socials">
					<cp-social-link social-link="http://localhost:3000/es/detailed-organizer" social-name="instagram"/>
					<cp-social-link social-link="http://localhost:3000/es/detailed-organizer" social-name="linkedin"/>
					<cp-social-link social-link="http://localhost:3000/es/detailed-organizer" social-name="tiktok"/>
					<cp-social-link social-link="http://localhost:3000/es/detailed-organizer" social-name="facebook"/>
				</div>
			</div>
		</div>

		<div class="organizer-video">
			<iframe
				src="https://www.youtube.com/embed/Y3ywicffOj4?si=1lWD8HxFUFOGH6Av"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen/>
		</div>

		<div class="organizer-map">
			<cp-map :map-markers="testMarkers" :center="testMapCenter"/>
		</div>
	</div>
</template>

<script setup lang="ts">
const testMarkers = [{ coordinates: [-12.046016, -77.030554] }];
const testMapCenter = [-12.046016, -77.030554];
const categoriesToFilter: string[] = [];
const categoriesToFilter2: string[] = [];
const testFilterOptions1 = [
	{
		item_title: 'title1',
	 	item_UID: 'id1',
	  	item_value: 'value1',
		createdAt: 'created1',
		updatedAt: 'updated1',
		publishedAt: 'published1',
		locale: 'locale1',
	},
	{
		item_title: 'title2',
	 	item_UID: 'id2',
	  	item_value: 'value2',
		createdAt: 'created2',
		updatedAt: 'updated2',
		publishedAt: 'published2',
		locale: 'locale2',
	},
];
const testFilterOptions2 = [
	{
		item_title: 'title3',
	 	item_UID: 'id3',
	  	item_value: 'value3',
		createdAt: 'created3',
		updatedAt: 'updated3',
		publishedAt: 'published3',
		locale: 'locale3',
	},
	{
		item_title: 'title4',
	 	item_UID: 'id4',
	  	item_value: 'value4',
		createdAt: 'created4',
		updatedAt: 'updated4',
		publishedAt: 'published4',
		locale: 'locale4',
	},
];

const sectionData = [
	{
		id: '1',
		title: 'Popular events',
		eventData: [
			{
				image: 'event-card-1.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-2.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-4.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-13.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-14.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-15.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
		],
	},
	{
		id: '2',
		title: 'List of events 1',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exerc',
		eventData: [
			{
				image: 'event-card-3.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-5.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-6.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-7.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-8.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-9.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-10.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-11.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
		],
	},
	{
		id: '3',
		title: 'List of events 2',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exerc',
		eventData: [
			{
				image: 'event-card-3.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-5.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-6.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-7.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-8.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-9.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-10.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-11.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
		],
	},
	{
		id: '4',
		title: 'List of events 3',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exerc',
		eventData: [
			{
				image: 'event-card-3.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-5.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-6.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-7.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-8.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-9.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-10.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
			{
				image: 'event-card-11.png',
				title: 'Event Name',
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
				dateEvent: '20/12/2024',
			},
		],
	},
];
</script>

<style scoped lang="scss">
    .organizer {
        padding: 0 20px 0 20px;

        h1 {
            width: 100%;
            font-size: 72px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            color: $soft-black;
            text-align: center;
            @media screen and (max-width: 769px) {
                font-size: 40px;
            }
        }

        h3 {
            line-height: 84px;
            font-size: 70px;
            font-weight: 500;
            font-style: normal;
            color: $black;
            @media screen and (max-width: 769px) {
                font-size: 32px;
                line-height: 50px;
            }
        }

        &-greet {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 70px 0 70px 0;
            @media screen and (max-width: 1005px) {
                flex-direction: column;
            }

            &-text {
                width: 35%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                @media screen and (max-width: 1280px) {
                    width: 45%;
                }
                @media screen and (max-width: 1005px) {
                    width: 100%;
                }

                &-desctop {
                    @media screen and (max-width: 1005px) {
                        display: none;
                    } 
                }

                &-mobile {
                    display: none;
                    width: 100%;
                    @media screen and (max-width: 1005px) {
                        display: block;
                        width: 100%;
                    }
                }

                &-top {
                    display: flex;
                    height: 90px;
                    align-items: center;
                    align-self: stretch;
                    font-size: 30px;
                    font-weight: 400;
                    line-height: normal;
                    letter-spacing: 0.9px;
                    text-transform: uppercase;
                    color: $gray;
                    margin-bottom: 82px;
                    @media screen and (max-width: 1320px) {
                        margin-bottom: 65px;
                    }
                    @media screen and (max-width: 1280px) {
                        margin-bottom: 55px;
                    }
                    @media screen and (max-width: 1005px) {
                        width: 100%;
                        margin-bottom: 10px;
                    }
                    @media screen and (max-width: 769px) {
                        font-size: 16px;
                    }
                }

                &-middle {
                    margin-bottom: 20px;
                    @media screen and (max-width: 1005px) {
                        margin-bottom: 10px;
                    }
                }
                
                &-bottom {
                    color: $gray;
                    font-size: 22px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 35.2px;
                    @media screen and (max-width: 769px) {
                        font-size: 16px;
                    }
                }
            }

            &-image {
                display: block;
                width: 60%;
                height: auto;
                border-radius: 35px;
                background-image: url('/public/images/organizer-image.jpg');
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
                @media screen and (max-width: 1280px) {
                    width: 50%;
                }
                @media screen and (max-width: 1005px) {
                    width: 100%;
                    min-height: 60vh;
                    height: 100% !important;
                    margin-bottom: 20px;
                }
            }
        }

        &-calendar {
            margin-top: 140px;
            &-title {
                text-wrap: wrap;
            }
        }

        &-filters {
            display: flex;
            margin: 35px 0 0 85px;
            @media screen and (max-width: 675px) {
              flex-direction: column;
              margin: 35px 0 10px 5px;
            }
        }

        &-events {
            display: block;
            line-height: 84px;
            font-weight: 500;
            color: #353333;
        }

        &-infoImage {
            width: calc(100% + 40px);
            height: auto;
            border-radius: 0 0 30px 30px;
            margin: 140px 0 70px -20px;
            @media screen and (max-width: 700px) {
                margin-bottom: 60px;
            }
            @media screen and (max-width: 540px) {
                margin-bottom: 50px;
            }
            @media screen and (max-width: 420px) {
                margin-bottom: 40px;
            }

            img {
                width: 100%;
                height: 100%;
                @media screen and (max-width: 700px) {
                    height: 80%;
                }
                @media screen and (max-width: 540px) {
                    height: 70%;
                }
                @media screen and (max-width: 420px) {
                    height: 60%;
                }
            }
        }

		&-contacts {
			display: flex;
			justify-content: space-between;
			width: 100%;
			padding: 0 20px 0 20px;
			margin-bottom: 70px;

			@media screen and (max-width: 865px) {
				flex-direction: column;
				margin-bottom: 0;
			}

			&-title{
				width: 50%;
				padding-right: 20px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				@media screen and (max-width: 865px) {
					width: 100%;
					padding-right: 0;
				}

				h3 {
					margin-bottom: 20px;
					font-size: 70px;
					font-style: normal;
					font-weight: 500;
					line-height: 120%;
					color: $black;

					@media screen and (max-width: 1350px) {
						font-size: 62px;
					}
					@media screen and (max-width: 1280px) {
						font-size: 56px;
					}
					@media screen and (max-width: 1030px) {
						font-size: 45px;
						font-weight: 600;
					}
					@media screen and (max-width: 965px) {
						text-align: center;
						font-size: 38px;
					}
					@media screen and (max-width: 435px) {
						font-size: 24px;
					}
				}

				span {
					font-size: 22px;
					font-style: normal;
					font-weight: 400;
					line-height: 160%;
					color: $gray;

					@media screen and (max-width: 1350px) {
						font-size: 18px;
					}
					@media screen and (max-width: 1280px) {
						font-size: 16px;
					}
					@media screen and (max-width: 1030px) {
						font-size: 14px;
					}
					@media screen and (max-width: 435px) {
						font-size: 13px;
					}
				}
			}

			&-referenses {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				padding-left: 20px;
				width: 50%;

				@media screen and (max-width: 865px) {
					width: 100%;
					margin-top: 41px;
					padding-left: 0;
				}

				&-mail {
					display: flex;
					justify-content: space-between;
					margin-bottom: 10px;

					&-title {
						font-size: 30px;
						font-style: normal;
						font-weight: 400;
						line-height: normal;
						letter-spacing: 0.9px;
						text-transform: uppercase;
						color: $gray;

						@media screen and (max-width: 1350px) {
							font-size: 26px;
						}
						@media screen and (max-width: 1280px) {
							font-size: 22px;
						}
						@media screen and (max-width: 1030px) {
							font-size: 20px;
						}
						@media screen and (max-width: 965px) {
							font-size: 18px;
						}
						@media screen and (max-width: 435px) {
							font-size: 15px;
						}
					}

					&-ref {
						font-size: 30px;
						font-style: normal;
						font-weight: 400;
						line-height: normal;
						letter-spacing: 0.9px;
						text-transform: uppercase;
						color: $gray;
						@media screen and (max-width: 1350px) {
							font-size: 26px;
						}
						@media screen and (max-width: 1280px) {
							font-size: 22px;
						}
						@media screen and (max-width: 1030px) {
							font-size: 20px;
						}
						@media screen and (max-width: 965px) {
							font-size: 18px;
						}
						@media screen and (max-width: 435px) {
							font-size: 15px;
						}
					}
				}
				&-tel {
					display: flex;
					justify-content: space-between;
					margin-bottom: 10px;

					&-title {
						font-size: 30px;
						font-style: normal;
						font-weight: 400;
						line-height: normal;
						letter-spacing: 0.9px;
						text-transform: uppercase;
						color: $gray;
						@media screen and (max-width: 1350px) {
							font-size: 26px;
						}
						@media screen and (max-width: 1280px) {
							font-size: 22px;
						}
						@media screen and (max-width: 1030px) {
							font-size: 20px;
						}
						@media screen and (max-width: 965px) {
							font-size: 18px;
						}
						@media screen and (max-width: 435px) {
							font-size: 15px;
						}
					}

					&-ref {
						font-size: 30px;
						font-style: normal;
						font-weight: 400;
						line-height: normal;
						letter-spacing: 0.9px;
						text-transform: uppercase;
						color: $gray;
						@media screen and (max-width: 1350px) {
							font-size: 26px;
						}
						@media screen and (max-width: 1280px) {
							font-size: 22px;
						}
						@media screen and (max-width: 1030px) {
							font-size: 20px;
						}
						@media screen and (max-width: 965px) {
							font-size: 18px;
						}
						@media screen and (max-width: 435px) {
							font-size: 15px;
						}
					}
				}

				&-place {
					display: flex;
					justify-content: space-between;
					margin-bottom: 10px;

					&-title {
						font-size: 30px;
						font-style: normal;
						font-weight: 400;
						line-height: normal;
						letter-spacing: 0.9px;
						text-transform: uppercase;
						color: $gray;
						@media screen and (max-width: 1350px) {
							font-size: 26px;
						}
						@media screen and (max-width: 1280px) {
							font-size: 22px;
						}
						@media screen and (max-width: 1030px) {
							font-size: 20px;
						}
						@media screen and (max-width: 965px) {
							font-size: 18px;
						}
						@media screen and (max-width: 435px) {
							font-size: 15px;
						}
					}

					&-ref {
						font-size: 30px;
						font-style: normal;
						font-weight: 400;
						line-height: normal;
						letter-spacing: 0.9px;
						text-transform: uppercase;
						color: $gray;
						@media screen and (max-width: 1350px) {
							font-size: 26px;
						}
						@media screen and (max-width: 1280px) {
							font-size: 22px;
						}
						@media screen and (max-width: 1030px) {
							font-size: 20px;
						}
						@media screen and (max-width: 965px) {
							font-size: 18px;
						}
						@media screen and (max-width: 435px) {
							font-size: 15px;
						}
					}
				}

				&-socials {
					display: flex;
					justify-content: flex-start;
					width: 100%;
					margin-top: 20px;

					@media screen and (max-width: 865px) {
						margin: 20px 0 30px 0;
					}

					div {
						margin-right: 20px;
					}
				}
			}
		}

		&-video {
			width: calc(100% + 40px);
			margin: 0 0 70px -20px;
			display: flex;
			justify-content: space-around;
			iframe {
				border-radius: 8px;
				width: 75%;
				height: 75vh;
			}
		}

		&-map {
			width: calc(100% + 40px);
			margin-left:-20px;
			height: 400px;
		}
    }
</style>