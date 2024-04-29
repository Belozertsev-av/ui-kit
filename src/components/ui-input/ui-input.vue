<template>
  <div class="input" :class="size, { outlined: props.variant === 'outlined' }">
    <label class="input-label"
           :for="inputId"
           :class="{ 'ellipsis' : isLabelTooLong }"
           ref="labelElement">
      {{ props.label }}
    </label>
    <input class="input-body"
           type="text"
           :id="inputId"
           ref="inputElement"
           :value="value"
           @input="emitValue"/>
    <transition name="fade">
      <div class="input-cross" @click="clearValue" v-if="props.clearable && value !== ''">
        <div class="input-cross-body"></div>
      </div>
    </transition>
    <transition name="fade-options">
      <div class="input-options" ref="inputOptions" v-if="isOpenedOptionList && props.options">
        <ul class="input-options-list">
          <li class="input-option ellipsis"
              v-for="(option, index) in filteredOptions"
              :key="Math.floor(index * Math.random()*99)"
              @click="checkOption(option)"> {{ option }}
          </li>
        </ul>
      </div>
    </transition>

  </div>

</template>

<script setup lang="ts">
import {computed, onMounted, PropType, ref, watch} from "vue";
import {Size, Variant} from "@/types/common";

const emits = defineEmits(["update:modelValue"])
const props = defineProps({
  label: {
    type: String as PropType<string>,
    required: true
  },
  modelValue: {
    type: String as PropType<string | null>,
    required: true,
  },
  variant: {
    type: String as PropType<Variant>,
    required: false,
    default: 'classic'
  },
  clearable: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false
  },
  options: {
    type: Array as PropType<string[]>,
    required: false
  },
  size: {
    type: String as PropType<Size>,
    required: false,
    default: "m"
  }
})
const inputElement = ref<HTMLElement | null>(null)
const labelElement = ref<HTMLElement | null>(null)
const isOpenedOptionList = ref<boolean>(false)
const isLabelTooLong = ref<boolean>(false)


const inputId = `input-${Math.random().toString(16).slice(2)}`
const filteredOptions = ref<string[]>([])

const emitValue = (event: Event) => {
  const targetInput = (event.target as HTMLInputElement)
  emits("update:modelValue", targetInput.value)
}

const clearValue = () => {
  emits("update:modelValue", "")
  inputElement.value?.focus()
  isOpenedOptionList.value = false
}

const checkOption = (option: string) => {
  if (option !== "None") {
    emits("update:modelValue", option)
    inputElement.value?.focus()
  }
}

const value = computed((): string => {
  return props.modelValue!
})

watch(value, (value) => {
  if (value !== "") {
    isOpenedOptionList.value = true
    filteredOptions.value = (props.options?.find(it => it.toLowerCase().includes(value.toLowerCase())))
        ? props.options?.filter(it => it.toLowerCase().includes(value.toLowerCase()))
        : ["None"]
  } else {
    isOpenedOptionList.value = false
  }
  if (filteredOptions.value.find(it => value === it)) isOpenedOptionList.value = false
})

onMounted(() => {
  if (labelElement.value && labelElement.value.offsetWidth > 220) {
    labelElement.value.style.width = '220px'
    isLabelTooLong.value = true
  }
})
</script>

<style lang="scss" scoped>
.input {
  transition: all 0.2s;
  position: relative;
  display: flex;
  height: fit-content;
  background-color: var(--c-grey-100);
  border-radius: var(--rad);
  min-width: 250px;

  &:focus-within {
    background-color: var(--c-grey-200);
  }

  &-label {
    cursor: pointer;
    position: absolute;
    top: -0.4rem;
    font-size: var(--fs-label);
    left: 1rem;
  }

  &-body {
    z-index: 1;
    background: none;
    color: var(--c-font);
    width: 100%;
  }

  &-cross {
    transition: all 0.2s;
    cursor: pointer;
    position: relative;
    margin-left: var(--p);
    width: 1.2rem;
    height: 1.2rem;

    &-body {
      position: absolute;
      transform: rotate(45deg);
      top: 0;
      right: 50%;
      background-color: var(--c-font);
      width: 1px;
      height: 1.2rem;

      &:before {
        content: "";
        position: absolute;
        transform: rotate(90deg);
        top: 0;
        left: 0;
        background-color: var(--c-font);
        width: 1px;
        height: 1.2rem;
      }
    }

    &:hover {
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.9);
    }
  }

  &-options {
    position: absolute;
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 12rem;
    top: calc(100% + var(--p));
    left: 0;
    width: 100%;
    height: fit-content;
    border: 1px solid var(--c-grey-100);
    background-color: var(--c-background-color);
    border-radius: var(--rad);
    padding: var(--p);
    z-index: 2;
  }

  &-option {
    cursor: pointer;
    padding: var(--p-1) var(--p-1);
    width: 100%;

    &:hover {
      background-color: var(--c-grey-100);
    }
  }
}

.outlined {
  background: none;
  border: 1px solid var(--c-secondary);

  &:focus-within {
    background-color: var(--c-primary-on);
  }

  .input {

    &-label {
      color: var(--c-secondary);
      background-color: var(--c-background-color);
      padding: 0 0.1rem;
    }

    &-label {
      top: -0.5rem;
    }

    &-cross {
      &-body {
        background-color: var(--c-secondary);

        &:before {
          background-color: var(--c-secondary);
        }
      }
    }

    &-options {
      border: 1px solid var(--c-secondary);
    }
  }
}

.l {
  padding: var(--p-2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-options-enter-active,
.fade-options-leave-active {
  transition: all 0.4s ease;
}

.fade-options-enter-from,
.fade-options-leave-to {
  opacity: 0;
  margin-top: var(--p-1);
}
</style>