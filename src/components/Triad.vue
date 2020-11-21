<template>
  <div class="palette__description__info">
    <h2>Triadic</h2>
    <p>
      Description
    </p>
    <form
      @submit.prevent="generatePalette"
      id="palette__description__form"
      action=""
    >
      <div class="row">
        <button type="submit" class="button active" :style="buttonColor">
          Generate
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { types } from "@/store/mutations";

export default {
  name: "Triad",
  data() {
    return {
      type: "triad",
      colors: this.$store.state.palettes[this.type]
        ? this.$store.state.palettes[this.type].colors
        : [],
      step: 360,
      palette: this.$store.state.palettes.palette
    };
  },
  computed: {
    buttonColor() {
      return { backgroundColor: this.$store.state.color.printHsl() };
    }
  },
  methods: {
    generatePalette() {
      const triad = this.palette.triad();
      triad.unshift(this.$store.state.color);

      triad.forEach((element, index) => {
        element.position = index + 1;
      });

      this.$store.dispatch({
        type: "setTriadPalette",
        mutation: types.SET_TRIAD_PALETTE,
        colors: triad,
        step: 30
      });

      this.$emit("fill-chart");
    }
  }
};
</script>
