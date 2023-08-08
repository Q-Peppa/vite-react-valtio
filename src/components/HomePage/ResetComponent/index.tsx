import React from 'react';
import {proxy, useSnapshot,} from "valtio";
const initState = {
    val :'',
    list : [] as string[],
    num : 0
}
const proxyState = proxy({
    obj : initState
})
const reset = ()=>{
    const newObj = structuredClone(initState)
    // Object.keys(proxyState).forEach((key)=>{
    //     proxyState[key] = newObj[key]
    // })
    proxyState.obj = newObj
}
const ResetComponent = () => {
    const snap = useSnapshot(proxyState)
    React.useEffect(()=>{
        console.log('snap', snap)
    } , [snap.obj.val])

    return (
        <div>
            <p>
                {snap.obj.num}
            </p>
            <button onClick={()=>{
                proxyState.obj.val = 'demo'
                proxyState.obj.list.push('demo')
                proxyState.obj.num = 20
            }}> add num</button>
            <p onClick={reset}>
                try reset
            </p>
        </div>
    );
};

export default ResetComponent;
