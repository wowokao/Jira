import {useUrlQueryParam} from "../../utils/url";
import {useMemo} from "react";
import {useProject} from "../../utils/project";
import {useSearchParams} from "react-router-dom";

export const useProjectSearchParam = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])

    return [
        useMemo(() => ({...param, personId: Number(param.personId) || undefined}), [param]),
        setParam] as const
}

export const useProjectsQueryKey = () => {
    const [param] = useProjectSearchParam()
    return ['projects', param]
}

export const useProjectModal = () => {
    const [{projectCreate}, setProjectCreate] = useUrlQueryParam([
        'projectCreate'
    ])
    const [, setUrlParams] = useSearchParams();
    const [{editingProjectId}, setEditingProjectId] = useUrlQueryParam(['editingProjectId'])
    const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" });
    const {data: editingProject, isLoading} = useProject(Number(editingProjectId))

    const open = () => setProjectCreate({projectCreate: true})

    const startEdit = (id: number) => setEditingProjectId({editingProjectId: id})
    // 返回内容三个以及一下， 用tuple， 大于三个用对象(但是名字被限制住了)。
    return {
        projectModalOpen: projectCreate === 'true' || Boolean(editingProject ),
        open,
        close,
        startEdit,
        editingProject,
        isLoading
    }
}