<template>
  <main>
    <div class="wrapper">
      <div class="column">
        <ui-btn class="btn" append-icon="theme" action="normal" @click="changeTheme"></ui-btn>

        <ui-switch v-model="switchResult" size="s">Value 1</ui-switch>
        <ui-switch v-model="switchResult" size="s" variant="outlined">Value 1</ui-switch>

        <ui-switch v-model="switchResult2" size="m">Value 2</ui-switch>
        <ui-switch v-model="switchResult2" size="m" variant="outlined">Value 2</ui-switch>
      </div>
      <div class="column">
        {{ switchResult }}
        {{ switchResult2 }}
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import UiBtn from "@/components/ui-btn/ui-btn.vue";
import {ref} from "vue";
import UiSwitch from "@/components/ui-switch/ui-switch.vue";

const switchResult = ref<boolean>(false)
const switchResult2 = ref<boolean>(false)

const changeTheme = () => {
  const root = document.getElementById('app')
  if (root?.classList.contains('dark')) {
    root?.classList.remove('dark')
  } else root?.classList.add('dark')

}
</script>

<style scoped>
.btn {
  margin: 1rem 0.5rem;
}

main {
  display: flex;
  flex-direction: column;
  background-color: var(--c-background-color);
  width: 100%;
  height: 100%;
}

.wrapper {
  margin: var(--p-1);
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.column {
  display: flex;
  flex-direction: column;
}
</style>
