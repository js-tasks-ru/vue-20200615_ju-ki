export const CounterButton = {
  // Шаблон потребуется отредактировать
  template: '<button @click="onclick()" type="button">{{count}}</button>',

  name: 'CounterButton',

  props: {
    count: Number
  },

  data() {
    return {
      localCount: 0
    }
  },

  // mounted() {
  //   this.localCount = this.count
  //   if (this.count === undefined) {
  //     this.localCount = 0;
  //   }
  // },

  methods: {
    onclick() {
      this.localCount = this.count + 1;
      this.$emit('increment', this.localCount);
    }
  }


};
