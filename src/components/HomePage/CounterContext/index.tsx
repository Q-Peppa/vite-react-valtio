import React, {createContext} from "react";
import {proxy} from "valtio";
import {useProxy} from "valtio/utils";
type CounterContextType= {
    val:number
}
export const MyCounterContext = createContext<CounterContextType>({
    val: 0
});
const MyCounterProvider = ({children}: { children: React.ReactNode }) => {
    // use-constants
    const counter = proxy({
        val : 100
    })
 return (
     <MyCounterContext.Provider value={counter}>
            {children}
     </MyCounterContext.Provider>
 )
}
export const useCounter = ()=>{
    return useProxy(React.useContext(MyCounterContext))
}
export default MyCounterProvider
