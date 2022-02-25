import {Drawer} from "antd"
import {useDispatch, useSelector} from "react-redux";
import {projectListActions, selectProjectModalOpen} from "./project-list.slice";

export const ProjectModel = () => {
    const dispatch = useDispatch()
    const {projectModalOpen} = useSelector(selectProjectModalOpen)
    return <Drawer onClose={() => dispatch(projectListActions.closeProjectModal())} visible={projectModalOpen} width={'100%'}>
        <h1>Project Model</h1>
        <button onClick={() => dispatch(projectListActions.closeProjectModal())}>close</button>
    </Drawer>
}