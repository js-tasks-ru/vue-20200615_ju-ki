<template>

    <component
      class="button"
      :class="{
            'button_block': block
            }"
      v-bind="$attrs"
      v-on="$listeners"
      :is="tag">
      <slot/>
    </component>


</template>

<script>

export default {
  name: 'BaseButton',
  inheritAttrs: false,
  props: {
    block: Boolean,
    tag: {
      type: String,
      default: 'button',
      validator: function (value) {
        return ['a', 'button', 'router-link'].includes(value)
      }
    }
  },

  data() {
    return {
    }
  },

  computed: {
    computeComponent() {
      if (this.tag === 'a') {
        return '<a>'
      } else {
        return '<button>'
      }
    }
  }
};
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 10px 24px;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  border: 4px solid transparent;
  transition: 0.2s all;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
}

.button.button_block {
  display: block;
  width: 100%;
}
</style>
