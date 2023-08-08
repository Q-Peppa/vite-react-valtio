import {
    proxy, ref,
} from "valtio";

const counterState = proxy({
    value: -1,
    methodRef :ref({
        current : undefined as unknown as any,
        formRef : undefined as unknown as any,
        // 大对象 , antd <Form form={form} />
        // form.setFieldsValue , getFieldsValue
        // 持有引用, 不想引起render
    })
})

export default counterState
