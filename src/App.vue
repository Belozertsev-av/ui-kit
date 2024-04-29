<template>
  <main>
    <div class="wrapper">
      <div class="column">
        <ui-btn class="btn" append-icon="theme" action="normal" @click="changeTheme"></ui-btn>

        <ui-radio name="groupA" :value="1" v-model="radioResult">Value 1</ui-radio>
        <ui-radio name="groupA" :value="2" v-model="radioResult">Value 2</ui-radio>
        <ui-radio name="groupA" :value="3" v-model="radioResult">Value 3</ui-radio>

      </div>
      <div class="column">
        <ui-checkbox name="znach1" v-model="groubCHB1"> Value 1</ui-checkbox>
        <ui-checkbox name="znach2" v-model="groubCHB2"> Value 2</ui-checkbox>
        <ui-checkbox name="znach3" v-model="groubCHB3"> Value 3</ui-checkbox>
      </div>
      <div>
        {{ radioResult }}
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import UiBtn from "@/components/ui-btn/ui-btn.vue";
import {ref} from "vue";
import UiRadio from "@/components/ui-radio/ui-radio.vue";
import UiCheckbox from "@/components/ui-checkbox/ui-checkbox.vue";

const radioResult = ref<number>(0)

const groubCHB1 = ref<boolean>(true)
const groubCHB2 = ref<boolean>(false)
const groubCHB3 = ref<boolean>(false)
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

.row {
  display: flex;
  flex-direction: row;
}
</style>
