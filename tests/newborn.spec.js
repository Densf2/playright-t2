import { test, expect, request } from '@playwright/test';
import { MainPageNewborn } from './pages/mainPageNewborn';
// import { getToken } from '../helpers/helpers';
// import { ApiHelper } from '../helpers/apiHelper')

test.describe('Verification steps for newborn website', () => {
    const USER = {
        email: 'email@dmytro.com',
        pwd: 'abc123',
        token: '',
        categoryId: '',
        productName: 'MyOwnProduct',
        cost: 22
    }
    test.beforeAll(async({request}) => {
        // const apirequest = new ApiHelper(request)
        const response = await request.post(
            '/api/auth/login',{
            data: {
            email: USER.email,
            password: USER.pwd
            },
            headers: {
                "Content-Type": "application/json",
            },
        })
        expect(response.ok()).toBeTruthy()
        const body = await response.json()
        expect(body).toHaveProperty('token')
        USER.token = body.token
        console.log('AUTH', USER.token)
        // USER.token = await ApiHelper.getToken(USER.email, USER.pwd)
        // USER.token = await ApiHelper.g(USER.email, USER.pwd)
        // USER.token = await getToken(request)
        // console.log(USER.token)
    })

    test.beforeEach(async ({page}) => {
        page.addInitScript((value) => {
            window.localStorage.setItem('auth-token', value)
        }, USER.token)
        await page.goto('/overview')
    })

    // test.beforeEach(async({ page }) => {
    //     await page.goto('/login')
    //     await page.getByLabel('Email:').fill('email@dmytro.com')
    //     await page.getByLabel('Пароль:').fill('abc123')
    //     await page.locator("button[type='submit']").click()

    // // await expect(page.locator('span.card-title').nth(0)).toBeVisible()
    //     await expect(page.locator('body > app-root > app-site-layout > ul > li.bold.last > a')).toBeVisible()
    //     await page.goto('/overview')
    // })



    test('check the state after open page', async ({ page })=>{
        // await page.goto('/')
        await expect(page.locator('span.card-title').nth(0)).toBeVisible()
        await expect(page.locator('div.row span.card-title').nth(0)).toHaveText('Виручка:')
    })

    test('usage POM', async ({ page }) => {
        const mainpagenewborn = new MainPageNewborn(page)
        mainpagenewborn.verifyLogoutVisible()
    })

    test('without POM', async({ page }) => {
        await expect(page.locator('ul > li.bold.last > a')).toHaveText('Вийти')
    })

    test.skip('using the request API for category', async({ request }) => {
        const response = await request.get()
    })

    test('Create a category', async ({ request, page }) => {
        const createCategory = await request.post('/api/category', {
          data: {
            name: 'NewCategory2',
          },
          headers: {
            'Accept': "application/json",
            'Authorization': `${USER.token}`,
          },
        });
        console.log('Response Status Code:', createCategory.status());
        console.log('Response Body:', await createCategory.text());
        expect(createCategory.ok()).toBeTruthy();
        const createdCategory = await createCategory.json();
        USER.categoryId = createdCategory._id;
    });

    test('GET a category', async ({ request, page }) => {
        const getCategory = await request.get('/api/category', {
          headers: {
            'Accept': "application/json",
            'Authorization': `${USER.token}`,
          },
        });
        expect(getCategory.ok()).toBeTruthy();
        const categories = await getCategory.json();
        const createdCategoryExists = categories.some(category => category._id === USER.categoryId);
        expect(createdCategoryExists).toBeDefined();
        //Check if the created category is visible on the UI
        await page.goto(`/categories/${USER.categoryId}`); 
        await page.waitForTimeout(3000)
        await expect(page.locator("div.page-title > h4")).toBeVisible(); 
    });

    test('Create a position', async({ request, page }) => {
        const createProduct = await request.post("/api/position", {
            data: { category: USER.categoryId, cost: USER.cost, name: USER.productName },
            headers: { authorization: `${USER.token}` },
        })
      
          expect(createProduct.status(201)).toBeTruthy()
      
          const bodyProduct = await createProduct.json()
          expect(bodyProduct).toHaveProperty("_id")
          const productId = bodyProduct._id
          console.log("productId:", productId)

          //Check that position visible
          await page.goto(`/categories/${USER.categoryId}`);  
          await page.waitForTimeout(3000)
          await expect(page.locator('a.collection-item span').first()).toHaveText(USER.productName +' '+USER.cost+' грн.')
    })

    test('Remove Category', async({request }) => {
        const removeCategory = await request.delete(`/api/category/${USER.categoryId}`, {
            headers: { authorization: `${USER.token}` },
        })

        expect(removeCategory.status(200)).toBeTruthy()
    })


})
