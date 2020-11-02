<template>

  <div
      :class="['palette__description__list-colors', isPaletteGenerated, isPaletteOpen]"
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
    <div aria-hidden="true" class="arrow arrow--list-colors-left" @click="setClose">
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
      close: false
    }
  },
  computed: {
    generatedColors() {
      return this.$store.state.palettes[this.type].colors;
    },
    isPaletteGenerated() {
      return (this.$store.state.palettes[this.type].colors && this.$store.state.palettes[this.type].colors.length > 0) ?  'palette__description__list-colors--active' : ''
    },
    isPaletteOpen() {
      return (this.open) ?  'palette__description__list-colors--open' : ''
    },
    isPaletteClose() {
      return (this.close) ?  'palette__description__list-colors--close' : ''
    }
  },
  methods: {
    copyColor(color) {
      // const color = this.$store.state.palettes[this.type].colors[index];
      console.log(color.printHsl());
    },
    setOpen() {
      this.open = true;
      this.close = false;
    },
    setClose() {
      this.open = false;
      this.close = true;
    }
  }
}
</script>

<style scoped>

</style>