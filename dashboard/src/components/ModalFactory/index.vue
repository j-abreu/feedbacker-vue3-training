<template>
  <teleport to="body">
    <div
        v-if="state.isActive"
        class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        @click.self="handleModalToggle({status: false})"
    >
        <div
          :class="state.width"
          class="fixed mx-10"
        >
            <div class="flex flex-col overflow-hidden bg-white rounded-lg animate__animated animate__fadeInDown animate__faster">
                <div class="flex flex-col px-12 py-10 bg-white">
                    <component :is="state.component" />
                </div>
            </div>

        </div>
    </div>
  </teleport>
</template>

<script>
import { defineAsyncComponent, onBeforeUnmount, onMounted, reactive } from 'vue'
import useModal from '../../hooks/useModal'

const ModalLogin = defineAsyncComponent(() => import('../ModalLogin'))
const ModalCreateAccount = defineAsyncComponent(() => import('../ModalCreateAccount'))

const DEFAULT_WIDTH = 'w-3/4 lg:w-1/3'

export default {
  components: {
    ModalLogin,
    ModalCreateAccount
  },
  setup () {
    const modal = useModal()

    const state = reactive({
      isActive: false,
      component: {},
      props: {},
      width: DEFAULT_WIDTH
    })

    onMounted(() => {
      modal.listen(handleModalToggle)
    })

    onBeforeUnmount(() => {
      modal.off(handleModalToggle)
    })

    function handleModalToggle (payload) {
      state.isActive = payload.status

      if (payload.status) {
        state.component = payload.component
        state.props = payload.props ?? {}
        state.width = payload.width ?? DEFAULT_WIDTH
        return
      }

      state.component = {}
      state.props = {}
      state.width = DEFAULT_WIDTH
    }

    return {
      state,
      handleModalToggle
    }
  }
}
</script>

<style>

</style>
