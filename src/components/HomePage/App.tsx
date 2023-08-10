import React from "react"
import {
    subscribe,
    useSnapshot,
} from "valtio"
import counterState from "./state";
import DerivedComponent from "./DerivedComponent";
import SnapShotCom from "./SnapShotCom";
import ResetComponent from "./ResetComponent";
import ProxyComponent from "./ProxyComponent";
import MyCounterProvider from "./CounterContext";
import CounterByContext from "./CounterContext/CounterByContext.tsx";
import TodoList from "./TodoList";

subscribe(counterState, () => {
    console.log('value change', counterState.value);
    console.log(counterState.methodRef.current())
})
const Counter = () => {
    const snap = useSnapshot(counterState);
    // 1 . don't modify snapshot
    // snap.value+=1
    const handleAdd = (num: number) => {
        counterState.value += num
        // 而不是更新 snap
    }
    // React.useEffect(()=>{
    //     // const un =
    //     // return ()=>un()
    // }, [counterState.value])

    const someMethod = () => {
        console.log('someMethod')
        return 'invoke'
    }
    // 如何监听变化 ,
    // 如何使用ref
    React.useEffect(() => {
        counterState.methodRef.current = someMethod
    }, [])

    return (
        <React.Fragment>
            <p>
                {snap.value}
            </p>
            <hr/>
            <button onClick={() => handleAdd(1)}>add</button>
            <button onClick={() => handleAdd(-1)}>minus</button>
        </React.Fragment>
    )
}
const App = () => {
    return (
        <React.Fragment>
            <MyCounterProvider>
                <h1>
                    hello valtio
                </h1>
                <hr/>
                <Counter/>
                {/*    派生  , 计算属性 , computed */}
                <hr/>
                <DerivedComponent desc={'计算属性'}/>
                <hr/>
                <SnapShotCom desc={'如何拿到最新数据'}/>
                <hr/>
                <ResetComponent desc={'如何重置状态'}/>
                <ProxyComponent desc={'useProxy 的使用'}/>
                <CounterByContext desc={"配合react context 使用"}/>
                <TodoList />
            </MyCounterProvider>
        </React.Fragment>
    )
}
export default App
