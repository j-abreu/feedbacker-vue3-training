<template>
  <component :is="name" v-bind="$props" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Loading from './Loading.vue'
import Copy from './Copy.vue'
import ChevronDown from './ChevronDown.vue'
import Chat from './Chat.vue'

export default defineComponent({
  components: {
    Loading,
    Copy,
    ChevronDown,
    Chat
  },
  props: {
    name: { type: String, required: true }
  }
})
</script>
