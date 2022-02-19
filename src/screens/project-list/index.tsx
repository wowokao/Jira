import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useState} from "react";
import {useDebounce, useDocumentTitle} from "../../utils";
import styled from "@emotion/styled";
import {Typography} from "antd";
import {useProjects} from "./project";
import {useUsers} from "../../utils/user";


export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: "", personId: ""
    })
    const debouncedParam = useDebounce(param, 200)

    const {isLoading, error, data: list} = useProjects(debouncedParam)
    const {data: users} = useUsers()

    useDocumentTitle('项目列表', false)

    return <Container>
        <h1>项目列表</h1>
        <SearchPanel param={param} setParam={setParam} users={users || []}/>
        {
            error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null
        }
        <List dataSource={list || []} users={users || []} loading={isLoading}/>
    </Container>
}

const Container = styled.div`
  padding: 3.2rem;
`