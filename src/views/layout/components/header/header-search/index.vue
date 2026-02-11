<template>
  <div class="w-full guide-search">
    <m-search
      v-model="inputValue"
      @search="onSearchHandler"
      @clear="onSearchHandler"
    >
      <template #dropdown>
        <div>
          <hint
            :search-text="inputValue"
            v-show="inputValue"
            @item-click="onSearchHandler"
          />
          <history v-show="!inputValue" @item-click="onSearchHandler" />
          <theme v-show="!inputValue" />
        </div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Hint from './hint.vue'
import History from './history.vue'
import Theme from './theme.vue'
const inputValue = ref('')

const onSearchHandler = (val) => {
  inputValue.value = val
  if (val) {
    sessionStore.changeSearchText(val)
  }
}
</script>

<style lang="scss" scoped></style>
