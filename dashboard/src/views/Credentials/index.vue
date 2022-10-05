<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      Credenciais
    </h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Credentials generation guide
    </p>
  </div>

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font-black text-brand-darkgray">
        Instalation and settings
      </h1>
      <p class="mt-10 text-lg text-gray-800 font-regular">
        That's your api key
      </p>

      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />
      <div
        v-else
        class="flex py-3 pl-5 pr-5 mt-2 rouded items-center justify-between bg-brand-gray w-full lg:1/2"
      >
        <span v-if="state.hasError">
          Cannot load api key
        </span>
        <span id="apikey" v-else>
          {{ store.User.currentUser.apiKey }}
        </span>
        <div v-if="!state.hasError" class="flex ml-20 mr-1">
          <icon
            name="copy"
            @click="handleCopy"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer"
          />
          <icon
            @click="handleGenerateApiKey"
            id="generate-apikey"
            name="loading"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer ml-3"
          />
        </div>
      </div>

      <p class="mt-10 text-lg text-gray-800 font-regular">
        Paste this scrip in your site's html
      </p>
      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />
      <div
        v-else
        class="py-3 pl-5 pr-20 mt-2 w-2/3 overflow-x-scroll rounded bg-brand-gray w-full lg:1/2"
      >
        <span v-if="state.hasError">
          Cannot load script
        </span>
        <pre v-else>
&lt;script
  defer
  async
  onload="init('{{ store.User.currentUser.apiKey }}')"
  src="https://jabreu-feedbacker-widget.netlify.app/init.js"
&gt;&lt;/script&gt;
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLogged from '../../components/HeaderLogged'
import Icon from '../../components/Icon'
import ContentLoader from '../../components/ContentLoader'
import useStore from '../../hooks/useStore'
import palette from '../../../palette'
import { reactive, watch } from 'vue'
import services from '../../services'
import { setApiKey } from '../../store/users'
import { useToast } from 'vue-toastification'

export default {
  components: {
    HeaderLogged,
    Icon,
    ContentLoader
  },
  setup() {
    const store = useStore()
    const toast = useToast()
    const state = reactive({
      isLoading: false,
      hasError: false
    })

    watch(
      () => store.User.currentUser,
      () => {
        if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
          handleError(true)
        }
      }
    )

    function handleError(error) {
      state.isLoading = false
      console.log(error)
      state.hasError = !!error
    }

    async function handleGenerateApiKey() {
      try {
        state.isLoading = true
        const { data } = await services.users.generateApiKey()

        setApiKey(data.apiKey)
        state.isLoading = false
      } catch (error) {
        handleError(error)
      }
    }

    async function handleCopy() {
      toast.clear()
      try {
        await navigator.clipboard.writeText(store.User.currentUser.apiKey)
        toast.success('Copied!')
      } catch (error) {
        handleError(error)
      }
    }

    return {
      state,
      store,
      brandColors: palette.brand,
      handleGenerateApiKey,
      handleCopy
    }
  }
}
</script>
