<template>
  <button class="btn" @click="unfocus"
          :class="action, {outlined: props.variant === 'outlined'}, size">
    <span class="btn-prepend-icon" v-if="props.prependIcon">
      <svg class="icon">
        <use :href="prependIcon.src" :alt="prependIcon.alt"/>
      </svg>
    </span>
    <slot class="btn-text"/>
    <span class="btn-append-icon" v-if="props.appendIcon">
      <svg class="icon">
        <use :href="appendIcon.src" :alt="appendIcon.alt"/>
      </svg>
    </span>
  </button>
</template>

<script setup lang="ts">
import {computed, PropType} from "vue";
import {Action, Icon, Size, Variant} from "@/types/common";
import {useIcon} from "@/types/converters";

const props = defineProps({
  variant: {
    type: String as PropType<Variant>,
    required: false,
    default: 'classic'
  },
  action: {
    type: String as PropType<Action>,
    required: false,
    default: 'action'
  },
  inactive: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false
  },
  appendIcon: {
    type: String as PropType<Icon>,
    required: false
  },
  prependIcon: {
    type: String as PropType<Icon>,
    required: false
  },
  size: {
    type: String as PropType<Size>,
    required: false,
    default: "m"
  }
})

const unfocus = (event: any) => {
  event.target.blur()
}

const appendIcon = computed(() => {
  return useIcon(props.appendIcon!)
})
const prependIcon = computed(() => {
  return useIcon(props.prependIcon!)
})

</script>

<style lang="scss" scoped>
.btn {
  transition: all 0.2s;
  cursor: pointer;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  font-size: var(--fs-text);
  background-color: var(--c-primary);
  border-radius: var(--rad);

  .icon {
    fill: var(--c-font);
  }

  &:hover {
    filter: brightness(1.02);
  }

  &:focus {
    filter: brightness(0.9);
  }

  &:active {
    transform: scale(0.95);
  }

  &-prepend-icon {
    margin-right: var(--p);
  }

  &-append-icon {
    margin-left: var(--p);
  }
}

.outlined {
  background: none;
  border: 1px solid var(--c-secondary);
  color: var(--c-secondary);
  position: relative;

  .icon {
    fill: var(--c-secondary);
  }

  &:hover {
    background-color: var(--c-primary-on);
  }

  &:focus {
    background-color: var(--c-primary-on);
  }
}

.l {
  padding: var(--p-2) var(--p-5);
}

.icon {
  height: 1.25rem;
  width: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

// Dark theme
#app.dark {
  .btn {
    &:hover {
      filter: brightness(0.9);
    }

    &:focus {
      filter: brightness(1.2);
    }
  }
}
</style>