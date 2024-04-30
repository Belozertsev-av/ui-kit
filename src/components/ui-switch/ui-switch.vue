<template>
  <div class="switch" :class="{outlined: props.variant === 'outlined'}">
    <button class="switch-body"
            :class="props.size"
            :id="switchId"
            @click="emitValue"
            ref="switchElement"
            tabindex="0">
      <span class="switch-track">
        <span class="switch-thumb"></span>
      </span>
      <label class="switch-label"
             :for="switchId"
             :class="{'ellipsis' : isLabelTooLong }"
             ref="labelElement">
        <slot/>
      </label>
    </button>
  </div>
</template>

<script setup lang="ts">
import {onMounted, PropType, ref} from "vue";
import {Variant} from "@/types/common";

const emits = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: {
    type: Boolean as PropType<boolean>,
    required: true,
    default: false
  },
  size: {
    type: String as PropType<"m" | "s">,
    required: false,
    default: "m"
  },
  variant: {
    type: String as PropType<Variant>,
    required: false,
    default: "default"
  }
})

const switchId = `switch-${Math.random().toString(16).slice(2)}`
const switchElement = ref<HTMLElement | null>(null)
const labelElement = ref<HTMLElement | null>(null)
const isLabelTooLong = ref<boolean>(false)
const isChecked = ref<boolean>(props.modelValue)

const emitValue = () => {
  isChecked.value = !isChecked.value
  console.log(isChecked.value)
  switchElement.value?.classList.toggle("checked")
  emits("update:modelValue", isChecked.value)
}

onMounted(() => {
  if (labelElement.value && labelElement.value.offsetWidth > 220) {
    labelElement.value.style.width = '220px'
    isLabelTooLong.value = true
  }
})
</script>

<style lang="scss" scoped>
.switch {
  &-body {
    display: flex;
    align-items: center;
    background: none;
    margin: var(--p);

    &:focus {
      .switch-track {
        filter: brightness(0.97);
      }
    }
  }

  &-track {
    position: relative;
    transition: all 0.2s;
    background-color: var(--c-grey-200);
    border-radius: var(--rad);
  }

  &-thumb {
    position: absolute;
    transition: all 0.2s;
    top: 0;
    left: 0;
    transform: scale(0.7);
    background-color: var(--c-background-color);
    border-radius: var(--rad);
  }

  &-label {
    padding-left: var(--p-1);
    color: var(--c-font);
  }
}

.checked {

  &.s {
    .switch {
      &-thumb {
        left: 1rem;
      }
    }
  }

  &.m {
    .switch {
      &-thumb {
        left: 1.5rem;
      }
    }
  }

  .switch {
    &-track {
      background-color: var(--c-primary);
    }

    &-thumb {
      left: 2rem;
    }
  }
}

.s {
  padding: 0;

  .switch {
    &-track {
      height: 1.5rem;
      width: 2.5rem;
    }

    &-thumb {
      height: 1.5rem;
      width: 1.5rem;
    }
  }
}

.m {
  padding: 0;

  .switch {
    &-track {
      height: 2rem;
      width: 3.5rem;
    }

    &-thumb {
      height: 2rem;
      width: 2rem;
    }
  }
}

.outlined {
  .switch {
    display: flex;

    &-body {
      &:focus {
        .switch {
          &-track {
            background-color: #fefefe70;
          }
        }
      }
    }

    &-track {
      background: none;
      border: 1px solid var(--c-grey-200);
      border-radius: var(--rad);
    }

    &-thumb {
      top: -1px;
      background-color: var(--c-grey-200);
      border-radius: var(--rad);
    }

    &-label {
      color: var(--c-font);
    }
  }

  .switch-body.checked {

    &:focus {
      .switch {
        &-track {
          filter: none;
          background-color: var(--c-primary-on);
        }
      }
    }

    .switch {
      display: flex;

      &-track {
        background: none;
        border: 1px solid var(--c-secondary);
        border-radius: var(--rad);
      }

      &-thumb {
        background-color: var(--c-primary);
        border-radius: var(--rad);
      }
    }
  }
}

#app.dark {
  .switch {
    &-body {
      &:focus {
        .switch-track {
          filter: brightness(1.3);
        }
      }
    }
  }

  .outlined {
    .switch {
      &-body {
        &:focus {
          .switch {
            &-track {
              background-color: #fefefe10;
            }
          }
        }
      }
    }
  }
}
</style>