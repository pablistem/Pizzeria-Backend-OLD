import { Application } from 'express'
import request from 'supertest'
import AppBootstrapper from '../../../../__test__/appBootstrapper'



describe('POST /auth/signup  register user',()=>{
let app:Application
beforeEach(()=>{
    const { testApp } = AppBootstrapper()
    app = testApp

})


it('registers new user', async ()=>{
  const response =  await request(app).post('/auth/signup').send({email:'user@email.com', password:'Qwerty1234'})

  expect(response.body).toEqual({ok:'ok'})

})






})