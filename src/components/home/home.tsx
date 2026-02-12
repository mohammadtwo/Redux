
import { useState } from "react";
import  { decrement, increment, incrementByAmount } from "../../store/counterSlice/counterSlice"
import { useAppDispatch, useAppSelector } from "../../store/hooks"

export function Home() {
    const [state,setState]=useState(0)
    const counter = useAppSelector((state) => state.counter);
    const dispatch=useAppDispatch()
  return (
    <div className="w-full h-screen bg-purple-500 gap-10 grid place-items-center">
      <h1 className="text-5xl">{counter.value}</h1>
      <input
        value={state}
        onChange={(e) => setState(+e.target.value)}
        type="number"
      />
      <button
        onClick={() =>{ 
            dispatch(incrementByAmount(state))
            setState(0)
        
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