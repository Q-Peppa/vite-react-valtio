import { map } from "lodash-es";
import React from "react";
import {proxy, useSnapshot} from "valtio";
import {derive} from "valtio/utils";

const randomArray = proxy({
    list : [] as string[],
    get length (){
        return randomArray.list.filter((item)=>Number(item)%2===1).length
    }
})
// 基于一个状态, 产生另外一种状态
const oddState = derive({
    length : (get)=>get(randomArray.list).filter((item)=>Number(item)%2===1).length
})
const DerivedComponent = () => {
    const snap = useSnapshot(randomArray);
    const oddSnap = useSnapshot(oddState);
    const handleAddRand = () => {
        const rand  = Math.random() * 1e7
        randomArray.list.push(rand.toFixed(0))
        // setState ([...state, rand.toFixed(0)]
    }
    return (
        <div>
            <h1>DerivedComponent , {randomArray.length}</h1>
            <h1>{randomArray.list.length *2}</h1>
            <h1>奇数的个数, {oddSnap.length}</h1>
            {
                map(snap.list , (item)=>{
                    return (<React.Fragment key={item}>
                        <p>{item}</p>
                    </React.Fragment>)
                })
            }
            <button onClick={handleAddRand}>
                add random
            </button>
        </div>
    );
};

export default DerivedComponent;
