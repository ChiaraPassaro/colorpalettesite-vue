<template>
  <div
    :id="id"
    :class="[
      'palette palette--not-active del-' + (index + 1),
      active ? 'not-transform' : ''
    ]"
    @click="!active ? generatePalette(id) : false"
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
  props: ["colors", "index", "id", "name", "active"],
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
          this.$router.push({
            name: "Palette",
            params: {
              type: id
            }
          });
        });
    }
  }
};
</script>

<style scoped></style>
