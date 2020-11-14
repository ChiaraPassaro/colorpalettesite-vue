<template>
  <div class="feedback">
    {{ feedback.message }}
  </div>
</template>

<script>
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
  transform: translate(-50%, -90%);
  z-index: 4;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 2px solid darken(orange, 10);
  border-radius: 10px;
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5));
  background: orange;
  @include animationFadeInAndOut(feedbackAnimation, 0, 1);
}
</style>
