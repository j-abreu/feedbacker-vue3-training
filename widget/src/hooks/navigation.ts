import useStore from './store'
import { setCurrentComponent, setFeedbackType } from '@/store'
import { FeedbackType } from '@/utils/enums'

interface Navigation {
  back(): void
  next(): void
  setErrorState(): void
  setSuccessState(): void
}

export default function useNavigation(): Navigation {
  const store = useStore()

  function back(): void {
    if (store.currentComponent === 'WriteAFeedback') {
      setCurrentComponent('SelectFeedbackType')
      setFeedbackType(FeedbackType.None)
    }
  }

  function next(): void {
    if (store.currentComponent === 'SelectFeedbackType') {
      setCurrentComponent('WriteAFeedback')
    }
  }

  function setErrorState(): void {
    setCurrentComponent('Error')
  }

  function setSuccessState(): void {
    setCurrentComponent('Success')
  }

  return {
    back,
    next,
    setErrorState,
    setSuccessState
  }
}
