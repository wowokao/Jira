import qs from "qs";
import * as auth from 'auth-provider'
import {useAuth} from "../context/auth-context";

const apiURL = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
    token?: string,
    data?: object
}

export const http = async (endpoint: string, {data, token, headers, ...customConfig}: Config = {}) => {
    // customConfig  可以覆盖前面的配置
    const config = {
        method: "GET",
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            'Content-Type': data ? 'application/json' : ""
        },
        ...customConfig
    }

    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }

    return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
        if (response.status === 401) {
            await auth.logout()
            window.location.reload()
            return Promise.reject({message: 'Please login again!'})
        }
        const data = await response.json()
        if (response.ok) {
            return data
        } else {
            // fetch 不会抛出response异常, 需要手动抛出， 但是axios可以捕获异常
            return Promise.reject(data)
        }
    })
}

export const useHttp = () => {
    const {user} = useAuth()
    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token})
}