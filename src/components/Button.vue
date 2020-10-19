<template>
  <button
    type="button"
    class="button"
    v-bind:class="buttonClasses"
    @click="onClick()"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Button',
    props: {
        content: {},
        className: {
            type: String,
            default: '',
        },
        outlined: {
            type: Boolean,
            default: false,
        },
        primary: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        buttonClasses(): (string | {[key: string]: boolean})[] {
            return [
                this.className,
                {
                    primary: this.primary,
                    outlined: this.outlined,
                },
            ];
        },
    },
    methods: {
        onClick() {
            this.$emit('on-click');
        },
    },
});
</script>

<style lang="scss" scoped>
.button {
  background-color: inherit;
  color: inherit;
  border-radius: 2px;
  padding: 10px;
  font-weight: bold;

  &.primary {
      background-color: var(--primary);
      border: 1px solid var(--primary);
      color: white;

      &.outlined {
          background-color: unset;
          color: var(--primary);
      }
  }

  &.secondary {
      background-color: var(--secondary);
      border: 1px solid var(--secondary);
      color: white;

      &.outlined {
          background-color: unset;
          color: var(--secondary);
      }
  }
}
</style>
