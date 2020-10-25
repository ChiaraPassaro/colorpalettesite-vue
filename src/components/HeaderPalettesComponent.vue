<template>
  <header class="header header--palettes" :style="setBackground">
    <div aria-hidden="true" class="arrow  arrow--header">
      <div class="arrow__inner"></div>
    </div>
    <section>
      <h1 class="header__title"><span class="header__title__title">YOUR BASE COLOR:</span>
        <span class="header__title__picker"><a @click="goHome" title="Change Color"><i class="fas fa-eye-dropper"></i></a></span>
        <span class="header__title__color">hsl {{degree}} {{saturation}}% {{brightness}}%</span>
      </h1>
    </section>
  </header>
</template>

<script>
export default {
  name: "HeaderIndexComponent",
  data() {
    return {
      degree: this.$store.state.degree,
      saturation: this.$store.state.saturation,
      brightness: this.$store.state.brightness
    }
  },
  computed: {
    setBackground() {
      return {backgroundColor: this.$store.state.cssColor}
    }
  },
  methods: {
    goHome() {
      this.$router.push({ name: 'Home'})
    }
  }
}
</script>

<style scoped>
  a {
    cursor: pointer;
  }
</style>