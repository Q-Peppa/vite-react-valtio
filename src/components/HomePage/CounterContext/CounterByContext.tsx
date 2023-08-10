import { useCounter} from "./index.tsx";

const CounterByContext = () => {
   const state =  useCounter()
    return (
        <div>
            <p>
                CounterByContext :  { state.val }
            </p>
            <button onClick={()=>{
                state.val+=1
            }}>
                +1
            </button>
        </div>
    );
};

export default CounterByContext;
