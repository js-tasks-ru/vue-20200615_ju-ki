<template>
  <transition name="fade" mode="out-in">
    <slot v-bind="$attrs"
          v-on="listeners"></slot>
  </transition>
</template>

<script>
export default {
  name: 'FadeTransition',
  inheritAttrs: false,

  computed: {
    listeners() {
      return {
        ...this.$listeners()
      }
    }
  }
};
</script>

<style>

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease-in-out;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }


</style>
