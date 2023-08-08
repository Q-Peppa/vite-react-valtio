import {proxy, snapshot, useSnapshot} from "valtio";
const proxyState = proxy({
    val :'',
    list : ['demo' , '12'],
    num : 20
})
const SnapShotCom = () => {
    const snap = useSnapshot(proxyState)
    const handleSubmit =  ()=>{
        console.log(snapshot(proxyState)); // 拿到数据后, 就能提交了 , latest  ,普通 object
        console.log({...snap , list: [...snap.list]}) // 直接解构 .
        // 为什么数据被解构后, 就失去了响应式呢?
    }
    return (
        <div>
            <button onClick={handleSubmit}>
                submit
            </button>
        </div>
    );
};

export default SnapShotCom;
