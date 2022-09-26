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
import Error from './Error.vue'
import Loading from './Loading.vue'
import Success from './Success.vue'

export default defineComponent({
  components: {
    ArrowLeft,
    Chat,
    ChevronDown,
    Close,
    Copy,
    Error,
    Loading,
    Success
  },
  props: {
    name: { type: String, required: true }
  }
})
</script>
