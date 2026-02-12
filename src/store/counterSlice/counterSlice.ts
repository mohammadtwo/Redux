import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

export interface Counter {
  value: number;
 amount:number;
}
type PAYLAOD=number

const initialState: Counter = {
  value: 0,
   amount:1,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value=(Number(state.value) + Number(state.amount));
    },
    decrement: (state) => {
      state.value =
       ( Number(state.value) - Number(state.amount)>=1)
          ? (state.value -= state.amount)
          : 0;
    },
    incrementByAmount: (state, action: PayloadAction<PAYLAOD>) => {
      state.amount = action.payload;
    },
    reset: (state) => {
      state.value = 0;
      state.amount = 1;
    },
  },
});
export const{increment,decrement,incrementByAmount,reset}=counterSlice.actions;
export default counterSlice.reducer;