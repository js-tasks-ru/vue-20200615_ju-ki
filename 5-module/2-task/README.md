# Buttons

Требуется разработать три компонента: `BaseButton`, `PrimaryButton`, `SecondaryButton`.

Основной компонент - `BaseButton`.

Кнопка может быть с разным HTML элементом в зависимости от тега. Эта функциональность легко реализуется за счёт динамического компонента.

```vue
<component :is="tag"><slot /></component>
```

У параметра `tag` должен быть валидатор:
```javascript
tag: {
  type: String,
  default: 'button',
  validator: (tag) => ['button', 'a', 'router-link'].includes(tag)
}
```

Чтобы на кнопке работали нативные события без модификатора `native`, требуется установить ей все переданные обработчики на все события.

```vue
<component :is="tag" v-on="$listeners"><slot /></component>
```

Обратите внимание, что все атрибуты будут передаваться на кнопку без дополнительных манипуляций с `inheritAttrs` или `v-bind="$attrs"`.

Компонент `PrimaryButton` реализуется как простейшая `TransparentWrapper` обёртка над `BaseButton`.

В этот раз придётся передать все аттрибуты самостоятельно, так как иначе не будут передаваться параметры (props). В отличие от html аттрибутов, они не наследуются корневым элементом и не будут переданы в `BaseButton`.

```vue
<template>
  <base-button v-bind="$attrs" v-on="$listeners" class="button_primary">
    <slot />
  </base-button>
</template>

<script>
import BaseButton from './BaseButton';

export default {
  name: 'PrimaryButton',
  inheritAttrs: false,

  components: { BaseButton },
};
</script>
``` 

Компонент `SecondaryButton` полностью аналогичен компоненту `PrimaryButton`.
