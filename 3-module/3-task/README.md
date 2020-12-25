# AppToast

## Хранение тостов

Первое, что требуется сделать -- добавить компоненту свойство, например, `toasts`, в котором будет храниться список текущих тостов.

Именно этот список будет определять состояние компонента и будет выводиться в шаблоне.

Остаётся вопрос, что именно хранить. 

## Стиль и иконки

Для добавления стилей и иконок можно создать `computed` со словарями, хранить их прямо в списке тостов, или создать `computed`, который вернёт список тостов с необходимыми вспомогательными полями.

В данном случае совсем не важно, какое будет выбрано решение.  
 
## Методы success, error

Осталось только реализовать собственно методы добавления тостов. Эти методы довольно простые. Требуется просто добавить новый тост в список тостов. 

Тут же можно используя `setTimeout` установить таймер на удаление этого тоста через 5 секунд.

## key списка тостов

Мы пока плохо знаем, что делает `key`. Но, если вы читали Style Guide, или используете линтер (возможно, встроенные в вашу среду разработки), то могли видеть ошибки об отсутствии `key` на элементе с директивой `v-for`.

Нет какого-либо естественного идентификатора у тоста. Можно создать случайный, либо использовать, например, идентификатор его таймера.

## Решение

```vue
<template>
  <div class="toasts">
    <div
      v-for="toast in styledToasts"
      :key="toast.id"
      class="toast"
      :class="toast.class"
    >
      <app-icon :icon="toast.icon" />
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

const DELAY = 5000;

export default {
  name: 'AppToast',

  components: { AppIcon },

  data() {
    return {
      toasts: [],
    };
  },

  computed: {
    styledToasts() {
      const icons = {
        success: 'check-circle',
        error: 'alert-circle',
      };

      const classes = {
        success: 'toast_success',
        error: 'toast_error',
      };

      return this.toasts.map((toast) => ({
        ...toast,
        icon: icons[toast.style],
        class: classes[toast.style],
      }));
    },
  },

  methods: {
    error(message) {
      this.show('error', message);
    },

    success(message) {
      this.show('success', message);
    },

    show(style, message) {
      const toast = { style, message };

      toast.id = setTimeout(() => {
        this.toasts.splice(this.toasts.indexOf(toast), 1);
      }, DELAY);

      this.toasts.push(toast);
    },
  },
};
</script>

<style scoped></style>
```
