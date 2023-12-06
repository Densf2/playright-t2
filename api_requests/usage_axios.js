// import axios from 'axios'
const axios = require('axios')
const {expect} = require('chai')

describe('Actions for dummy website', async() => {
    let baseUrl = 'https://dummyjson.com';
    let userId;
    let userName;
    let userPwd;
    let token;

    it.skip('Create user', async() => {
        const createUser = await axios.post('https://dummyjson.com/users/add',
        {
            'firstName': 'Muhammad',
            'lastName': 'Ovi',
            'age': 250,
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(createUser.data)
        userId = createUser.data.id
    })

    it('get user by id', async() =>{
        const getUser = await axios.get('https://dummyjson.com/users/1')
        // console.log(getUser.data)
        userName = getUser.data.username
        userPwd = getUser.data.password
    })

    it('getting credentials', async() => {
        const getTokenData = await axios.post(`${baseUrl}/auth/login`,
        {
            'username': userName,
            'password': userPwd,
            expiresInMins: 30
        },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
        })
        // console.log(getTokenData.data)
        token = getTokenData.data.token
    })

    it('create product', async() => {
        const createProduct = await axios.post(`${baseUrl}/products/add`,
        {
            'title': 'MyOwnProduct'
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
        })
        console.log(createProduct.data)
        expect(createProduct.status).equal(200)
    })

// updating lastName of user with id               
  it.skip('update user data', async () => {
    const updateUserData = await axios.patch('https://dummyjson.com/users/101',
    {
        'username': 'emailTut',
        'password': 'abc123',
    },
    {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    // console.log(updateUserData.data)
    console.log(updateUserData.statusText)
    })

})