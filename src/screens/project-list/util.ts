import {useUrlQueryParam} from "../../utils/url";
import {useMemo} from "react";

export const useProjectSearchParam = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])

    return [
        useMemo(() => ({...param, personId: Number(param.personId) || undefined}), [param]),
        setParam] as const
}

export const useProjectModal = () => {
    const [{projectCreate}, setProjectCreate] = useUrlQueryParam([
        'projectCreate'
    ])

    const open = () => setProjectCreate({projectCreate: true})
    const close = () => setProjectCreate({projectCreate: undefined})
    // 返回内容三个以及一下， 用tuple， 大于三个用对象(但是名字被限制住了)。
    return {
        projectModalOpen: projectCreate === 'true',
        open,
        close
    }
}