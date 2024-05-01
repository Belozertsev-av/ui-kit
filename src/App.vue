<template>
  <main>
    <div class="wrapper">
      <div class="column">
        <ui-btn class="btn" append-icon="theme" action="normal" @click="changeTheme"></ui-btn>

        <ui-input v-model="inputResult"
                  label="Input"
                  clearable
                  size="s"
                  :options="['option 1', 'option 2', 'option 3']"/>
      </div>
      <div class="column">
        {{ inputResult }}
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import UiBtn from "@/components/ui-btn/ui-btn.vue";
import {ref} from "vue";
import UiInput from "@/components/ui-input/ui-input.vue";

const inputResult = ref<string>("")

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
