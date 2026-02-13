import { useState } from "react";
import {
  decrement,
  increment,
  incrementByAmount,
} from "../../store/counterSlice/counterSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleTheme } from "../../store/ThemeSlice/themeSlice";
import clsx from "clsx";

export function Home() {
  const theme = useAppSelector((state) => state.theme);
  const [state, setState] = useState(0);
  const counter = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  return (
    <div
      className={clsx(
        "w-full h-screen gap-10 grid place-items-center transition-all duration-200",
        {
          "bg-[#101010] text-white": theme.mode === "light",
          "bg-white text-black": theme.mode === "dark",
        },
      )}
    >
      <button onClick={() => dispatch(toggleTheme())}>theme</button>
      <h1 className="text-5xl">{counter.value}</h1>
      <input
        value={state}
        onChange={(e) => setState(+e.target.value)}
        type="number"
      />
      <button
        onClick={() => {
          dispatch(incrementByAmount(state));
          setState(0);
        }}
        className="p-10 bg-amber-300 rounded-3xl"
      >
        تعداد جمع
      </button>
      <div className="flex gap-5">
        <button
          onClick={() => dispatch(increment())}
          className="p-10 bg-amber-300 rounded-3xl"
        >
          +
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="p-10 bg-red-600 rounded-3xl"
        >
          -
        </button>
      </div>
    </div>
  );
}
