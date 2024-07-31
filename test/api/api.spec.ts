import { test, expect } from '@playwright/test'

test.describe.parallel('API testing', () => {
  const baseUrl = 'https://reqres.in/api'
  test.skip('Simple API test - Assert Response Status', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/2`)
    expect(response.status()).toBe(200)
  })

  test('Simple API test - Assert Invalid Endpoint', async ({ request }) => {
    const response = await request.get(`${baseUrl}/unknown/23`)
    expect(response.status()).toBe(404)
  })

  test('GET request - Get User Details', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/2`)
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.data.id).toBe(2)
    expect(responseBody.data.email).toBe('janet.weaver@reqres.in')
    expect(responseBody.data.first_name).toBe('Janet')
    expect(responseBody.data.last_name).toBe('Weaver')
    expect(responseBody.data.avatar).toBeTruthy()
  })

  test('POST request - Create User', async ({ request }) => {
    const response = await request.post(`${baseUrl}/users`, {
      data: {
        name: 'morpheus',
        job: 'leader',
      },
    })
    expect(response.status()).toBe(201)
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.name).toBe('morpheus')
    expect(responseBody.job).toBe('leader')
    expect(responseBody.id).toBeTruthy()
    expect(responseBody.createdAt).toBeTruthy()
  })

  test('POST reqeust - login successful', async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
      data: { email: 'eve.holt@reqres.in', password: 'cityslicka' },
    })
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.token).toBeTruthy()
  })

  test('POST request - login unsuccessful', async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
      data: { email: 'eve.holt@reqres.in' },
    })
    expect(response.status()).toBe(400)
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.error).toBe('Missing password')
  })

  test('PUT request - update user', async ({ request }) => {
    const response = await request.put(`${baseUrl}/users/2`, {
      data: {
        name: 'morpheus',
        job: 'zion resident',
      },
    })
    expect(response.status()).toBe(200)
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.name).toBe('morpheus')
    expect(responseBody.job).toBe('zion resident')
    expect(responseBody.updatedAt).toBeTruthy()
  })

  test('DELETE request - delete user', async ({ request }) => {
    const response = await request.delete(`${baseUrl}/users/2`)
    expect(response.status()).toBe(204)
  })
})
