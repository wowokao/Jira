import {ProjectListScreen} from "./screens/project-list";
import {useAuth} from "./context/auth-context";
import styled from "@emotion/styled";
import {Row} from "./components/lib";
import {ReactComponent as SoftwareLogo} from './assets/software-logo.svg'
import {Dropdown, Menu, Button} from "antd";
import {Route, Routes} from 'react-router'
import {BrowserRouter as Router} from 'react-router-dom'
import {ProjectScreen} from "screens/project";
import {resetRoute} from "./utils";

/**
 * react-router 和react-router-dom的关系
 * 类似于react和react-native
 */

/*
* 1. 一维布局or二维布局
* 2.内容（不固定）or布局
* */
export const AuthenticatedApp = () => {

    return <div>
        <PageHeader/>
        <Main>
            <Router>
                <Routes>
                    <Route path={'/projects'} element={<ProjectListScreen/>}/>
                    <Route path={'/projects/:projectId/*'} element={<ProjectScreen/>}/>
                    <Route index element={<ProjectListScreen/>}/>
                </Routes>
            </Router>
        </Main>
    </div>
}

const PageHeader = () => {

    const {logout, user} = useAuth()

    return <Header between={true}>
        <HeaderLeft gap={true}>
            <Button type={'link'} onClick={resetRoute}>
                <SoftwareLogo width={'18rem'} color={'rgb(38, 132,255)'}/>
            </Button>
            <h2>项目</h2>
            <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
            <Dropdown overlay={
                <Menu>
                    <Menu.Item key={'logout'}>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <Button type={'link'} onClick={logout}>登出</Button>
                    </Menu.Item>
                </Menu>}>
                <Button type={'link'} onClick={e => e.preventDefault()}>Hi，{user?.name} </Button>
            </Dropdown>
        </HeaderRight>
    </Header>
}

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled(Row)``

const Main = styled.main`
  height: calc(100vh - 6rem);
`
