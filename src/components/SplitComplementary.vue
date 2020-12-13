<template>
  <div class="palette__description__info">
    <h2>Split Complementary</h2>
    <p>
      Description
    </p>
    <button
      @click="generatePalette"
      class="button active"
      type="submit"
      :style="buttonColor"
    >
      Generate
    </button>
  </div>
</template>

<script>
import { types } from "@/store/mutations";
import { mapGetters } from "vuex";

export default {
  name: "splitComplementary",
  data() {
    return {
      type: "splitComplementary",
      step: 360
    };
  },
  computed: {
    buttonColor() {
      return { backgroundColor: this.$store.state.color.printHsl() };
    },
    colors() {
      return this.$store.getters.getColors(this.$route.params.type);
    },
    palette() {
      return this.$store.getters.getPalette(this.$route.params.type);
    },
    ...mapGetters(["ColorPaletteObject", "basecolor", "PaletteObject"])
  },
  mounted() {
    if (Object.keys(this.colors).length > 0) {
      this.generatePalette();
    }
  },
  methods: {
    generatePalette() {
      const splitComplementary = this.PaletteObject.splitComplementar();
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
