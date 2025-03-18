import type { ShallowRef } from 'vue'

type StateInstance = [ShallowRef<boolean>, (status: boolean) => void]

export function useState(initalState: boolean): StateInstance {
  const state = shallowRef(initalState)

  function update(newState: boolean) {
    state.value = newState
  }

  return [state, update]
}
