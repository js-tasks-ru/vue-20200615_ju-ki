import Vue from '/vendor/vue.esm.browser.js';

const app = new Vue({
  el: "#app",

  data: {
    buttonNumber: 0
  },

  methods: {
    onclick($event) {
      this.buttonNumber = ++ $event.target.value;
    }
  }
});
