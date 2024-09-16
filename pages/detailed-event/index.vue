<template>
	<div class="detailed">
		<div class="detailed__socialMedias">
			<span class="detailed__socialMedias-title">Social media:</span>
			<div class="detailed__socialMedias-links">
				<cp-social-link class="detailed__socialMedias-links-item" social-name="instagram" social-link="https://www.youtube.com/watch?v=zw79RVnlCb0"/>
				<cp-social-link class="detailed__socialMedias-links-item" social-name="linkedin" social-link="https://www.youtube.com/watch?v=zw79RVnlCb0"/>
				<cp-social-link class="detailed__socialMedias-links-item" social-name="tiktok" social-link="https://www.youtube.com/watch?v=zw79RVnlCb0"/>
				<cp-social-link class="detailed__socialMedias-links-item" social-name="facebook" social-link="https://www.youtube.com/watch?v=zw79RVnlCb0"/>
			</div>
		</div>

		<div class="detailed__relatedList">
			<cp-huge-link-btn class="detailed__relatedList-item" huge-title="Tu catalogo digital" huge-link="https://www.youtube.com/watch?v=zw79RVnlCb0"/>
			<cp-huge-link-btn class="detailed__relatedList-item" huge-title="Crea tu propio catalogo digital" huge-link="https://www.youtube.com/watch?v=zw79RVnlCb0"/>
			<cp-huge-link-btn class="detailed__relatedList-item" huge-title="Pagina web" huge-link="https://www.youtube.com/watch?v=zw79RVnlCb0"/>
		</div>

		<div class="detailed__EventCard">
			<h2 class="detailed__EventCard-title">Event card</h2>
			<div class="detailed__EventCard-text">
				<span>
					Nombre de la empresa
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua. A diam maecenas
						sed enim ut sem viverra aliquet eget. Amet venenatis urna cursus eget
						nunc scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing
						elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
					</p>
				</span>
			</div>
		</div>

		<div class="detailed__mainImage">
			<div class="detailed__mainImage-info">
				<span class="detailed__mainImage-info-title">Vajilla de barro</span>
				<span class="detailed__mainImage-info-text">Propuesta comercial única</span>
				<span class="detailed__mainImage-info-date">de 22.07 a 5.08</span>
				<cp-button 
					color="yellowGrey"
					shape="oval"
					text="Horarios y entradas"
					width="maxWidth"
					size="middle"
					:islink="true"
					link-to="/partners-registration"
				/>
			</div>
			<!-- <NuxtImg class="detailed__mainImage-BG" loading="lazy" src="../public/images/event-card-14.png"/> -->
		</div>
        
	</div>
</template>

<script setup lang="ts">
import CpSocialLink from '@shared/gui/CpSocialLink.vue';
import CpHugeLinkBtn from '@shared/gui/CpHugeLinkBtn.vue';
</script>

<style scoped lang="scss">
    .detailed {
        @media #{$screen-tablet} {
			margin-top: 10px;
		}

		@media #{$screen-desktop} {
            padding: 0 5%;
            margin-top: 33px;
            color: #888888;
		}

        &__socialMedias {
            &-title{
                font-size: 22px;
                line-height: 35.2px;
                font-weight: 400;
            }

            &-links {
                display: flex;
                margin-top: 14px;

                &-item {
                    margin-right: 30px;
                }
            }
        }

        &__relatedList {
            display: flex;
            margin-top: 56px;

            &-item {
                margin-right: 19px;
            }
        }

        &__EventCard {
            margin-top: 100px;

            &-title {
                font-size: 70px;
                line-height: 98px;
                font-weight: 500;
                color: #353333;
            }

            &-text {
                margin-top: 30px;

                span {
                    font-size: 30px;
                    line-height: 42px;
                    font-weight: 500px;
                    color: #353333;
                    
                    p {
                        font-size: 22px;
                        line-height: 35.2px;
                        font-weight: 400;
                        color: #888888;
                        margin-top: 15px;
                        max-width: 70%;
                    }
                }
            }
        }

        &__mainImage {
            margin-top: 80px;
            position: relative;
            width: 100%;
            height: 30vw;
            border-radius: 40px;
            background-image: url('../../public/images/detailBg.png');
            background-repeat: no-repeat;
            background-size: cover;

            &-BG {
                width: 100%;
                height: 100%;
            }

            &-info {
                position: absolute;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 35%;
                height: calc(60% - 40px);
                bottom: 40px;
                left: 40px;

                &-title {
                    display: block;
                    font-size: 44px;
                    line-height: 61.6px;
                    font-weight: 500;
                    color: #F6F6F6;
                }

                &-text {
                    display: block;
                    font-size: 30px;
                    line-height: 42px;
                    font-weight: 500;
                    color: #F6F6F6;
                    margin-top: -10px;
                }

                &-date {
                    display: block;
                    font-size: 22px;
                    line-height: 35.2px;
                    font-weight: 400;
                    color: #F6F6F6;
                    margin-top: 20px;
                    margin-bottom: 25px;
                }
            }
        }

    }
</style>