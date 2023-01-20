
import AppBootstrapper from '../../../../__test__/appBootstrapper'
import request from 'supertest'
import { Application } from 'express'

let app:Application


describe('GET /product', () => {
  

  beforeEach(()=>{
    const { testApp } = AppBootstrapper()
    app = testApp
  })
  it('Gets all products', async () => {
    const response = await request(app).get('/product')

    expect(await response.body.products).toBeDefined() 
  })
})
