import {useAsync} from 'utils/use-async'
import {act, renderHook} from "@testing-library/react-hooks";

const defaultState: ReturnType<typeof useAsync> = {
    stat:"idle",
    data:null,
    error:null,

    isIdle:true,
    isLoading:false,
    isError:false,
    isSuccess:false,

    run: expect.any(Function),
    setData:expect.any(Function),
    setError:expect.any(Function),
    retry:expect.any(Function)
}

const loadingState:ReturnType<typeof useAsync> = {
    ...defaultState,
    stat:"loading",
    isIdle:false,
    isSuccess:false,
}

const successState:ReturnType<typeof useAsync> = {
    ...defaultState,
    stat:"success",
    isIdle:false,
    isSuccess:true,
}

test('useAsync 异步', async () => {
    let resolve: any;
    const promise = new Promise((res) => {
            resolve = res
        })
    const {result} = renderHook(() => useAsync())

    expect(result.current).toEqual(defaultState)

    let p:Promise<any>
    act(()=>{
        p = result.current.run(promise)
    })
    expect(result.current).toEqual(loadingState)
    const resolveValue = {mockedValue: "resolved"}
    await act(async () =>{
        resolve(resolveValue)
        await p
    })
    expect(result.current).toEqual({
        ...successState,
        data:resolveValue
    })
})