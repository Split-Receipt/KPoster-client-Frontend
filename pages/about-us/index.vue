<template>
	<div class="about-us">
		<div class="about-us-main-title">
			<h1>Culture events of Peru</h1>
		</div>
		<h2 class="about-us-sub-title">About us</h2>
		<span class="about-us-text">
			<span class="about-us-text-top">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. A diam maecenas sed
				enim ut sem viverra aliquet eget. Amet venenatis urna cursus eget nunc
				scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
				sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua.
				A diam maecenas sed enim ut sem viverra aliquet eget. Amet
				venenatis urna cursus eget nunc scelerisque. Lorem ipsum
				dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua.
			</span>
			<span class="about-us-text-mid">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. A diam maecenas sed
				enim ut sem viverra aliquet eget. Amet venenatis urna cursus eget nunc
				scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
				sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
			</span>
			<span class="about-us-text-bottom">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. A diam maecenas sed
				enim ut sem viverra aliquet eget. Amet venenatis urna cursus eget nunc
				scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
				sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. A diam maecenas sed
				enim ut sem viverra aliquet eget. Amet venenatis urna cursus eget nunc 
				scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
				sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
			</span>
		</span>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.about-us {
    padding: 0 20px 0 20px;

    &-main-title {
        width: 100%;
        margin-top: 50px;
        
        h1 {
            width: 100%;
            font-family: $font-family-medium-expanded;
            color: $black;
            text-align: center;
            font-size: 82px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            text-align: center;

            @media screen and (max-width: 1280px) {
                font-size: 72px;
            }

            @media screen and (max-width: 768px) {
                font-size: 40px;
            }

            @media screen and (max-width: 360px) {
                font-size: 30px;
            }
        }
    }

    &-sub-title {
        margin-bottom: 0.5em;
        color: $black;
        font-family: $font-family-medium-expanded;
        font-size: 70px;
        font-style: normal;
        font-weight: 500;
        line-height: 120%;
        margin-top: 70px;

        @media screen and (max-width: 1280px) {
            font-size: 66px;
        }

        @media screen and (max-width: 768px) {
            font-size: 32px;
        }

        @media screen and (max-width: 360px) {
            font-size: 28px;
        }
    }
    
    &-text {
        color: $gray;
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: 160%;
        display: block;
        margin: 0 15% 140px 0;

        &-top {
            margin-bottom: 2em;
            display: block;
        }

        &-mid {
            margin-bottom: 2em;
            display: block; 
        }

        &-bottom {
            display: block;
        }

        @media screen and (max-width: 1280px) {
            font-size: 16px;
        }

        @media screen and (max-width: 768px) {
            font-size: 12px;
        }

        @media screen and (max-width: 360px) {
            font-size: 13px;
        }
    }
}
</style>