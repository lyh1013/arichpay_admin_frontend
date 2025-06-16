import type { ShallowRef } from 'vue';

type StateInstance = [ShallowRef<any>, (status: any) => void];

export function useCustomState(initalState: any): StateInstance {
  const state = shallowRef(initalState);

  function update(newState: any) {
    state.value = newState;
  }

  return [state, update];
}
