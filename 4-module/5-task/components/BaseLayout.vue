<template>
  <div class="wrapper bg-grey">
    <the-header/>

    <main class="main">
      <div class="page page_onboarding">
        <slot/>
      </div>
    </main>
    <the-footer/>
  </div>
</template>

<script>
import TheFooter from "./TheFooter";
import TheHeader from "./TheHeader";
export default {
  name: 'BaseLayout',
  components: {TheFooter, TheHeader},
};
</script>

<style scoped>
main {
  flex: 1 0 auto;
}

</style>
