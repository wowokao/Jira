import {useAuth} from "../context/auth-context";
import {Form, Input} from 'antd'
import {LongButton} from "unauthenticated-app";
//const apiURL = process.env.REACT_APP_API_URL

export const RegisterScreen = ({onError}: { onError: (error: Error) => void }) => {

    const {register} = useAuth()

    const handleSubmit = ({cpassword,...values}: { username: string, password: string, cpassword:string }) => {
        if(cpassword !== values.password){
            onError(new Error('请确认两次输入的密码相同'))
            return
        }
        register(values).catch(onError)
    }
    return <Form onFinish={handleSubmit}>
        <Form.Item name={'username'} rules={[{required: true, message: 'please input username'}]}>
            <Input placeholder={'username'} type="text" id={'username'}/>
        </Form.Item>
        <Form.Item name={'password'} rules={[{required: true, message: 'please input password'}]}>
            <Input placeholder={'password'} type="password" id={'password'}/>
        </Form.Item>
        <Form.Item name={'cpassword'} rules={[{required: true, message: 'confirm password'}]}>
            <Input placeholder={'confirm password'} type="password" id={'cpassword'}/>
        </Form.Item>
        <Form.Item>
            <LongButton htmlType={"submit"} type={'primary'}>注册</LongButton>
        </Form.Item>
    </Form>
}