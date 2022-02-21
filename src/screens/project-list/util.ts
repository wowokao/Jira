import {useUrlQueryParam} from "../../utils/url";
import {useMemo} from "react";

export const useProjectSearchParam = () => {
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])

    return [
        useMemo(() => ({...param, personId: Number(param.personId) || undefined}), [param]),
        setParam] as const
}
