import {proxy, useSnapshot} from "valtio";
import {keys} from "lodash-es";
import {derive} from "valtio/utils";
const initialState = {
    value : 0,
}
const counterStore = proxy(initialState)
const reset = ()=>{
    const nowObj = structuredClone(initialState)
    keys(nowObj).forEach((key)=>{
        counterStore[key] = nowObj[key]
    })
}
const driveState = derive({
    double : (get)=>get(counterStore).value * 2,
    isValid : (get)=>get(counterStore).value > 0
})
const App = () => {
    const counterConsumer = useSnapshot(counterStore)
    const handleAdd = (payload:number | undefined)=>{
        counterStore.value+=payload ??1
    }
    const handleSub = (payload:number | undefined)=>{
        counterStore.value-=payload ??1
    }
    return (
        <div>
           <p>{counterConsumer.value}</p>
            <p>this is double {driveState.double}</p>
            <p>
                isValid : {driveState.isValid ? 'true' : 'false'}
            </p>
            <hr/>
            <button onClick={()=>handleAdd(10)}>+</button>
            <button onClick={() => handleSub(1)}>-</button>
            <button onClick={reset}>reset</button>
        </div>
    );
};

export default App;
