import useStore from '../hooks/useStore'
import {
  setCurrentUser,
  resetUserStore,
  setApiKey,
  clearCurrentUser
} from './users'

describe('UserStore', () => {
  afterEach(() => {
    resetUserStore()
  })

  it('should set current user', () => {
    const store = useStore()
    setCurrentUser({ name: 'Jeremias' })
    expect(store.User.currentUser.name).toBe('Jeremias')
  })

  it('should set apiKey on current user', () => {
    const store = useStore()
    setApiKey('123')
    expect(store.User.currentUser.apiKey).toBe('123')
  })

  it('should clean current user', () => {
    const store = useStore()
    setCurrentUser({ name: 'Jeremias' })
    expect(store.User.currentUser.name).toBe('Jeremias')
    clearCurrentUser()

    expect(store.User.currentUser.name).toBeFalsy()
  })
})