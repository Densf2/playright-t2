import { request, expect, APIRequestContext } from "@playwright/test";

exports.ApiHelper = class ApiHelper {
    // async getToken(data) {
    //     const response = await playwright.request('/api/auth/login', {
    //         data,
    //         headers: {
    //             "Content-Type": "application/json",
    //         }
    //     })
    //     expect(response.ok()).toBeTruthy()
    //     const serializeResponse = await response.json()
    //     expect(serializeResponse).toHaveProperty("token")
    //     return serializeResponse.token
    // }
    constructor() {
        this.endPoint = '/api/auth/login';
    }


    async getToken(payload) {
        const contex = await request.newContext()
        const response = await contex.post(
            `${this.endPoint}`, {
            data: {
                email: payload.email,
                password: payload.pwd
            },
            headers: {
                "Content-Type": "application/json",
            },
        })
        expect(response.ok()).toBeTruthy()
        const body = await response.json()
        expect(body).toHaveProperty('token')
        return body.token
    }

}
