<template>
  <div class="container" id="page-palette">
    <div class="inner content">
      <!--header-->
      <HeaderPalettesComponent />
      <!--/header-->

      <!--main-->
      <component v-bind:is="component"></component>
      <!--/main-->

      <!--footer-->
      <Footer :footerClass="'--palettes'" />
      <!--/footer-->
    </div>
  </div>
</template>

<script>
import random from "@/components/Random";
import HeaderPalettesComponent from "@/components/HeaderPalettesComponent";
import Footer from "@/components/FooterComponent";

export default {
  name: "SinglePalette.vue",
  components: {
    random,
    HeaderPalettesComponent,
    Footer
  },
  data() {
    return {
      component: this.$route.params.type,
    }
  },

}
</script>

<style scoped>

</style>