<template>
  <main class="main main--palettes">
    <!--palette description-->
    <section class="palette__description">
      <div class="palette__description__info">
        <h2>Random Dominant</h2>
        <p>
          You can choose how many colors you want in a fan of 140 ° with center
          in the complementary color
        </p>
        <form
          @submit.prevent="setValues"
          id="palette__description__form"
          action=""
        >
          <div class="row">
            <div class="input-group">
              <input
                id="number_color"
                max="360"
                min="0"
                name="number_color"
                placeholder="Insert a number 0-360"
                tabindex="1"
                type="number"
                v-model="number"
                :class="!!error.number.length ? 'error' : ''"
                @keyup="checkValue"
              />
              <label for="number_color">Number colors: </label>
              <span class="error" v-if="error.number">{{ error.number }}</span>
            </div>
          </div>

          <div class="row">
            <div class="input-group">
              <input
                id="stepDegree"
                max="100"
                min="0"
                name="stepDegree"
                placeholder="Insert a number 0-100"
                tabindex="2"
                type="number"
                v-model="stepDegree"
                :class="!!error.stepDegree.length ? 'error' : ''"
                @keyup="checkValue"
              />
              <label for="stepDegree">Step Degree: </label>
              <span class="error" v-if="error.stepDegree">{{
                error.stepDegree
              }}</span>
            </div>
          </div>
          <div class="row">
            <button
              :class="['button', checkError ? '' : 'active']"
              type="submit"
              :disabled="checkError"
            >
              Genera
            </button>
          </div>
        </form>
      </div>

      <!--TODO generare colori-->
      <div
        class="palette__description__list-colors palette__description__list-colors--active"
      >
        <div aria-hidden="true" class="arrow arrow--list-colors">
          <div class="arrow__inner"></div>
        </div>

        <ul class="colors-square">
          <li class="colors-square__item">
            <span>code</span>
          </li>
          <li class="colors-square__item">
            <span>code</span>
          </li>
          <li class="colors-square__item">
            <span>code</span>
          </li>
          <li class="colors-square__item">
            <span>code</span>
          </li>
          <li class="colors-square__item">
            <span>code</span>
          </li>
          <li class="colors-square__item">
            <span>code</span>
          </li>
        </ul>
      </div>
    </section>
    <!--/palette description-->

    <!--palette detail-->
    <section class="palette__detail">
      <!--TODO inserire chartjs-->
      <div class="ratio">
        <canvas id="doughnut__canvas-split"></canvas>
      </div>
    </section>
    <!--/palette detail-->

    <!--palettes list-->
    <!--TODO sostituire le palette-->
    <section class="palettes">
      <div class="row row-1">
        <div id="triad" class="palette palette--not-active del-1">
          <div class="palette__content">
            <h2><span>Triad</span></h2>
            <ul class="palette__number-color">
              <li class="color first">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg120m">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg120">
                <span class="circle" title="color"></span>
              </li>
            </ul>
          </div>
        </div>
        <div id="split-complementary" class="palette palette--not-active del-2">
          <div class="palette__content">
            <h2><span>Split Complementary</span></h2>
            <ul class="palette__number-color">
              <li class="color first">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg160">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg160m">
                <span class="circle" title="color"></span>
              </li>
            </ul>
          </div>
        </div>
        <div id="complementary" class="palette del-3 active">
          <div class="palette__content">
            <h2><span>Complementary </span></h2>
            <ul class="palette__number-color">
              <li class="color first">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg180">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg140">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg140m">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg160">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg160m">
                <span class="circle" title="color"></span>
              </li>
            </ul>
          </div>
        </div>
        <div id="mono" class="palette palette--not-active del-4">
          <div class="palette__content">
            <h2><span>Monochrome</span></h2>
            <ul class="palette__number-color">
              <li class="color first">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg25">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg45">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg65">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg85">
                <span class="circle" title="color"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row row-2">
        <div id="analogous" class="palette palette--not-active del-5">
          <div class="palette__content">
            <h2><span>Analogous</span></h2>
            <ul class="palette__number-color">
              <li class="color first">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg25">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg45">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg65">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg85">
                <span class="circle" title="color"></span>
              </li>
            </ul>
          </div>
        </div>
        <div id="tetradic" class="palette palette--not-active del-6">
          <div class="palette__content">
            <h2><span>Tetradic</span></h2>
            <ul class="palette__number-color">
              <li class="color deg30m">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg150">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg30">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg150m">
                <span class="circle" title="color"></span>
              </li>
            </ul>
          </div>
        </div>
        <div id="square" class="palette palette--not-active del-7">
          <div class="palette__content">
            <h2><span>Square</span></h2>
            <ul class="palette__number-color">
              <li class="color deg45">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg45m">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg130">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg130m">
                <span class="circle" title="color"></span>
              </li>
            </ul>
          </div>
        </div>
        <div id="random" class="palette palette--not-active del-8">
          <div class="palette__content">
            <h2><span>Random Dominant</span></h2>
            <ul class="palette__number-color">
              <li class="color first">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg45">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg90">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg135">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg180">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg135m">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg90m">
                <span class="circle" title="color"></span>
              </li>
              <li class="color deg45m">
                <span class="circle" title="color"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <!--/palettes list-->
  </main>
</template>

<script>
import { types } from "@/store/mutations";

export default {
  name: "Random",
  data() {
    return {
      number: this.$store.state.random.number,
      stepDegree: this.$store.state.random.step,
      error: {
        stepDegree: false,
        number: false
      }
    };
  },
  computed: {
    checkError() {
      return (
        !!this.error.number.length ||
        !!this.error.stepDegree.length ||
        !this.stepDegree ||
        !this.number
      );
    }
  },
  methods: {
    setValues() {
      const stepDegree = parseInt(this.stepDegree);
      const number = parseInt(this.number);
      const isInRangeDegree =
        !isNaN(stepDegree) && stepDegree > 0 && stepDegree <= 100;
      const isInRangeNumber = !isNaN(number) && number > 0 && number <= 360;
      this.error.number = !isInRangeNumber ? "Out of range" : false;
      this.error.stepDegree = !isInRangeDegree ? "Out of range" : false;

      if (isInRangeNumber && isInRangeDegree) {
        this.$store.dispatch({
          type: "setRandom",
          mutation: types.SET_RANDOM,
          stepDegree,
          number
        });
      }
    },
    checkValue() {
      const stepDegree = parseInt(this.stepDegree);
      const number = parseInt(this.number);
      const isInRangeDegree =
        !isNaN(stepDegree) && stepDegree > 0 && stepDegree <= 100;
      const isInRangeNumber = !isNaN(number) && number > 0 && number <= 360;
      this.error.number = !isInRangeNumber ? "Out of range" : false;
      this.error.stepDegree = !isInRangeDegree ? "Out of range" : false;
    }
  }
};
</script>

<style scoped lang="scss">
.button {
  margin: auto;
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-size: 2em;
  font-weight: bold;
  text-transform: uppercase;
  &.active {
    cursor: pointer;
  }
}
.error {
  color: red;
}
</style>
