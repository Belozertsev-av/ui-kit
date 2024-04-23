<template>
  <main>
    <div class="wrapper">
      <div class="column">
        <ui-btn class="btn" append-icon="theme" action="normal" @click="changeTheme"></ui-btn>
      </div>
      <div class="column">
        <div class="row">
          <ui-input class="btn"
                    label="Input with search"
                    v-model="text"
                    clearable
                    :options="['option 1', 'OpTiOn2', 'OPTION 3', 'Option 4']"></ui-input>
          <ui-btn class="btn" @click="text = ''">Clear</ui-btn>

        </div>
        <div class="row">
          <ui-input class="btn"
                    label="Classic search"
                    v-model="text2"
                    variant="outlined"
                    clearable
                    :options="['option 1', 'OpTiOn2', 'OPTION 3', 'Option 4']"></ui-input>
          <ui-btn class="btn" variant="outlined" @click="text2 = ''">Clear</ui-btn>
        </div>
        <div class="row">
          {{ text }}
          {{ text2 }}
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
