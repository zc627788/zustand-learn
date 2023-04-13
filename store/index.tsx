import produce from "immer";
import { create } from "zustand";

type State = {
  firstName: string;
  lastName: string;
  deep: {
    nested: {
      obj: { count: number };
    };
  };
};

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
