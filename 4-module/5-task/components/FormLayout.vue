<template>
  <div class="page page_meetup-forms">
    <h1 class="page__title text-center">{{title}}</h1>
      <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FormLayout',
  props: {
    title: {
      type: String
    }
  }
};
</script>

<style scoped>
.page.page_meetup-forms {
  padding: 70px 0;
}
</style>
