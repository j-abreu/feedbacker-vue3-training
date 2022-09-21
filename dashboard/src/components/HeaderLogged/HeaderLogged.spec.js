import { shallowMount } from "@vue/test-utils"
import HeaderLogged from '.'
import { routes } from '../../router'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

const mockStore = { currentUser: {} }
jest.mock('../../hooks/useStore', () => {
  return () => {
    return mockStore
  }
})

describe('<HeaderLogged />', () => {
  it('should render header logged', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render 3 dots when there\'s not a user logged in', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })

    const logoutButton = wrapper.find('#logout-button')
    expect(logoutButton.text()).toBe('...')
  })

  it('should render user name when there\'s a user logged in', async () => {
    const userName = 'Jeremias Abreu'

    router.push('/')
    await router.isReady()
    mockStore.currentUser.name = userName
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })

    const logoutButton = wrapper.find('#logout-button')
    expect(logoutButton.text()).toBe(`${userName} (logout)`)
  })
})