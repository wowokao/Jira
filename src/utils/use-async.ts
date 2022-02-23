import {useCallback, useReducer, useState} from "react";
import {useMountedRef} from "./index";

interface State<D> {
    error: Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultConfig = {
    throwOnError: false,
};

const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}

const useSafeDispatch = <T>(dispatch:(...args:T[]) => void) => {
    const mountedRef = useMountedRef()
    return useCallback((...args) =>
        (mountedRef.current?dispatch(...args): void 0), [dispatch, mountedRef])
}

export const useAsync = <D>(initialState?: State<D>,
                            initialConfig?: typeof defaultConfig
) => {
    const config = {...defaultConfig, ...initialConfig};
    const [state, dispatch] = useReducer((
        state: State<D>,
        action: Partial<State<D>>)=>(
            {...state,...action}),
        {
        ...defaultInitialState,
        ...initialState
    })

    const [retry, setRetry] = useState(() => () => {});

    const safeDispatch = useSafeDispatch(dispatch)

    const setData = useCallback((data: D) => safeDispatch({
        data,
        stat: 'success',
        error: null
    }), [safeDispatch])

    const setError = useCallback((error: Error) => safeDispatch({
        error,
        stat: 'error',
        data: null
    }), [safeDispatch])

    const run = useCallback(
        (promise: Promise<D>,
         runConfig?: { retry: () => Promise<D> }
        ) => {
            if (!promise || !promise.then) {
                throw new Error('请传入 Promise 类型')
            }
            setRetry(() => () => {
                if (runConfig?.retry) {
                    run(runConfig.retry(), runConfig)
                }
            });
            safeDispatch({state:'loading'})
            return promise.then(data => {
                setData(data)
                return data
                //catch 之后就不会抛出 需要return promise.reject
            }).catch(error => {
                setError(error)
                if (config.throwOnError) return Promise.reject(error);
                return error;
            })
        }, [config.throwOnError, safeDispatch, setData, setError])

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        //重新run(), 更新state
        retry,
        ...state
    }
}