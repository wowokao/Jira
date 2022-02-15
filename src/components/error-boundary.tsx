import React from 'react'


type FallBackRender = (props: { error: Error | null }) => React.ReactElement

/**{ children: ReactNode, fallbackRender: FallBackRender } ==
 * React.PropsWithChildren< {fallbackRender: FallBackRender}> React内置的type utility
 */
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{ fallbackRender: FallBackRender }>, { error: Error | null }> {
    state = {error: null}
// 当子组件抛出异常，这里会接收到并且会调用
    static getDerivedStateFromError(error: Error) {
        return {error}
    }

    render(){
        const {error} = this.state
        const {fallbackRender, children} = this.props
        if(error){
            return fallbackRender({error})
        }
        return children
    }
}