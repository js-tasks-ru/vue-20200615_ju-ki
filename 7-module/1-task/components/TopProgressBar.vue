<template>
  <div class="progress"
    :class="{
      show,
      failed,
    }"
    :style="{
      width: currentProgress + '%',
    }"></div>
</template>

<script>
const MAX_PROGRESS = 95;
const K = 0.975;
const STEP_DURATION = 200;
const HIDE_DURATION = 200;

let interval = null;

export default {
  name: 'TopProgressBar',

  data() {
    return {
      currentProgress: 0,
      show: false,
      failed: false,
    };
  },

  methods: {
    start() {
      this.currentProgress = 0;
      this.show = true;
      this.failed = false;
      if (interval) {
        clearInterval(interval);
      }
      this.currentProgress = 0;
      interval = setInterval(() => {
        this.currentProgress =
          MAX_PROGRESS - (MAX_PROGRESS - this.currentProgress) * K;
      }, STEP_DURATION);
    },

    async finish() {
      clearInterval(interval);
      interval = null;
      this.currentProgress = 100;
      setTimeout(() => {
        this.show = 0;
        setTimeout(() => {
          this.currentProgress = 0;
        }, HIDE_DURATION + 100);
      }, STEP_DURATION + 200);
    },

    fail() {
      this.failed = true;
      this.finish();
    },
  },
};


</script>

<style scoped>
.progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  width: 0px;
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
