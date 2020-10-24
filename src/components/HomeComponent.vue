<template>
  <div class="container">
    <div class="inner inner--index content">
      <!--header-->
      <header class="header header--index">
        <section>
          <h1 class="header__title">Color <span>Palettes Range</span></h1>
          <h2 class="header__sub-title">A Javascript library for generate palette schemes on a base color.</h2>
        </section>
      </header>
      <!--/header-->

      <!--main-->
      <main class="main main--index">
        <!--form-->
        <Form></Form>
        <!--/form-->
      </main>
      <!--/main-->

      <!--footer-->
      <Footer/>
      <!--/footer-->

    </div>
  </div>

</template>

<script>
//todo errors in labels
import Footer from './FooterComponent';
import Form from './FormComponent';

export default {
  name: "HomeComponent",
  components: {
    Footer,
    Form
  },

};
</script>

