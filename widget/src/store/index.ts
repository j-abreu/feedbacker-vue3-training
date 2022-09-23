import { reactive, readonly } from 'vue'
import { FeedbackType } from '@/utils/enums'

export type StoreState = {
  currentComponent: string
  feedbackType: FeedbackType
  message: string
  fingerprint: string
  apiKey: string
  currentPage: string
}

const initialState = {
  currentComponent: 'SelectFeedbackType',
  feedbackType: FeedbackType.None,
  message: '',
  fingerprint: '',
  apiKey: '',
  currentPage: ''
}

const state = reactive<StoreState>({ ...initialState })

export function setCurrentComponent(component: string): void {
  state.currentComponent = component
}

export function setFeedbackType(feedbackType: FeedbackType): void {
  state.feedbackType = feedbackType
}

export function setMessage(message: string): void {
  state.message = message
}

export function setCurrentPage(page: string): void {
  state.currentPage = page
}

export function setApiKey(apiKey: string): void {
  state.apiKey = apiKey
}

export function setFingerprint(fingerprint: string): void {
  state.fingerprint = fingerprint
}

export function restoreState(): void {
  setCurrentComponent(initialState.currentComponent)
  setFeedbackType(initialState.feedbackType)
  setMessage(initialState.message)
  setCurrentPage(initialState.currentPage)
  setApiKey(initialState.apiKey)
  setFingerprint(initialState.fingerprint)
}

export default readonly(state)
