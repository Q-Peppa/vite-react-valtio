import {
    proxy,
} from "valtio";

const counterState = proxy({
    value: -1
})

export default counterState
