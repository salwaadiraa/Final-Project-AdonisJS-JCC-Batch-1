/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
}).as('home')


Route.group(()=> {
  Route.group(() => {
   Route.group(() => {
      Route.resource('venues', 'VenuesController').apiOnly()
      Route.resource('venues.fields', 'FieldsController').apiOnly()
    }).middleware('Role')

    Route.group(() => {
      Route.post('fields/:id/bookings', 'BookingsController.store').as('booking.store')
      Route.put('fields/:field_id/bookings/:id','BookingsController.update').as('booking.update')
      Route.put('bookings/:id', 'BookingsController.join').as('booking.join')
      Route.get('bookings/:id', 'BookingsController.show').as('booking.show')
      Route.get('bookings', 'BookingsController.index').as('booking.index')
      Route.delete('bookings/:booking_id', 'BookingsController.destroy').as('booking.destroy')
      //Route.resource('fields.bookings', 'BookingsController').apiOnly()
    })//.middleware('Role:user')
  }).middleware(['auth', 'verify'])

  Route.post('register', 'AuthController.register').as('auth.register')
  Route.post('login', 'AuthController.login').as('auth.login')
  Route.post('otp-confirmation', 'AuthController.otp_verification').as('auth.otp_verification') 
}).prefix('/api/v1')
