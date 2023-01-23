import { Application } from 'express'
import request from 'supertest'
import AppBootstrapper from '../../../../__test__/appBootstrapper'



describe('POST /auth/signup  register user',()=>{
let app:Application

    const { testApp } = AppBootstrapper()
    app = testApp




it('registers new user', async ()=>{
  const response =  await request(app).post('/auth/signup').send({email:'user@email.com', password:'Qwerty1234'})

  expect(response.statusCode).toEqual(201)

})

it('gives a email validation error when signup with bad email format ', async ()=>{
  const response =  await request(app).post('/auth/signup').send({email:'usel.com', password:'Qwerty1234'})

  expect(response.statusCode).toEqual(400)

})


it('gives a email validation error when no password field ', async ()=>{
  const response =  await request(app).post('/auth/signup').send({email:'user@email.com', password:''})

  expect(response.statusCode).toEqual(400)

})







})