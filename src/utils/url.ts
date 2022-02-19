//返回页面url中指定键的参数值

import {useSearchParams} from "react-router-dom";
import {useMemo} from "react";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParam] = useSearchParams()
    return [
        useMemo(() => keys.reduce((prev: { [key in K]: string }, key: K) => {
            return {...prev, [key]: searchParams.get(key) || ''}
        }, {} as { [key in K]: string }),
            //eslint-disable-next-line react-hooks/exhaustive-deps
            [searchParams]),
        setSearchParam
    ] as const
}