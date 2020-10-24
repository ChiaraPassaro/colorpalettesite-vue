<template>
  <div class="wheel" :style="wheel"></div>
</template>

<script>

export default {
  name: "Wheel",
  computed: {
    wheel() {
      console.log(this.$store.state);
      return {background: `conic-gradient(${this.$store.state.ColorPalettesRange.HslConvert(360, this.$store.state.saturation, this.$store.state.brightness).getRgb().printRgb()}, ${this.$store.state.ColorPalettesRange.HslConvert(60, this.$store.state.saturation, this.$store.state.brightness).getRgb().printRgb()}, ${this.$store.state.ColorPalettesRange.HslConvert(120, this.$store.state.saturation, this.$store.state.brightness).getRgb().printRgb()}, ${this.$store.state.ColorPalettesRange.HslConvert(180, this.$store.state.saturation, this.$store.state.brightness).getRgb().printRgb()}, ${this.$store.state.ColorPalettesRange.HslConvert(240, this.$store.state.saturation, this.$store.state.brightness).getRgb().printRgb()}, ${this.$store.state.ColorPalettesRange.HslConvert(300, this.$store.state.saturation, this.$store.state.brightness).getRgb().printRgb()}, ${this.$store.state.ColorPalettesRange.HslConvert(360, this.$store.state.saturation, this.$store.state.brightness).getRgb().printRgb()})`}
    }
  }
}
</script>

<style scoped lang="scss">
.wheel {
  width: 420px;
  height: 420px;
  flex-shrink: 0;
  border-radius: 50%;
  clip-path: polygon(0% 0%, 0% 100%, 25.0% 100%, 25.0% 50.0%, 25.0% 50.0%, 25.2% 46.9%, 25.8% 43.8%, 26.8% 40.8%, 28.1% 38.0%, 29.8% 35.3%, 31.8% 32.9%, 34.1% 30.7%, 36.6% 28.9%, 39.4% 27.4%, 42.3% 26.2%, 45.3% 25.4%, 48.4% 25.0%, 51.6% 25.0%, 54.7% 25.4%, 57.7% 26.2%, 60.6% 27.4%, 63.4% 28.9%, 65.9% 30.7%, 68.2% 32.9%, 70.2% 35.3%, 71.9% 38.0%, 73.2% 40.8%, 74.2% 43.8%, 74.8% 46.9%, 75.0% 50.0%, 74.8% 53.1%, 74.2% 56.2%, 73.2% 59.2%, 71.9% 62.0%, 70.2% 64.7%, 68.2% 67.1%, 65.9% 69.3%, 63.4% 71.1%, 60.6% 72.6%, 57.7% 73.8%, 54.7% 74.6%, 51.6% 75.0%, 48.4% 75.0%, 45.3% 74.6%, 42.3% 73.8%, 39.4% 72.6%, 36.6% 71.1%, 34.1% 69.3%, 31.8% 67.1%, 29.8% 64.7%, 28.1% 62.0%, 26.8% 59.2%, 25.8% 56.2%, 25.2% 53.1%, 25.0% 50.0%, 25.0% 100%, 100% 100%, 100% 0%);
}
</style>