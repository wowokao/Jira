import {Drawer} from "antd"

export const ProjectModel = (props: { projectModelOpen: boolean, onClose: () => void }) => {
    return <Drawer onClose={props.onClose} visible={props.projectModelOpen} width={'100%'}>
        <h1>Project Model</h1>
        <button onClick={props.onClose}>close</button>
    </Drawer>
}