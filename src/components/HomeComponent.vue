<template>
  <div class="container">
    <div class="inner inner--index content">
      <!--header-->
      <HeaderComponent />
      <!--/header-->

      <!--main-->
      <main class="main main--index">
        <!--form-->
        <Form></Form>
        <!--/form-->
      </main>
      <!--/main-->

      <!--footer-->
      <Footer :style="'--index'" />
      <!--/footer-->
    </div>
  </div>
</template>

<script>
//todo errors in labels
import Footer from "./FooterComponent";
import Form from "./FormComponent";
import HeaderComponent from "./HeaderComponent";

export default {
  name: "HomeComponent",
  components: {
    Footer,
    Form,
    HeaderComponent
  }
};
</script>

