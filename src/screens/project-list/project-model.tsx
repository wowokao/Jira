import {Drawer} from "antd"
import {useProjectModal} from "./util";

export const ProjectModel = () => {
    const {close, projectModalOpen, open} = useProjectModal()
    return <Drawer onClose={open} visible={projectModalOpen} width={'100%'}>
        <h1>Project Model</h1>
        <button onClick={close}>close</button>
    </Drawer>
}