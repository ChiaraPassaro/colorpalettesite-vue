<template>
  <div class="container" id="page-palette">
    <div class="inner content">
      <!--feedback-->
      <FeedbackComponent v-if="$store.state.feedback.status" />
      <!--/feedback-->

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
import FeedbackComponent from "@/components/FeedbackComponent";
import HeaderPalettesComponent from "@/components/HeaderPalettesComponent";
import Footer from "@/components/FooterComponent";
import { types } from "@/store/mutations";

export default {
  name: "SinglePalette.vue",
  components: {
    FeedbackComponent,
    random,
    HeaderPalettesComponent,
    Footer
  },
  data() {
    return {
      component: this.$route.params.type
    };
  },
  beforeMount() {
    this.$store.dispatch({
      type: "setOpenPalette",
      mutation: types.SET_OPEN_PALETTE,
      open: false
    });
  }
};
</script>
