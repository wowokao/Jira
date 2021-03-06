import {User} from "./search-panel";
import {Dropdown, Menu, Modal, Table, TableProps} from 'antd'
import dayjs from "dayjs";
import {Link} from 'react-router-dom'
import {Pin} from "components/pin";
import {useDeleteProject, useEditProject} from "../../utils/project";
import {ButtonNoPadding} from "../../components/lib";
import {useProjectModal, useProjectsQueryKey} from "./util";

export interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
    created: number
}

interface ListProps extends TableProps<Project> {
    users: User[],
}

export const List = ({users, ...props}: ListProps) => {
    const {mutate} = useEditProject(useProjectsQueryKey())

    //const pinProject = (id: number, pin: boolean) => mutate({id, pin}) 克里化 => Point Free
    const pinProject = (id: number) => (pin: boolean) => mutate({id, pin})

    return <Table
        rowKey={'id'}
        pagination={false}
        columns={[
            {
                title: <Pin
                    checked={true}
                    disabled={true}/>,
                render(value, project) {
                    return <Pin
                        checked={project.pin}
                        onCheckedChange={pinProject(project.id)}/>
                }
            },
            {
                title: '名称',
                sorter: (a, b) => a.name.localeCompare(b.name),
                render(value, project) {
                    return <Link to={`projects/${String(project.id)}`}>{project.name}</Link>
                }
            }, {
                title: '部门',
                dataIndex: 'organization'
            },
            {
                title: '负责人',
                render(value, project) {
                    return <span>
                {users.find(user => user.id === project.personId)?.name || '未知'}
            </span>
                }
            },
            {
                title: '创建时间',
                render(value, project) {
                    return <span>
                    {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
                </span>
                }
            },
            {
                render(value, project) {
                    return <More project={project}/>
                }
            }
        ]} {...props}/>
}

const More = ({project}: { project: Project }) => {
    const {startEdit} = useProjectModal()
    const editProject = (id: number) => () => startEdit(id)
    const {mutate:deleteProject} = useDeleteProject((useProjectsQueryKey()))
    const confirmDeleteProject = (id: number ) => {
        Modal.confirm({
            title:'确定删除？',
            content:'点击确定删除',
            okText:'确定',
            onOk(){
                deleteProject({id})
            }})
    }
    return <Dropdown overlay={
        <Menu>
            <Menu.Item onClick={editProject(project.id)} key={'edit'}>编辑</Menu.Item>
            <Menu.Item key={'delete'} onClick={() => confirmDeleteProject(project.id)}>删除</Menu.Item>
        </Menu>}>
        <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
    </Dropdown>
}