<template>
  <div class="container" id="page-palette-list">
    <div class="inner content">
      <!--header-->
      <HeaderPalettesComponent />
      <!--/header-->

      <!--main-->
      <main class="main main--palettes">
        <PalettesComponent></PalettesComponent>
      </main>
      <!--/main-->

      <!--footer-->
      <Footer :footerClass="'--palettes'" />
      <!--/footer-->
    </div>
  </div>
</template>

<script>
import Footer from "../components/FooterComponent";
import HeaderPalettesComponent from "../components/HeaderPalettesComponent";
import PalettesComponent from "../components/PalettesComponent";

export default {
  name: "Palettes",
  components: {
    Footer,
    HeaderPalettesComponent,
    PalettesComponent
  }
};
</script>

