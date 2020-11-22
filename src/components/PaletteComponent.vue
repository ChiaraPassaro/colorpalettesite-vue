<template>
  <div
    :id="id"
    :class="[
      'palette palette--not-active del-' + (index + 1),
      active ? 'not-transform' : ''
    ]"
    @click="!active && endedAnimation ? generatePalette(id) : false"
  >
    <div class="palette__content" :style="setBackground">
      <h2>
        <span>{{ name }}</span>
      </h2>
      <ul class="palette__number-color">
        <li
          v-for="(color, index) in colors"
          :key="index"
          :class="'color ' + color.degree"
        >
          <span class="circle" title="color"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { types } from "@/store/mutations";

export default {
  name: "PaletteComponent",
  props: ["colors", "index", "id", "name", "active", "endedAnimation"],
  computed: {
    setBackground() {
      return { backgroundColor: this.$store.state.cssColor };
    }
  },
  methods: {
    generatePalette(id) {
      const palettes = new this.$store.state.ColorPalettesRange.SetColorPalette(
        this.$store.state.color
      );

      this.$store
        .dispatch({
          type: "generatePalettes",
          mutation: types.GENERATE_PALETTES,
          palettes
        })
        .then(() => {
          if (this.$store.state.palettes[id]) {
            console.log(!!this.$store.state.palettes[id].colors);
            this.$store.dispatch({
              type: "setOpenPalette",
              mutation: types.SET_OPEN_PALETTE,
              open: !!this.$store.state.palettes[id].colors
            });

            this.$store.dispatch({
              type: "setNumberStartSquareColors",
              mutation: types.SET_NUMBER_START_SQUARE_COLORS,
              numberStartSquareColors: 0
            });

            this.$store.dispatch({
              type: "setOpenPalette",
              mutation: types.SET_OPEN_PALETTE,
              open: false
            });

            //TODO add emit per chiudere slider

            this.$router.push({
              name: "Palette",
              params: {
                type: id
              }
            });
          } else {
            this.$router.push({
              name: "NotFound"
            });
          }
        });
    }
  }
};
</script>

<style scoped></style>
