<template>
  <component :is="name" v-bind="$props" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArrowLeft from './ArrowLeft.vue'
import Chat from './Chat.vue'
import ChevronDown from './ChevronDown.vue'
import Close from './Close.vue'
import Copy from './Copy.vue'
import Loading from './Loading.vue'

export default defineComponent({
  components: {
    ArrowLeft,
    Chat,
    ChevronDown,
    Close,
    Copy,
    Loading
  },
  props: {
    name: { type: String, required: true }
  }
})
</script>
