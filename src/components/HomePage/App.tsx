import React from "react"
import {
    useSnapshot
} from "valtio"
import counterState from "./state";


const Counter = ()=>{
    const snap = useSnapshot(counterState);
    // 1 . don't modify snapshot
    // snap.value+=1
    const handleAdd = (num:number)=>{
        counterState.value+=num
        // 而不是更新 snap
    }
    return (
        <React.Fragment>
            <p>
                {snap.value}
            </p>
            <hr/>
            <button onClick={()=>handleAdd(1)}>add</button>
            <button onClick={()=>handleAdd(-1)}>minus</button>
        </React.Fragment>
    )
}
const App = () => {
  return (
      <React.Fragment>
            <h1>
                hello valtio
            </h1>
          <hr/>
          <Counter/>
      </React.Fragment>
  )
}
export default App
