<template>
  <form action="/palettes" class="main__form">
    <section class="main__form__generate">
      <button :style="setColor" :disabled="!isGenerated" i :class="['button', isGenerated ? 'generated' : ''] "
              tabindex="4">Generate Color Palette
      </button>
      <div class="chart">
        <wheel :style="rotate" :brightness="brightness" :saturation="saturation" ></wheel>
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
          <input id="degree" max="360" min="0" name="degree" placeholder="Insert a number 0-360" type="number"
                 tabindex="1" @keyup="setDegree" v-model="degree" :class="(!!error.degree.length) ? 'error' : ''">
          <label for="degree">Degree: <span class="error">{{ error.degree }}</span></label>
        </div>

        <div class="main__form__insert__form__inline-block input-group">
          <input id="saturation" max="100" min="0" name="saturation" placeholder="Insert a number 0-100"
                 type="number" tabindex="2" @keyup="setSaturation" v-model="saturation"
                 :class="(!!error.saturation.length) ? 'error' : ''">
          <label for="saturation">Saturation: <span class="error">{{ error.saturation }}</span></label>
        </div>

        <div class="main__form__insert__form__inline-block input-group">
          <input id="brightness" max="100" min="0" name="brightness" placeholder="Insert a number 0-100"
                 type="number" tabindex="3" @keyup="setBrightness" v-model="brightness"
                 :class="(!!error.brightness.length) ? 'error' : ''">
          <label for="brightness">Brightness: <span class="error">{{ error.brightness }}</span></label>
        </div>

      </div>
    </section>

  </form>

</template>

<script>
import {types} from "@/store/mutations";
import Wheel from './WheelComponent';

export default {
  name: "FormComponent",
  components: {
    Wheel,
  },
  data() {
    return {
      isGenerated: false,
      degree: this.$store.state.degree,
      saturation: this.$store.state.saturation,
      brightness: this.$store.state.brightness,
      cssColor: this.$store.state.cssColor,
      error: this.$store.state.error,
    }
  },
  computed: {
    rotate() {
      return {transform: 'rotate(-' + this.degree + 'deg)'};
    },
    setColor() {
      const type = 'getError';
      const mutation = types.ERROR_COLOR;

      let degree = this.degree;
      let saturation = this.saturation;
      let brightness = this.brightness;
      if (this.degree < 0 || this.degree > 360) {
        degree = 360;
        this.$store.dispatch({type, messageError: 'is out of range', mutation, typeError: 'degree'});
      }
      if (this.saturation < 0 || this.saturation > 100) {
        saturation = 50;
        this.$store.dispatch({type, messageError: 'is out of range', mutation, typeError: 'saturation'});
      }
      if (this.brightness < 0 || this.brightness > 100) {
        brightness = 50;
        this.$store.dispatch({type, messageError: 'is out of range', mutation, typeError: 'brightness'});
      }

      let color = this.$store.state.ColorPalettesRange.HslConvert(degree, saturation, brightness).getRgb().printRgb();
      return {backgroundColor: color};
    }
  },
  methods: {
    setGenerated() {
      if (this.$store.state.color instanceof this.$store.state.ColorPalettesRange.Hsl) {
        this.isGenerated = (!this.isGenerated) ? !this.isGenerated : this.isGenerated;
        this.cssColor = this.$store.state.cssColor;
      }
    },
    setBrightness() {
      const settings = {
        number: parseFloat(this.brightness),
        actionError: 'getError',
        actionUpdate: 'updateValue',
        mutationError: types.ERROR_COLOR,
        mutationUpdate: types.UPDATE_DEGREE,
        typeError: 'brightness',
        messageError: 'is out of range',
        range: {
          min: 0,
          max: 100
        }
      };
      this.setValues(settings);
    },
    setSaturation() {
      const settings = {
        number: parseFloat(this.saturation),
        actionError: 'getError',
        actionUpdate: 'updateValue',
        mutationError: types.ERROR_COLOR,
        mutationUpdate: types.UPDATE_DEGREE,
        typeError: 'saturation',
        messageError: 'is out of range',
        range: {
          min: 0,
          max: 100
        }
      };
      this.setValues(settings);
    },
    setDegree() {
      const settings = {
        number: parseFloat(this.degree),
        actionError: 'getError',
        actionUpdate: 'updateValue',
        mutationError: types.ERROR_COLOR,
        mutationUpdate: types.UPDATE_DEGREE,
        typeError: 'degree',
        messageError: 'is out of range',
        range: {
          min: 0,
          max: 360
        }
      };
      this.setValues(settings);
    },
    setValues({number, range: {min, max}, actionError, typeError, mutationError, messageError, actionUpdate, mutationUpdate}) {
      number = parseFloat(number);

      if (number < min || number > max) {
        this.$store.dispatch({type: actionError, mutation: mutationError, typeError, messageError});
        this.error[typeError] = this.$store.state.error[typeError];
      } else {
        this.$store.dispatch({type: actionUpdate, number, mutation: mutationUpdate}).then(() => {
          messageError = '';
          this.setGenerated();
          this.$store.dispatch({type: actionError, mutation: mutationError, typeError, messageError});
          this.error[typeError] = this.$store.state.error[typeError];
        });
      }
    },
  },
}
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
  filter: drop-shadow(2px 5px 4px rgba(0, 0, 0, 0.5));
  color: #FFF;
  transition: all 0.2s;

  &.generated {
    opacity: 1;
    cursor: pointer;

    &:hover,
    &:active,
    &:focus {
      opacity: 0.9;
      box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.5);
    }
  }
}

.main__form__generate {
  position: relative;
}
</style>
