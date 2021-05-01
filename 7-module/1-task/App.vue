<template>
  <div id="app">
    <top-progress-bar ref="topProgressBar" />
    <main class="page container">
      <p><button @click="start">Start</button></p>
      <p><button @click="finish">Finish</button></p>
      <p><button @click="fail">Fail</button></p>
    </main>
  </div>
</template>

<script>
import TopProgressBar from './components/TopProgressBar';

export default {
  name: 'App',
  components: { TopProgressBar },

  methods: {
    start() {
      this.$refs['topProgressBar'].start();
    },

    finish() {
      this.$refs['topProgressBar'].finish();
    },

    fail() {
      this.$refs['topProgressBar'].fail();
    },
  },
};
</script>

<style>
p {
  margin: 1rem auto;
}
</style>
