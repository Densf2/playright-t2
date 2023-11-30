
async function getToken() {
    const response = await request.post(
            '/api/auth/login',{
            data: {
            email: 'email@dmytro.com',
            password: 'abc123',
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

export default {getToken}