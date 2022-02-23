import {useCallback, useState} from "react";

export const useUndo = <T>(initialPresent: T) => {
    // const [past, setPast] = useState<T[]>([])
    // const [present, setPresent] = useState(initialPresent)
    // const [future, setFuture] = useState<T[]>([])

    //合并 状态简化依赖和代码

    const [state, setState] = useState<{
        past: T[],
        present: T,
        future: T[]
    }>({
        past: [],
        present: initialPresent,
        future: []
    })

    const canUndo = state.past.length !== 0;
    const canRedo = state.future.length !== 0;

    const undo = useCallback(() => {
        setState((currentState) => {
            const {present, future, past} = currentState
            if (!past.length) return currentState

            const previous = past[past.length - 1]
            const newPast = past.slice(0, past.length - 1)//复制past[0, length - 2] 给 newPast

            return {
                past: newPast,
                present: previous,
                future: [present, ...future]
            }
        })
    }, [])

    const redo = useCallback(() => {
        setState((currentState) => {
            const {present, future, past} = currentState
            if (!future.length) return currentState

            const next = future[0]
            const newFuture = future.slice(1)//复制past[0, length - 2] 给 newPast

            return {
                past: [...past, present],
                present: next,
                future: newFuture
            }
        })
    }, [])

    const set = useCallback((newPresent: T) => {
        setState(currentState => {
            const {present, past} = currentState
            if (present === newPresent) return currentState
            return {
                past: [...past, present],
                present: newPresent,
                future: []
            }
        })
    }, [])

    const reset = useCallback((newPresent: T) => {
        setState(() => {
            return {
                past: [],
                present: newPresent,
                future: []
            }
        })
    }, [])

    return [
        state,
        {
            set, reset, undo, redo, canUndo, canRedo
        }
    ]
}