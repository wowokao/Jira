import {useEffect, useState} from "react";

export const isFalsy = (value: any) => value === 0 ? false : !value

export const cleanObject = (object: object) => {
    const res = {...object}
    Object.keys(res).forEach(key => {
        // @ts-ignore
        const value = res[key]
        if (isFalsy(value)) {
            // @ts-ignore
            delete res[key]
        }
    })
    return res
}

export const useMount = (cb: () => void) => {
    useEffect(() => {
        cb()
    }, [cb])
}

export const useDebounce = <T>(value:T, delay?:number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timeout)
    }, [value, delay])

    return debouncedValue
}

