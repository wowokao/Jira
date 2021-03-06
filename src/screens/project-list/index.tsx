import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useDebounce, useDocumentTitle} from "../../utils";
import styled from "@emotion/styled";
import {useProjects} from "../../utils/project";
import {useUsers} from "../../utils/user";
import {useProjectModal, useProjectSearchParam} from "./util";
import {ButtonNoPadding, ErrorBox, Row} from "components/lib";


export const ProjectListScreen = () => {

    useDocumentTitle('项目列表', false)

    const [param, setParam] = useProjectSearchParam()

    const {isLoading, error, data: list} = useProjects(useDebounce(param, 200))

    const {data: users} = useUsers()

    const {open} = useProjectModal()
    return <Container>
        <Row between={true}>
            <h1>项目列表</h1>
            <ButtonNoPadding onClick={open} type={"link"}>创建项目</ButtonNoPadding>
        </Row>
        <SearchPanel param={param} setParam={setParam} users={users || []}/>
        <ErrorBox error={error}/>
        <List
            dataSource={list || []} users={users || []}
            loading={isLoading}/>
    </Container>
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`