import { SWITCH_LOADING } from "./types"

export const switchLoading = thisBoolean => ({
  type: SWITCH_LOADING,
  thisBoolean
})
