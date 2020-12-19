<template>
  <div class="palette__description__info">
    <h2>Tetradic</h2>
    <p>
      Description
    </p>
    <div class="row">
      <button
        @click="generatePalette"
        class="button active"
        type="submit"
        :style="buttonColor"
      >
        Generate
      </button>
    </div>
  </div>
</template>

<script>
import { types } from "@/store/mutations";
import { mapGetters } from "vuex";

export default {
  name: "Tetradic",
  data() {
    return {
      type: "tetradic",
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
      const tetradic = this.PaletteObject.tetradic();

      tetradic.forEach((element, index) => {
        element.position = index + 1;
      });

      this.$store.dispatch({
        type: "setTetradicPalette",
        mutation: types.SET_TETRADIC_PALETTE,
        colors: tetradic,
        step: 30
      });

      this.$emit("fill-chart");
    }
  }
};
</script>
