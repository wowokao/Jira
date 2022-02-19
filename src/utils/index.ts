import {useEffect, useRef, useState} from "react";

export const isFalsy = (value: any) => value === 0 ? false : !value

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

export const cleanObject = (object: {[key:string]:unknown}) => {
    const res = {...object}
    Object.keys(res).forEach(key => {

        const value = res[key]
        if (isVoid(value)) {
            // @ts-ignore
            delete res[key]
        }
    })
    return res
}

export const useMount = (cb: () => void) => {
    useEffect(() => {
        cb()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export const useDebounce = <T>(value:T, delay?:number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timeout)
    }, [value, delay])

    return debouncedValue
}

export const useDocumentTitle = (title: string, keepUnmount = true) =>{

    // const oldTitle = document.title
    const oldTitle = useRef(document.title).current
    console.log(oldTitle)
    useEffect(() => {
        document.title = title

    }, [title])

    useEffect(() => {
        return () => {
            if(!keepUnmount){
                document.title = oldTitle
            }
        }
    },[keepUnmount, oldTitle])
}