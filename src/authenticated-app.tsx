import {ProjectListScreen} from "./screens/project-list";
import {useAuth} from "./context/auth-context";
import styled from "@emotion/styled";
import {Row} from "./components/lib";
/*
* 1. 一维布局or二维布局
* 2.内容（不固定）or布局
* */
export const AuthenticatedApp = () => {
    const {logout} = useAuth()
    return <div>
        <Header between={true}>
            <HeaderLeft gap={true}>
                <h2>logo</h2>
                <h2>项目</h2>
                <h2>用户</h2>
            </HeaderLeft>
            <HeaderRight>
                <button onClick={logout}>登出</button>
            </HeaderRight>
        </Header>
        <Main>
            <ProjectListScreen/>
        </Main>
    </div>
}

const Header = styled(Row)``
const HeaderLeft = styled(Row)``
const HeaderRight = styled(Row)``

const Main = styled.main`
  height: calc(100vh - 6rem);
`
