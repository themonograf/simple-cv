import { create } from "zustand";
import { NewAppState as State, NewAppAction as Action } from "./types";

const initialFilter: State = {
  filter: {
    bar: 0,
    foo: "",
  },
};

const useClientScorecardStore = create<State & Action>()((set) => ({
  ...initialFilter,
  setFilter: (payload) =>
    set((state) => ({ filter: { ...state.filter, ...payload } })),
  clearFilter: () => set({ ...initialFilter }),
}));

export default useClientScorecardStore;
