// ~/composables/useCoachId.js
import { useCookie } from '#app'

export const useCoachId = () => {
  const coachId = useCookie('coachId')
  return coachId?.value || null
}

