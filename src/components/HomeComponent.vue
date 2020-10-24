<template>
  <div class="container">
    <div class="inner inner--index content">
      <!--header-->
      <header class="header header--index">
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
            <button :style="setColor" :disabled="!isGenerated" i :class="['button', isGenerated ? 'generated' : ''] " tabindex="4">Generate Color Palette</button>
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
                <input id="degree" max="360" min="0" name="degree" placeholder="Insert a number 0-360" type="number" tabindex="1"  @keyup="setDegree" v-model="degree" :class="(!!error.degree.length) ? 'error' : ''">
                <label for="degree">Degree: <span class="error">{{ error.degree }}</span></label>
              </div>

              <div class="main__form__insert__form__inline-block input-group">
                <input id="saturation" max="100" min="0" name="saturation" placeholder="Insert a number 0-100" type="number" tabindex="2" @keyup="setSaturation" v-model="saturation" :class="(!!error.saturation.length) ? 'error' : ''">
                <label for="saturation" >Saturation:  <span class="error">{{ error.saturation }}</span></label>
              </div>

              <div class="main__form__insert__form__inline-block input-group">
                <input id="brightness" max="100" min="0" name="brightness" placeholder="Insert a number 0-100" type="number" tabindex="3" @keyup="setBrightness" v-model="brightness" :class="(!!error.brightness.length) ? 'error' : ''">
                <label for="brightness">Brightness:  <span class="error">{{ error.brightness }}</span></label>
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
//todo errors in labels
import { types } from '../store/mutations';
import Wheel from './WheelComponent';

export default {
  name: "HomeComponent",
  components: {
    Wheel
  },
  data() {
    return {
      isGenerated: false,
      degree: this.$store.state.degree,
      saturation: this.$store.state.saturation,
      brightness: this.$store.state.brightness,
      cssColor: this.$store.state.cssColor,
      error: this.$store.state.error
    }
  },
  computed: {
    rotate() {
      return { transform: 'rotate(-' + this.degree + 'deg)'};
    },
    setColor() {
      const type = 'getError';
      const mutation = types.ERROR_COLOR;

      let degree = this.degree;
      let saturation = this.saturation;
      let brightness = this.brightness;
      if(this.degree < 0 || this.degree > 360) {
        degree = 360;
        this.$store.dispatch({type, errorMessage: 'is out of range', mutation, typeError: 'degree'});
      }
      if (this.saturation < 0 || this.saturation > 100) {
        saturation = 50;
        this.$store.dispatch({type, errorMessage: 'is out of range', mutation, typeError: 'saturation'});
      }
      if (this.brightness < 0 || this.brightness > 100) {
        brightness = 50;
        this.$store.dispatch({type, errorMessage: 'is out of range', mutation, typeError: 'brightness'});
      }

      let color = this.$store.state.ColorPalettesRange.HslConvert(degree, saturation, brightness).getRgb().printRgb();
      return { backgroundColor: color };
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
      const number = parseFloat(this.brightness);

      const type = 'getError';
      const mutation = types.ERROR_COLOR;

      if (number < 0 || number > 100) {
        this.$store.dispatch({type, errorMessage: 'is out of range', mutation, typeError: 'brightness'});
        this.error.brightness = this.$store.state.error.brightness;
      } else {
        const type = 'updateValue';
        const mutation = types.UPDATE_BRIGHTNESS;

        this.$store.dispatch({type, number, mutation}).then(() => {
          this.setGenerated();
          this.$store.dispatch({type: 'getError', mutation: types.ERROR_COLOR, errorMessage: '',  typeError: 'brightness'});
          this.error.brightness = this.$store.state.error.brightness;
        });
      }

    },
    setSaturation() {
      console.log('setSaturation')
      const number = parseFloat(this.saturation);
      const type = 'getError';
      const mutation = types.ERROR_COLOR;

      if (number < 0 || number > 100) {
        this.$store.dispatch({type, errorMessage: 'is out of range', mutation, typeError: 'saturation'});
        this.error.saturation = this.$store.state.error.saturation;
      } else {
        const type = 'updateValue';
        const mutation = types.UPDATE_SATURATION;

        this.$store.dispatch({type, number, mutation}).then(() => {
          this.setGenerated();
          this.$store.dispatch({type: 'getError', mutation: types.ERROR_COLOR, errorMessage: '',  typeError: 'saturation'});
          this.error.saturation = this.$store.state.error.saturation;
        });
      }
    },
    setDegree() {
      const number = parseFloat(this.degree);
      const type = 'getError';
      const mutation = types.ERROR_COLOR;

      if (number < 0 || number > 360) {
        this.$store.dispatch({type, mutation, errorMessage: 'is out of range',  typeError: 'degree'});
        this.error.degree = this.$store.state.error.degree;
      } else {
        const type = 'updateValue';
        const mutation = types.UPDATE_DEGREE;

        this.$store.dispatch({type, number, mutation}).then(() => {
          this.setGenerated();
          this.$store.dispatch({type: 'getError', mutation: types.ERROR_COLOR, errorMessage: '',  typeError: 'degree'});
          this.error.degree = this.$store.state.error.degree;
        });
      }
    }
  },

};
</script>

<style scoped lang="scss">
.error {
  color: red;
}
.chart {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transform: rotate(180deg);
  transform-origin: 50% 50%;
  margin: auto;
  width: 45%;
  height: 100%;
  min-height: 200px;
  min-width: 200px;

  @media screen and (max-width: 1090px) {
    width: 55%;
    height: 100%;
    transform: rotate(270deg) scale(1.5);
  }
}
.button {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, -50%);
  opacity: 0;
  filter: drop-shadow(2px 5px 4px rgba(0,0,0, 0.5));
  //cursor: none;
  transition: all 0.2s;
  &.generated {
    opacity: 1;
    cursor: pointer;

    &:hover,
    &:active,
    &:focus {
      opacity: 0.9;
      box-shadow: inset 1px 1px 2px rgba(0,0,0,0.5);
    }
  }
}
.main__form__generate {
  position: relative;
}
</style>
