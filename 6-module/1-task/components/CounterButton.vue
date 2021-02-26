<template>
  <div>
    <button @click="increment" type="button">{{ count_ }}</button>
  </div>
</template>

<script>
export default {

  props: {
    count: {
      default: 0,
      type: Number
    }
  },

  data() {
    return {
      count_: this.count
    }
  },

  watch: {
    count: {
      handler(newValue) {
        this.count_ = newValue
      },
      immediate: true
    }
  },

  model: {
    prop: 'count',
    event: 'increment'
  },

  methods: {
    increment() {
      this.$emit('increment', ++this.count_);
    }
  }

};
</script>

<style></style>
