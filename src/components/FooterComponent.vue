<template>
  <footer :class="'footer footer--' + footerClass">
    <a href="https://github.com/ChiaraPassaro" tabindex="5" class="github"><i class="fab fa-github"></i> <span
        class="xs-hidden">Github</span></a>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
  props: ['footerClass']
}
</script>

<style scoped>

</style>