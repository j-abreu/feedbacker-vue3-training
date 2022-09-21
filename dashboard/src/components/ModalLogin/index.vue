<template>
  <div class="flex justify-between" id="modal-login">
    <h1 class="text-4xl font-black text-gray-800">
    Entre na sua conta
    </h1>

    <button
      @click="close"
      class="text-4xl text-gray-600"
    >
      &times;
    </button>
  </div>

  <div class="mt-16">
      <form @submit.prevent="handleSubmit">
        <label class="block">
          <span class="text-lg font-medium text-gray-800">Email</span>
          <input
            v-model="state.email.value"
            id="email-field"
            type="email"
            :class="{
              'border-brand-danger': !!state.email.errorMessage
            }"
            class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
            placeholder="jane.dae@gmail.com"
          >
          <span
            v-if="!!state.email.errorMessage"
            id="email-error"
            class="block font-medium text-brand-danger mt-1"
          >
            {{ state.email.errorMessage }}
          </span>
        </label>

        <label class="block mt-9">
          <span class="text-lg font-medium text-gray-800">Password</span>
          <input
            v-model="state.password.value"
            id="password-field"
            type="password"
            :class="{
              'border-brand-danger': !!state.password.errorMessage
            }"
            class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
            placeholder=""
          >
          <span
            v-if="!!state.password.errorMessage"
            class="block font-medium text-brand-danger mt-1"
          >
            {{ state.password.errorMessage }}
          </span>
        </label>

        <button
          :disabled="state.isLoading"
          id="submit-button"
          type="submit"
          :class="{
            'opacity-50': state.isLoading
          }"
          class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:ouline-none transition-all duration-150"
        >
          <icon v-if="state.isLoading" name="loading" class="animate-spin"/>
          <span v-else>Entrar</span>
        </button>
      </form>
    </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useField } from 'vee-validate'
import { validateEmptyAndEmail, validateEmptyAndLength3 } from '../../utils/validators'
import useModal from '../../hooks/useModal'
import services from '../../services'

import Icon from '../Icon'

export default {
  components: {
    Icon
  },
  setup () {
    const modal = useModal()
    const router = useRouter()
    const toast = useToast()

    const {
      value: emailValue,
      errorMessage: emailErrorMessage
    } = useField('email', validateEmptyAndEmail)

    const {
      value: passwordValue,
      errorMessage: passwordErrorMessage
    } = useField('password', validateEmptyAndLength3)

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    async function handleSubmit () {
      try {
        toast.clear()
        state.isLoading = true
        const { data, errors } = await services.auth.login({
          email: state.email.value,
          password: state.password.value
        })

        if (!errors) {
          window.localStorage.setItem('token', data.token)
          router.push({ name: 'Feedbacks' })
          state.isLoading = false
          modal.close()
          return
        }

        if (errors.status === 404) {
          toast.error('Account not found')
        }

        if (errors.status === 401) {
          toast.error('Email or password invalid')
        }

        if (errors.status === 400) {
          toast.error('Cannot log in')
        }

        state.isLoading = false
      } catch (error) {
        state.isLoading = false
        state.hasErrors = !!error
        toast.error('Something went wrong!')
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit
    }
  }
}
</script>
