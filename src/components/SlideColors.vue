<template>

  <div
      :class="['palette__description__list-colors', isPaletteOpen, isPaletteTotalOpen]"
  >
    <div aria-hidden="true" class="arrow arrow--list-colors" @click="setOpen">
      <div class="arrow__inner"></div>
    </div>
    <div class="palette__description__list-colors__actions">
      <p>Click on square and copy hsl code <br>
        or <br>
        <button>Get your list colors</button>
      </p>
    </div>
    <!--TODO devono rimanere quadrati, aggiungere slide e si deve aprire solo quando sono generati i colori-->
    <ul class="colors-square">
      <li class="colors-square__item" v-for="(color, index) in generatedColors" v-bind:key="color+index" :style="{ backgroundColor: color.printHsl() }">
        <span @click="copyColor(color)">{{ color.printHsl() }}</span>
      </li>
    </ul>
    <div aria-hidden="true" class="arrow arrow--list-colors-left" @click="setOpen">
      <div class="arrow__inner"></div>
    </div>
  </div>

</template>

<script>
export default {
  name: "SlideColors",
  props: ['type'],
  data() {
    return {
      open: false,
    }
  },
  computed: {
    generatedColors() {
      return this.$store.state.palettes[this.type].colors;
    },
    isPaletteOpen() {
      return this.$store.state.palettes.open
        ? "palette__description__list-colors--active"
        : "";
    },
    isPaletteTotalOpen() {
      return (this.open) ?  'palette__description__list-colors--open' : ''
    }
  },
  methods: {
    copyColor(color) {
      // const color = this.$store.state.palettes[this.type].colors[index];
      console.log(color.printHsl());
    },
    setOpen() {
      this.open = !this.open;
    }
  }
}
</script>

<style scoped>

</style>