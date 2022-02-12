
import {useAuth} from "../context/auth-context";
import { Form, Input} from 'antd'
import { LongButton } from "unauthenticated-app";
//const apiURL = process.env.REACT_APP_API_URL

export const RegisterScreen = () => {

    const {register} = useAuth()

    const handleSubmit = (values: {username:string, password:string}) => {
        register(values)
    }
    return <Form onFinish={handleSubmit}>
        <Form.Item name={'username'} rules={[{required:true, message:'please input username'}]}>
            <Input placeholder={'username'} type="text" id={'username'}/>
        </Form.Item>
        <Form.Item name={'password'} rules={[{required:true, message:'please input password'}]}>
            <Input placeholder={'password'} type="password" id={'password'}/>
        </Form.Item>
        <Form.Item>
            <LongButton htmlType={"submit"} type={'primary'}>注册</LongButton>
        </Form.Item>
    </Form>
}