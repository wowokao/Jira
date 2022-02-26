import {setupServer} from "msw/node"
import {rest} from "msw";
import {http} from "../utils/http";

const apiUrl = process.env.REACT_APP_API_URL

const server = setupServer()
//jest 单元测试, beforeAll是 test之前执行的回调
beforeAll(() => server.listen())
//重置mock路由
afterEach(() => server.resetHandlers())

//所有测试跑完后关闭mock路由
afterAll(() => server.close())

test('http方法，发送异步请求', async () => {
    const endpoint = 'test-endpoint'
    const mockResult = {mockValue: "mock"}

    server.use(
        rest.get(`${apiUrl}/${endpoint}`,
            (req,res, ctx) => res(ctx.json(mockResult)))
    )

    const result = await http(endpoint)
    expect(result).toEqual(mockResult)
})