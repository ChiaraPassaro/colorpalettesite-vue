<template>
  <div class="feedback">
    {{ feedback.message }}
  </div>
</template>

<script>
//TODO fade out
export default {
  name: "FeedbackComponent.vue",
  data() {
    return {
      feedback: {
        status: this.$store.state.feedback.status,
        message: this.$store.state.feedback.message
      }
    };
  }
};
</script>

<style scoped lang="scss">
@import "../scss/partials/_mixin.scss";

.feedback {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  opacity: 0;
  background: yellow;
  width: 30%;
  height: 30%;
  @include animationFadeIn(feedbackAnimation, 0, 1);
}
</style>
