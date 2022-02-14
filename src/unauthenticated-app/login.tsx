
import {useAuth} from "../context/auth-context";
import {Form, Input} from 'antd';
import { LongButton } from "unauthenticated-app";
import {useAsync} from "../utils/use-async";
//const apiURL = process.env.REACT_APP_API_URL

export const LoginScreen = ({onError}:{onError:(error:Error) => void}) => {

    const {login} = useAuth()
    const {run, isLoading} = useAsync()
    const handleSubmit = (values: {username:string, password:string}) => {
        run(login(values)).catch(onError)
    }
    return <Form onFinish={handleSubmit}>
        <Form.Item name={'username'} rules={[{required:true, message:'please input username'}]}>
            <Input placeholder={'username'} type="text" id={'username'}/>
        </Form.Item>
        <Form.Item name={'password'} rules={[{required:true, message:'please input password'}]}>
            <Input placeholder={'password'} type="password" id={'password'}/>
        </Form.Item>
        <Form.Item>
            <LongButton loading={isLoading} htmlType={"submit"} type={'primary'}>登录</LongButton>
        </Form.Item>
    </Form>
}