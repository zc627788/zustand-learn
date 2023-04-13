import produce from "immer";
import { create, StoreApi, UseBoundStore } from "zustand";

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;
//官方配置,不需要引入hook,直接用 
// get the property
// const bears = useBearStore.use.bears()

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

type State = {
  firstName: string;
  lastName: string;
  deep: {
    nested: {
      obj: { count: number };
    };
  };
};

interface BearState {
  bears: number;
  increase: (by: number) => void;
  increment: () => void;
}

type Action = {
  updateFirstName: (firstName: State["firstName"]) => void;
  updateLastName: (lastName: State["lastName"]) => void;
  updateDeep: (count: any) => void;
};

// Create your store, which includes both state and (optionally) actions
export const useStore = create<State & Action>((set) => ({
  firstName: "",
  lastName: "",
  deep: {
    nested: {
      obj: { count: 0 },
    },
  },
  //如果set后面设置为true禁用合并行为
  // set内部自己合并了状态 不需要在{...state,firstName:firstName}
  updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
  updateLastName: (lastName) => set(() => ({ lastName: lastName })),
  // 如果是嵌套对象,出现了什么问题?
  // 需要你嵌套很多层去记录之前的状态
  // updateDeep: (count) =>
  //   set((state) => ({
  //     deep: {
  //       ...state.deep,
  //       nested: {
  //         ...state.deep.nested,
  //         obj: {
  //           ...state.deep.nested.obj,
  //           count: count,
  //         },
  //       },
  //     },
  //   })),
  // 使用immer,解决繁杂的嵌套写法
  updateDeep: (count) =>
    set(
      produce((state: any) => {
        state.deep.nested.obj.count = count;
      })
    ),
}));

const useBearStoreBase = create<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
  increment: () => set((state) => ({ bears: state.bears + 1 })),
}));

export const useBearStore = createSelectors(useBearStoreBase);
