<template>
  <div class="container">
    <div class="inner inner--index content">
      <!--header-->
      <HeaderComponent/>
      <!--/header-->

      <!--main-->
      <main class="main main--index">
        <!--form-->
        <Form></Form>
        <!--/form-->
      </main>
      <!--/main-->

      <!--footer-->
      <Footer :footerClass="'--index'"/>
      <!--/footer-->

    </div>
  </div>

</template>

<script>
//todo errors in labels
import Footer from '../components/FooterComponent';
import Form from '../components/FormComponent';
import HeaderComponent from '../components/HeaderComponent';

export default {
  name: "Home",
  components: {
    Footer,
    Form,
    HeaderComponent
  },

};
</script>

