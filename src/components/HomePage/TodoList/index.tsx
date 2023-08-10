import React from "react"
import {proxy, useSnapshot} from "valtio";
import {derive, useProxy} from "valtio/utils";
type Todo  = {
    id : number|string,
    text: string,
    done : boolean
}
const todoState = proxy({
    list : [] as Array<Todo>,
    val: '',
})
const undo = derive({
    l : (get)=>get(todoState.list).filter(e=>!e.done).length
})
const TodoList = ()=>{
    const todoConsumer = useProxy(todoState);
    const len = useSnapshot(undo).l
    const handleAdd = () => {
      const ele = {
          id  : Date.now(), // Math.random() * 1e9
          text : todoConsumer.val ,
          done : false
      }
      todoConsumer.list.push(ele);
      todoConsumer.val = ''
      // react useState => setState([...todoConsumer.list , ele])
        // 如何获取text
        // 1. todoState. val
    }
    const handleDone = (id:string|number) => {
        const ele = todoConsumer.list.find(e=>e.id === id)
        if(ele) {
            ele.done = !ele.done
        }
    }
    return (
        <React.Fragment>
            <h1>
                this is TodoList demo
            </h1>
            <h3>
                undoLength : { len }
            </h3>
            <section style={{
                display:'grid',
                gap : 16,
                grid: 'auto / 2fr 1fr'
            }}>
                <input
                    value={todoConsumer.val}
                    onChange={e=>{
                        todoConsumer.val = e.target.value
                    }}
                    type={'text'}/>
                <button onClick={handleAdd}>append</button>
            </section>
            <ul>
                {todoConsumer.list?.map(e=>{
                    return (
                        <div key={e.id} style={{
                            display: 'grid',
                            grid: 'auto / 300px 50px',
                            marginBlock:'8px'
                        }}>
                            {
                                //  如果已经完成, 添加中划线
                                e.done ?  <del>{e.text}</del> : <li>{e.text}</li>
                            }

                            <button onClick={()=>handleDone(e.id)}>{
                                e.done ? 'undo' :'done'
                            }</button>
                        </div>
                    )
                })}
            </ul>
        </React.Fragment>
    )
}
export default TodoList
