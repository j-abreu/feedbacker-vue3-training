<template>
  <div class="flex items-center justify-between w-4/5 max-w-6xl py-10">
    <div class="w-28 lg:w-36">
      <img class="w-full" src="../../assets/images/logo_white.png">
    </div>

    <div class="flex">
      <ul class="flex list-none">
        <li
          @click="() => router.push({ name: 'Credentials' })"
          id="header-credentials-button"
          class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none"
        >
          Credentials
        </li>
        <li
          @click="() => router.push({ name: 'Feedbacks' })"
          id="header-feedbacks-button"
          class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none"
        >
          Feedbacks
        </li>
        <li
        id="logout-button"
        @click="handleLogout"
          class="px-6 py-2 font-bold bg-white rounded-full cursor-pointer text-brand-main-focus:outline-none whitespace-nowrap"
        >
          {{ logoutLabel }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import useStore from '../../hooks/useStore'
import { clearCurrentUser } from '../../store/users'

export default {
  setup () {
    const router = useRouter()
    const store = useStore('User')

    const logoutLabel = computed(() => {
      if (!store.currentUser.name) {
        return '...'
      }

      return `${store.currentUser.name} (logout)`
    })

    function handleLogout () {
      window.localStorage.removeItem('token')
      clearCurrentUser()
      router.push({ name: 'Home' })
    }

    return {
      router,
      logoutLabel,
      handleLogout
    }
  }
}
</script>
