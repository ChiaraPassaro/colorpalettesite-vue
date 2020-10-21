<template>
  <div class="container">
    <div class="inner inner--index content">
      <!--header-->
      <header class="header header--index">
        <div class="arrow-rotate">
          <div aria-hidden="true" class="arrow  arrow--header">
            <div class="arrow__inner"></div>
          </div>
        </div>
        <section>
          <h1 class="header__title">Color <span>Palettes Range</span></h1>
          <h2 class="header__sub-title">A Javascript library for generate palette schemes on a base color.</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam minus natus nulla pariatur sunt. Culpa debitis dolore nulla sequi tempora voluptates. Aliquam, autem dolorum ipsam libero minus praesentium rerum similique.</p>
        </section>
      </header>
      <!--/header-->

      <!--main-->
      <main class="main main--index">
        <!--form-->
        <form action="" class="main__form">
          <section class="main__form__generate" >
<!--            <section :class="['main__form__generate', isGenerated ? 'generated' : '']"  :style="{backgroundColor: cssColor}">-->
            <button :style="setColor" :class="['button', isGenerated ? 'generated' : ''] " tabindex="4">Generate Color Palette</button>
            <div class="chart">
<!--              devo passare le props per schiarire i colori-->
              <wheel :style="rotate"></wheel>
<!--              <chart-doug :style="rotate"></chart-doug>-->
            </div>

          </section>

          <section class="main__form__insert ">

            <div class="main__form__insert__wrapper">
              <div class="arrow-rotate">
                <div aria-hidden="true" class="arrow arrow--main">
                  <div class="arrow__inner"></div>
                </div>
              </div>
              <h2 class="main__form__insert__title">Insert Your Base Color</h2>

              <div class="main__form__insert__form__inline-block input-group">
                <input id="degree" max="360" min="0" name="degree" placeholder="Insert a number 0-360" type="number" tabindex="1"  @keyup="setDegree" v-model="degree">
                <label for="degree">Degree: </label>
              </div>

              <div class="main__form__insert__form__inline-block input-group">
                <input id="saturation" max="100" min="0" name="saturation" placeholder="Insert a number 0-100" type="number" tabindex="2" @keyup="setSaturation" v-model="saturation">
                <label for="saturation">Saturation: </label>
              </div>

              <div class="main__form__insert__form__inline-block input-group">
                <input id="brightness" max="100" min="0" name="brightness" placeholder="Insert a number 0-100" type="number" tabindex="3" @keyup="setBrightness" v-model="brightness">
                <label for="brightness">Brightness: </label>
              </div>

            </div>
          </section>

        </form>
        <!--/form-->
      </main>
      <!--/main-->

      <!--footer-->
      <footer class="footer footer--index">
        <a href="https://github.com/ChiaraPassaro" tabindex="5" class="github"><i class="fab fa-github"></i> <span class="xs-hidden">Github</span></a>
      </footer>
      <!--/footer-->

    </div>
  </div>

</template>

<script>
import { types } from '../store/mutations';
// import ChartDoug from './ChartDoug.js';
import Wheel from './WheelComponent';

export default {
  name: "HomeComponent",
  components: {
    // ChartDoug,
    Wheel
  },
  data() {
    return {
      isGenerated: false,
      degree: this.$store.state.degree,
      saturation: this.$store.state.saturation,
      brightness: this.$store.state.brightness,
      cssColor: this.$store.state.cssColor,
    }
  },
  computed: {
    rotate() {
      return { transform: 'rotate(-' + this.degree + 'deg)'}
    },
    setColor() {
      return { backgroundColor: this.$store.state.ColorPalettesRange.HslConvert(this.degree, this.saturation, this.brightness).getRgb().printRgb() };
    }
  },
  methods: {
    setGenerated() {
      if(this.$store.state.color instanceof this.$store.state.ColorPalettesRange.Hsl) {
        this.isGenerated = (!this.isGenerated) ? !this.isGenerated : this.isGenerated;
        this.cssColor = this.$store.state.cssColor;
      }
    },
    setBrightness() {
      const type = 'updateValue';
      const mutation = types.UPDATE_BRIGHTNESS;
      const number = parseFloat(this.brightness);
      this.$store.dispatch({type, number, mutation}).then(() => {
        this.setGenerated();
      });
    },
    setSaturation() {
      const type = 'updateValue';
      const mutation = types.UPDATE_SATURATION;
      const number = parseFloat(this.saturation);
      this.$store.dispatch({type, number, mutation}).then(() => {
        this.setGenerated();
      });
    },
    setDegree() {
      const type = 'updateValue';
      const mutation = types.UPDATE_DEGREE;
      const number = parseFloat(this.degree);
      this.$store.dispatch({type, number, mutation}).then(() => {
        this.setGenerated();
      });
    },
  }
};
</script>

<style scoped lang="scss">
.chart {
  display: flex;
  position: relative;
  transform: rotate(180deg);
  transform-origin: 50% 50%;
  margin: auto;
  width: 45%;
  height: 100%;
  > div {
    margin: auto;
  }
}
.button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  transition: all 0.2s;
  opacity: 0;
  &.generated {
    opacity: 1;
  }
  &:hover,
  &:active,
  &:focus {
    opacity: 0.9;
    box-shadow: inset 1px 1px 2px rgba(0,0,0,0.5);
  }
}
.main__form__generate {
  position: relative;
}
</style>
