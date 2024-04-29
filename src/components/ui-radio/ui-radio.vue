<template>
  <div class="radio">
    <input class="radio-input"
           type="radio"
           :name="props.name"
           :id="radioId"
           :value="value"
           :checked="(value === modelValue)"
           @change="emitValue"/>
    <label ref="labelElement"
           class="radio-label"
           :for="radioId"
           :class="{'ellipsis': isLabelTooLong}">
      <slot/>
    </label>
  </div>
</template>

<script setup lang="ts">
import {onMounted, PropType, ref} from "vue";

const emits = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: {
    type: [String, Number] as PropType<number | string>,
    required: true
  },
  name: {
    type: String as PropType<string>,
    required: true
  },
  value: {
    type: [String, Number] as PropType<number | string>,
    required: true
  },
  label: {
    type: String as PropType<string>,
    required: false,
    default: ""
  },
})

const radioId = `radio-${Math.random().toString(16).slice(2)}`
const labelElement = ref<HTMLElement | null>(null)
const isLabelTooLong = ref<boolean>(false)

const emitValue = () => {
  emits("update:modelValue", props.value)
}

onMounted(() => {
  if (labelElement.value && labelElement.value.offsetWidth > 220) {
    labelElement.value.style.width = '220px'
    isLabelTooLong.value = true
  }
})
</script>

<style lang="scss" scoped>
.radio {
  transition: all 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;

  &-input {
    transition: all 0.2s;
    width: 1.4rem;
    height: 1.4rem;
    cursor: pointer;
    position: relative;
    margin: var(--p-1) var(--p);
    visibility: hidden;

    &:checked {
      &:after {
        transform: scale(0.4);
        background-color: var(--c-primary);
      }

      &:before {
        background-color: var(--c-primary-on);
      }
    }

    &:hover {
      &:before {
        background-color: var(--c-grey-100);
      }
    }

    &:focus {
      :before {
        background-color: var(--c-grey-100);
      }
    }

    &:after {
      content: "";
      transition: all 0.2s;
      visibility: visible;
      position: absolute;
      left: 0;
      top: 0;
      width: 1.4rem;
      height: 1.4rem;
      border-radius: 100%;
    }

    &:before {
      content: "";
      transition: all 0.2s;
      visibility: visible;
      position: absolute;
      left: 0;
      top: 0;
      width: 1.4rem;
      height: 1.4rem;
      border-radius: 100%;
      border: 1px solid var(--c-grey-200);
    }
  }

  &-label {
    cursor: pointer;
    padding-left: var(--p);
    width: fit-content;
  }
}
</style>