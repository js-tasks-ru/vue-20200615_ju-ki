<template>
  <div class="wrapper bg-grey">
    <the-header/>
    <main class="main">
        <slot/>
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
