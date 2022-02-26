import {Project} from "../screens/project-list/list";
import {useHttp} from "./http";
import {QueryKey, useMutation, useQuery, useQueryClient} from "react-query";
import {useProjectSearchParam} from "../screens/project-list/util";
import {useAddConfig, useDeleteConfig, useEditConfig} from "./use-optimisic-options";


export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()
    //param 变化就会出发useQuery
    return useQuery<Project[]>(["projects", param], () =>
        client("projects", {data: param}))
}

export const useEditProject = (queryKey:QueryKey) => {
    const client = useHttp()
    const queryClient = useQueryClient()
    const searchParams = useProjectSearchParam()
    return useMutation(
        (params: Partial<Project>) =>
            client(`projects/${params.id}`, {
                method: "PATCH",
                data: params,
            }),
        useEditConfig(queryKey)
    )

}

export const useAddProject = (queryKey:QueryKey) => {
    const client = useHttp();
    const queryClient = useQueryClient();

    return useMutation(
        (params: Partial<Project>) =>
            client(`projects`, {
                data: params,
                method: "POST",
            }),
        useAddConfig(queryKey)
    );
}

export const useDeleteProject = (queryKey:QueryKey) => {
    const client = useHttp();
    const queryClient = useQueryClient();

    return useMutation(
        ({id}:{id:number}) =>
            client(`projects/${id}`, {
                method: "DELETE",
            }),
        useDeleteConfig(queryKey)
    );
}

export const useProject = (id?: number) => {
    const client = useHttp()
    return useQuery<Project>(['project', {id}],
        () => client(`projects/${id}`),
        {
            enabled: Boolean(id)
        }
    )
}