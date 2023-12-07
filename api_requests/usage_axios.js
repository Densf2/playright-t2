// import axios from 'axios'
const axios = require('axios')
const {expect} = require('chai')
const data = require('./data/dummy_data.json')
const fs = require('fs-extra')

describe('Actions for dummy website', async() => {;
    let userId;
    let userName;
    let userPwd;
    let token;

    it.skip('Create user', async() => {
        const createUser = await axios.post(`${data.baseUrl}/users/add`,
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

    it('create product', async() => {
        const createProduct = await axios.post(`${data.baseUrl}/products/add`,
        {
            'title': 'MyOwnProduct'
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.token}`
                }
        })
        console.log(createProduct.data)
        expect(createProduct.status).equal(200)
    })

// updating lastName of user with id               
  it.skip('update user data', async () => {
    const updateUserData = await axios.patch(`${data.baseUrl}/users/101`,
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