# Transitions-1

В первой постановке задача простая.

```vue
<template>
  <transition name="fade" mode="out-in" v-bind="$attrs" v-on="$listeners">
    <slot />
  </transition>
</template>

<script>
export default {
  name: 'FadeTransition',
  inheritAttrs: false,
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
```

```vue
<template>
  <transition-group
    class="fade-list"
    name="fade-list"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </transition-group>
</template>

<script>
export default {
  name: 'FadeTransitionGroup',
  inheritAttrs: false,
};
</script>

<style>
.fade-list {
  position: relative;
}

.fade-list > * {
  transition: all 0.3s ease-out;
}

.fade-list-leave-active {
  position: absolute !important;
  left: 0;
  right: 0;
}

.fade-list-enter,
.fade-list-leave-to {
  opacity: 0;
}

.fade-list-move {
  transition: transform 0.3s;
}
</style>
```
