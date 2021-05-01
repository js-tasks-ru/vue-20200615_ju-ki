<template>
  <div class="progress"></div>
</template>

<script>
const MAX_PROGRESS = 95;
const K = 0.975;
const STEP_DURATION = 200;
const HIDE_DURATION = 200;

export default {
  name: 'TopProgressBar',
};
</script>

<style scoped>
.progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  width: 0;
  opacity: 0;
  transition: opacity 0.2s linear;
  background-color: #4c6bb6;
  z-index: 999999;
}

.progress.show {
  opacity: 1;
  transition: width 0.2s linear;
}

.progress.failed {
  background-color: #db3851;
}
</style>
