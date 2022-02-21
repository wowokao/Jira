import {Raw} from "../types";
import {Select} from "antd";

type SelectProps = React.ComponentProps<typeof Select>
// extends 相同键会有冲突
interface IdSelectProps extends Omit<SelectProps, 'options' | 'value' | 'onChange'>{
    value: Raw | null | undefined,
    onChange: (value ?: number) => void,
    defaultOptionName?: string,
    options?: { name: string, id: number }[]
}


/**
 *@Description
 * value 可以传入多种类型
 * onChange 只会回调 number | undefined
 * isNaN(Number(value)) == true 为默认类型， 回调undefined
 *@Auther jinshuai
 *@date 2022/2/21
 */
export const IdSelect = (props: IdSelectProps) => {
    const {value, onChange, defaultOptionName, options, ...restProps} = props
    return <Select value={toNumber(value)} onChange={value => onChange(toNumber(value) || undefined)} {...restProps}>
        {
            defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
        }
        {
            options?.map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)
        }
    </Select>
}

const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)