<template>
  <div class="box animate__animated animate__fadeInUp animate__faster">
    <div class="relative w-full flex justify-between">
      <button
        @click="back"
        :class="{
          invisible: !canGoBack
        }"
        class="text-xl text-gray-800 focus:outline-none"
      >
        <icon name="arrow-left" :color="brandColors.graydark" />
      </button>

      <p class="text-xl font-black text-center text-brand-main">{{ label }}</p>

      <div
        @click="() => emit('close-box')"
        class="flex items-center text-xl text-gray-800 focus:outline-none cursor-pointer"
      >
        <icon name="close" :color="brandColors.graydark" />
      </div>
    </div>

    <widget />

    <div class="text-gray-800 text-sm flex">
      <icon name="chat" class="mr-1" :color="brandColors.graydark" />
      Widget by <span class="ml-1 font-bold"> Feedbacker </span>
    </div>
  </div>
</template>

<script lang="ts">
import useStore from '../../hooks/store'
import useNavigation from '@/hooks/navigation'
import { defineComponent, SetupContext, computed, ComputedRef } from 'vue'
import { FeedbackType } from '@/utils/enums'
import Icon from '../../components/Icon/index.vue'
import Widget from '../../components/Wizard/index.vue'
import { setCurrentComponent } from '@/store'
const { brand } = require('../../../palette.js')

interface SetupReturn {
  emit: SetupContext['emit']
  label: ComputedRef<string>
  canGoBack: ComputedRef<boolean>
  brandColors: Record<string, string>
  handleGoBack(): void
  back(): void
}

export default defineComponent({
  components: {
    Icon,
    Widget
  },
  setup(_, { emit }: SetupContext): SetupReturn {
    const store = useStore()
    const { back } = useNavigation()

    const label = computed<string>(() => {
      if (store.feedbackType === FeedbackType.Issue) {
        return 'Tell us your problem'
      }

      if (store.feedbackType === FeedbackType.Idea) {
        return 'Give us an idea'
      }

      if (store.feedbackType === FeedbackType.Other) {
        return 'Tell us something'
      }

      return "What's on your mind?"
    })

    const canGoBack = computed<boolean>(() => {
      return store.currentComponent === 'WriteAFeedback'
    })

    function handleGoBack(): void {
      setCurrentComponent('SelectFeedbackType')
    }

    return {
      emit,
      handleGoBack,
      back,
      label,
      canGoBack,
      brandColors: brand
    }
  }
})
</script>

<style lang="postcss" scoped>
.box {
  @apply fixed z-50 bottom-0 right-0 mb-5 mr-5 bg-white rounded-xl
    py-5 px-5 flex flex-col items-center shadow-xl select-none;
  width: 400px;
}
</style>
