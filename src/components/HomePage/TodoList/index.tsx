import React from "react"
import {proxy, ref} from "valtio";
import {derive, useProxy} from "valtio/utils";
import { map } from "lodash-es";

type Todo = {
    id: number,
    text: string,
    done: boolean,
}
const todoState = proxy({
    list: [] as Todo[],
    inputRef : ref({
        current : {} as null | HTMLInputElement
    }),
})
const todoDerive = derive({
   undoLength : (get)=>get(todoState.list).filter(t=>!t.done).length
})
const TodoList = () => {
    const todoConsumer = useProxy(todoState);
    const handleAdd = ()=>{
        const v = todoConsumer.inputRef.current?.value;
        console.log(v);
        if(v){
            todoConsumer.list.push({
                id : +(Math.random()*1e8).toFixed(0),
                text : v,
                done : false,
            })
        }
    }
    const doneIt = (id:number)=>{
        const item = todoConsumer.list.find(e=>e.id === id);
        console.log(item);
        if(item) {
            item.done = !item.done
        }
    }
    return (
        <React.Fragment>
            <h1>this is todoList demo</h1>
            <h3>undoLength  : {todoDerive.undoLength}</h3>
            <section style={{
                display: 'grid',
                gap : 16,
                grid :'auto / 2fr 1fr',
                marginBlock: '2rem'
            }}>
                <input
                    onKeyDown={e=>{
                        if(e.key === 'Enter'){
                            handleAdd();
                        }
                    }}
                    type="text" ref={(r)=>{
                    todoConsumer.inputRef.current = r;
                }}/>
                <button onClick={handleAdd}> append </button>
            </section>

            <hr/>
            <ul>
                {
                    map(todoConsumer.list, (todo) => {
                        return (
                            <div key={todo.id} style={{
                                display: 'grid',
                                gap : 16,
                                grid :'auto / 2fr 1fr',
                                marginBlock: '2rem'
                            }}>
                                {
                                    todo.done ? <del>{todo.text}</del> : <li>{todo.text}</li>
                                }
                                <button onClick={()=>doneIt(todo.id)}>{
                                    !todo.done ?'do this!': 'undo this '
                                }</button>
                            </div>
                        )
                    })
                }
            </ul>
        </React.Fragment>
    )
}
export default TodoList
