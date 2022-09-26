<template>
  <component
    :is="store.currentComponent"
    @select-feedback-type="handleSelectFeedbackType"
    @next="next"
  />
</template>

<script lang="ts">
import useNavigation from '@/hooks/navigation'
import { defineComponent } from 'vue'
import useStore from '../../hooks/store'
import { FeedbackType } from '@/utils/enums'
import { StoreState, setFeedbackType } from '../../store'
import Error from './Error.vue'
import Success from './Success.vue'
import SelectFeedbackType from './SelectFeedbackType.vue'
import WriteAFeedback from './WriteAFeedback.vue'

interface SetupReturn {
  next(): void
  store: StoreState
  handleSelectFeedbackType(type: string): void
}

export default defineComponent({
  components: {
    Error,
    SelectFeedbackType,
    Success,
    WriteAFeedback
  },
  setup(): SetupReturn {
    const store = useStore()
    const { next } = useNavigation()

    function handleSelectFeedbackType(type: FeedbackType): void {
      setFeedbackType(type)
    }

    return {
      next,
      store,
      handleSelectFeedbackType
    }
  }
})
</script>
