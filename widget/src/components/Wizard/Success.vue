<template>
  <div class="flex flex-col justify-center items-center w-full my-5">
    <icon name="success" color="#63C3BE" size="70" />

    <p class="text-xl font-black text-center w-full mt-2">
      Thank you! We received your feedback
    </p>

    <div class="flex justify-center items-center w-full mt-2">
      <button
        @click="goBack"
        class="rounded-full font-regular text-sm flex flex-col justify-center bg-brand-gray items-center py-2 px-5 cursor-pointer focus:outline-none"
      >
        Send us more feedbacks
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from 'vue'
import { resetStore } from '@/store'
import Icon from '@/components/Icon/index.vue'

interface SetupReturn {
  goBack(): void
}

export default defineComponent({
  components: {
    Icon
  },
  setup(_, { emit }: SetupContext): SetupReturn {
    function goBack(): void {
      resetStore()
      emit('back')
    }

    return {
      goBack
    }
  }
})
</script>
