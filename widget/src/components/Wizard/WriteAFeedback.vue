<template>
  <div class="flex flex-col justify-center items-center w-full my-5">
    <textarea
      v-model="state.feedback"
      class="w-full rounded-lg border-2 border-gray-300 border-solid h-24 p-2 resize-none focus:outline-none"
    >
    </textarea>

    <button
      :disabled="submitButtonIsDisabled"
      :class="{
        'opacity-50': state.isLoading,
        'opacity-50 bg-gray-100 text-gray-500': submitButtonIsDisabled,
        'bg-brand-main text-white': !submitButtonIsDisabled
      }"
      @click="handleSubmit"
      class="rounded-lg font-black mt-3 flex flex-col justify-center items-center py-2 w-full cursor-pointer focus:outline-none transition-all duration-200"
    >
      <icon
        v-if="state.isLoading"
        name="loading"
        color="white"
        class="animate-spin"
      />
      <template v-else> Send feedback </template>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ComputedRef } from 'vue'
import { setMessage } from '@/store'
import useStore from '@/hooks/store'
import useNavigation from '@/hooks/navigation'
import Icon from '@/components/Icon/index.vue'
import services from '@/services'

type State = {
  feedback: string
  isLoading: boolean
  error: Error | null
}

interface SetupReturn {
  state: State
  submitButtonIsDisabled: ComputedRef<boolean>
  handleSubmit(): Promise<void>
}

export default defineComponent({
  components: {
    Icon
  },
  setup(): SetupReturn {
    const store = useStore()
    const { setErrorState, setSuccessState } = useNavigation()

    const state = reactive<State>({
      feedback: '',
      isLoading: false,
      error: null
    })

    const submitButtonIsDisabled = computed<boolean>(() => {
      return !state.feedback.length
    })

    function handleError(error: Error) {
      state.error = error
      state.isLoading = false
      setErrorState()
    }

    async function handleSubmit(): Promise<void> {
      state.isLoading = true
      setMessage(state.feedback)
      try {
        const response = await services.feedbacks.create({
          type: store.feedbackType,
          text: store.message,
          page: store.currentPage,
          apiKey: store.apiKey,
          device: window.navigator.userAgent,
          fingerprint: store.fingerprint
        })

        if (!response.errors) {
          setSuccessState()
        } else {
          setErrorState()
        }

        setSuccessState()

        state.isLoading = false
      } catch (error: any) {
        handleError(error)
      }
    }

    return {
      state,
      submitButtonIsDisabled,
      handleSubmit
    }
  }
})
</script>
