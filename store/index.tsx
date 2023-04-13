import { create } from "zustand";
// 组合式
// export const useBoundStore = create((set) => ({
//   count: 0,
//   text: "hello",
//   inc: () => set((state: any) => ({ count: state.count + 1 })),
//   setText: (text: any) => set({ text }),
// }));

// 分离封装式
// 值和逻辑处理分开
export const useBoundStore = create(() => ({
  count: 0,
  text: "hello",
}));

export const inc: any = () =>
  useBoundStore.setState((state) => ({ count: state.count + 1 }));

export const setText = (e: any) => {
  console.log(e.target.value);
  useBoundStore.setState(() => ({ text: e.target.value}));
};
