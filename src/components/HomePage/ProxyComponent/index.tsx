import React from "react"
import {useProxy} from "valtio/utils";
import {proxy} from "valtio";

const proxyState = proxy({
    count : 0,
    list: []
})
const ProxyComponent = () => {
  // useSnapshot  + proxy
    const countConsumer = useProxy(proxyState)
    return (
        <React.Fragment>
            <p> proxy 计数器 </p>
            <p>{countConsumer.count}</p>
            <button onClick={()=>{
                countConsumer.count += 1
            }}>
                + 1
            </button>
        </React.Fragment>
    )
}
export default ProxyComponent
