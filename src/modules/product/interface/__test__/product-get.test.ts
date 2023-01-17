
import AppBootstrapper from '../../../../__test__/appBootstrapper'
import request from 'supertest'

describe('GET /product', () => {
  const { app } = AppBootstrapper()

  it('Gets all products', async () => {
    await request(app).get('/product').then(({ body }) => { expect(body.products).toBeDefined() })
  })
})
