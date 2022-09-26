<template>
  <div class="flex justify-between w-full my-5">
    <button
      @click="handleSelect(FeedbackType.Issue)"
      class="rounded-xl hover:bg-gray-100 bg-brand-gray flex flex-col justify-center items-center p-5 w-28 cursor-pointer focus:outline-none"
    >
      <div class="w-12">
        <img class="w-full" src="@/assets/images/issue.png" alt="Issue" />
      </div>

      <p class="font-medium mt-1 text-gray-800">Issue</p>
    </button>

    <button
      @click="handleSelect(FeedbackType.Idea)"
      class="rounded-xl hover:bg-gray-100 bg-brand-gray flex flex-col justify-center items-center p-5 w-28 cursor-pointer focus:outline-none"
    >
      <div class="w-12">
        <img class="w-full" src="@/assets/images/lamp.png" alt="Issue" />
      </div>

      <p class="font-medium mt-1 text-gray-800">Issue</p>
    </button>

    <button
      @click="handleSelect(FeedbackType.Other)"
      class="rounded-xl hover:bg-gray-100 bg-brand-gray flex flex-col justify-center items-center p-5 w-28 cursor-pointer focus:outline-none"
    >
      <div class="w-12">
        <img class="w-full" src="@/assets/images/fire.png" alt="Issue" />
      </div>

      <p class="font-medium mt-1 text-gray-800">Other</p>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from 'vue'
import { FeedbackType } from '@/utils/enums'

interface SetupReturn {
  handleSelect(type: string): void
  FeedbackType: Record<string, string>
}

export default defineComponent({
  setup(_, { emit }: SetupContext): SetupReturn {
    function handleSelect(type: FeedbackType): void {
      emit('select-feedback-type', type)
      emit('next')
    }

    return {
      handleSelect,
      FeedbackType
    }
  }
})
</script>
