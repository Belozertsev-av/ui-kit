<template>
  <div class="checkbox">
    <input class="checkbox-input"
           type="checkbox"
           :name="props.name"
           :id="checkboxId"
           :checked="props.modelValue"
           @change="emitValue"/>
    <label ref="checkboxElement"
           class="checkbox-label"
           :for="checkboxId"
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
    type: Boolean as PropType<boolean>,
    required: true,
    default: false
  },
  name: {
    type: String as PropType<string>,
    required: true
  },
  label: {
    type: String as PropType<string>,
    required: false,
    default: ""
  },
})

const checkboxId = `checkbox-${Math.random().toString(16).slice(2)}`
const checkboxElement = ref<HTMLElement | null>(null)
const isLabelTooLong = ref<boolean>(false)
const isChecked = ref<boolean>(props.modelValue)

const emitValue = () => {
  isChecked.value = !isChecked.value
  emits("update:modelValue", isChecked.value)
}

onMounted(() => {
  if (checkboxElement.value && checkboxElement.value.offsetWidth > 220) {
    checkboxElement.value.style.width = '220px'
    isLabelTooLong.value = true
  }
})
</script>

<style lang="scss" scoped>
.checkbox {
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
      border-radius: calc(var(--rad) / 1.5);
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
      border-radius: calc(var(--rad) / 1.5);
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