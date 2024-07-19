<template>
  <div class="main-page">
    <div class="main-page__header">
      <c-p-header />
    </div>

    <main class="main-page__main">
      <h1 class="main-page__title">Culture events of Peru</h1>

      <div class="main-page__date-carousel">
        <date-card-carousel />
      </div>

      <div class="main-page__section-list">
        <section class="main-page__section-item">
          <div class="main-page__section-wrapper">
            <div class="main-page__section-info">
              <h2 class="main-page__section-header">Popular events</h2>
            </div>

            <div class="main-page__section-carousel">
              <event-carousel :event-data="eventData" />
            </div>
          </div>
        </section>

        <section class="main-page__section-item">
          <div class="main-page__section-wrapper">
            <div class="main-page__section-info">
              <h3 class="main-page__section-header">List of events 1</h3>
              <p class="main-page__section-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exerc
              </p>
            </div>

            <div class="main-page__section-carousel">
              <event-carousel :event-data="eventData" />
            </div>
          </div>
        </section>

        <section class="main-page__section-item">
          <div class="main-page__section-wrapper">
            <div class="main-page__section-info">
              <h3 class="main-page__section-header">List of events 2</h3>
              <p class="main-page__section-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exerc
              </p>
            </div>

            <div class="main-page__section-carousel">
              <event-carousel :event-data="eventData" />
            </div>
          </div>
        </section>

        <section class="main-page__section-item">
          <div class="main-page__section-wrapper">
            <div class="main-page__section-info">
              <h3 class="main-page__section-header">List of events 3</h3>
              <p class="main-page__section-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exerc
              </p>
            </div>

            <div class="main-page__section-carousel">
              <event-carousel :event-data="eventData" />
            </div>
          </div>
        </section>
      </div>
    </main>

    <div class="main-page__footer">
      <c-p-footer />
    </div>
  </div>
</template>

<script setup lang="ts">
const eventData = [
  {
    image: 'event-card-1.jpg',
    title: 'Event Name',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    dateEvent: '20/12/2024',
  },
  {
    image: 'event-card-2.jpg',
    title: 'Event Name',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    dateEvent: '20/12/2024',
  },
  {
    image: 'event-card-3.jpg',
    title: 'Event Name',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    dateEvent: '20/12/2024',
  },
  {
    image: 'event-card-4.jpg',
    title: 'Event Name',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    dateEvent: '20/12/2024',
  },
  {
    image: 'event-card-5.jpg',
    title: 'Event Name',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    dateEvent: '20/12/2024',
  },
  {
    image: 'event-card-6.jpg',
    title: 'Event Name',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    dateEvent: '20/12/2024',
  },
  {
    image: 'event-card-7.jpg',
    title: 'Event Name',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    dateEvent: '20/12/2024',
  },
  {
    image: 'event-card-8.jpg',
    title: 'Event Name',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    dateEvent: '20/12/2024',
  },
  {
    image: 'event-card-9.jpg',
    title: 'Event Name',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    dateEvent: '20/12/2024',
  },
  {
    image: 'event-card-10.jpg',
    title: 'Event Name',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    dateEvent: '20/12/2024',
  },
  {
    image: 'event-card-11.jpg',
    title: 'Event Name',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    dateEvent: '20/12/2024',
  },
  {
    image: 'event-card-12.jpg',
    title: 'Event Name',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut',
    dateEvent: '20/12/2024',
  },
];
</script>

<style scoped lang="scss">
.main-page {
  background-color: $main-page-background-color;

  &__main {
    margin-top: 2px;
    padding-left: 10px;

    @media #{$screen-tablet} {
      margin-top: 10px;
    }

    @media #{$screen-desktop} {
      padding: 0 20px;
      margin-top: 33px;
    }
  }

  &__title {
    @media #{$screen-tablet} {
      max-width: 55%;
      font-family: $font-family-MediumExtraExpanded;
    }

    @media #{$screen-desktop} {
      max-width: 100%;
      font-family: $font-family-MediumUltraExpanded;
    }
  }

  &__date-carousel {
    @media #{$screen-tablet} {
      margin-top: 30px;
    }

    @media #{$screen-desktop} {
      margin-top: 40px;
    }

    @media #{$screen-big-desktop} {
      margin-top: 32px;
    }
  }

  &__section {
    &-list {
      display: flex;
      flex-direction: column;
      gap: 65px;
      margin-top: 60px;
      margin-bottom: 40px;

      @media #{$screen-tablet} {
        margin-top: 45px;
      }

      @media #{$screen-desktop} {
        gap: 37px;
        margin-top: 55px;
      }

      @media #{$screen-big-desktop} {
        gap: 100px;
        margin-top: 85px;
      }
    }

    &-item {
      position: relative;
      border-bottom: 1px solid $main-page-section-border-color;
      padding-bottom: 60px;

      @media #{$screen-tablet} {
        padding-bottom: 40px;
      }

      @media #{$screen-desktop} {
        padding-bottom: 50px;
      }
    }

    &-wrapper {
      display: flex;
      flex-direction: column;
      gap: 20px;

      @media #{$screen-tablet} {
        position: relative;
        bottom: 52px;
        margin-bottom: -53px;
      }
    }

    &-info {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: 98%;

      @media #{$screen-tablet} {
        gap: 20px;
        bottom: -50px;
      }

      @media #{$screen-desktop} {
        gap: 15px;
      }

      @media #{$screen-big-desktop} {
        bottom: -40px;
      }
    }

    &-text {
      font-size: $main-page-section-text-font-size-mobile;
      line-height: $main-page-section-text-line-height-mobile;
      color: $main-page-section-text-color;

      @media #{$screen-tablet} {
        font-size: $main-page-section-text-font-size-tablet;
        line-height: $main-page-section-text-line-height-tablet;
        width: 48%;
      }

      @media #{$screen-big-desktop} {
        max-width: 584px;
      }
    }

    &-carousel {
      @media #{$screen-tablet} {
        position: relative;
        bottom: 20px;
      }

      @media #{$screen-desktop} {
        bottom: 30px;
      }
    }
  }
}
</style>
