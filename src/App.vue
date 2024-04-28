<template>
  <main>
    <div class="wrapper">
      <div class="column">
        <ui-btn class="btn" append-icon="theme" action="normal" @click="changeTheme"></ui-btn>
        <ui-btn size="s">small</ui-btn>
        <ui-btn size="m">medium</ui-btn>
        <ui-btn size="l">grand</ui-btn>
      </div>
      <div class="column">
        <div class="row">
          <ui-input class="btn"
                    label="This is a string of 20 words, and some other text that shouldn't expand"
                    v-model="text"
                    clearable
                    :options="['option 1', 'option 2', 'option 3', 'option 4']"></ui-input>
          <ui-btn class="btn" @click="text = ''">Button</ui-btn>

        </div>
        <div class="row">
          <ui-input class="btn"
                    label="Input"
                    v-model="text2"
                    variant="outlined"
                    clearable
                    :options="['option 1', 'option 2', 'option 3', 'option 4']"></ui-input>
          <ui-btn class="btn" variant="outlined" @click="text2 = ''">Button</ui-btn>
        </div>
        <div class="row">
          <ui-input
              v-model="text3"
              label="Small"
              class="btn"
              size="s"
              clearable/>
        </div>
        <div class="row">
          <ui-input
              v-model="text3"
              label="Middle"
              class="btn"
              size="m"
              clearable/>
        </div>
        <div class="row">
          <ui-input
              v-model="text3"
              label="Grand"
              class="btn"
              size="l"
              clearable/>
        </div>
      </div>
    </div>

  </main>
</template>

<script setup lang="ts">
import UiBtn from "@/components/ui-btn/ui-btn.vue";
import UiInput from "@/components/ui-input/ui-input.vue";
import {ref} from "vue";

const text = ref("")
const text2 = ref("")
const text3 = ref("")
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
