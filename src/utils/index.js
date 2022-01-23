import {useEffect, useState} from "react";

export const isFalsy = (value) => value === 0 ? false : !value

export const cleanObject = (object) => {
    const res = {...object}
    Object.keys(res).forEach(key => {
        const value = res[key]
        if(isFalsy(value)){
            delete res[key]
        }
    })
    return res
}

export const useMount = (cb) => {
    useEffect(() => {
        cb()
    },[cb])
}

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timeout)
    }, [value, delay])

    return debouncedValue
}

