<template>
  <div class="palette__description__info">
    <h2>Split Complementary</h2>
    <p>
      Description
    </p>
  </div>
</template>

<script>
import { types } from "@/store/mutations";

export default {
  name: "splitComplementary",
  data() {
    return {
      type: "splitComplementary",
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
  mounted() {
    this.generatePalette();
  },
  methods: {
    generatePalette() {
      const splitComplementary = this.palette.splitComplementar();
      splitComplementary.unshift(this.$store.state.color);

      splitComplementary.forEach((element, index) => {
        element.position = index + 1;
      });

      this.$store.dispatch({
        type: "setSplitComplementarPalette",
        mutation: types.SET_SPLITCOMPLEMENTAR_PALETTE,
        colors: splitComplementary,
        step: 30
      });

      this.$emit("fill-chart");
    }
  }
};
</script>
