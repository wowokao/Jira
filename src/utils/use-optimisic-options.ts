import {QueryKey, useQueryClient} from "react-query";

export const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any[]) => any[]) => {
    const queryClient = useQueryClient()
    return {
        onSuccess: () => queryClient.invalidateQueries("projects"),
        async onMutate(target: any) {
            const previousItems = queryClient.getQueryData(queryKey)
            queryClient.setQueriesData(queryKey, (old?: any[]) => {
                return callback(target, old)
            })
            return {previousItems}
        },
        onError(error: any, newItem: any, context: any) {
            queryClient.setQueriesData(queryKey, context.previousItems)
        }
    }
}

export const useDeleteConfig = (queryKey: QueryKey) => useConfig(queryKey,
    (target, old) =>
    old?.filter(item => item.id !== target.id) || [])
export const useEditConfig = (queryKey: QueryKey) => useConfig(queryKey,
    (target, old) =>
        old?.filter(item => item.id === target.id ? {...item} :item) || [])
export const useAddConfig = (queryKey: QueryKey) => useConfig(queryKey,
    (target, old) =>
        old?[...old, target] : [])