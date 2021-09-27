import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
//import Database from '@ioc:Adonis/Lucid/Database'
//import FieldsValidator from 'App/Validators/FieldsValidator'

//import model
import Field from 'App/Models/Field'
import Venue from 'App/Models/Venue'
//import VenuesController from './VenuesController'

export default class FieldsController {
  public async index ({request, response}: HttpContextContract) {
    if(request.qs().name){
      let name = request.qs().name 

      //MODEL ORM
      let fieldsFiltered = await Field.findBy("name", name)
      return response.status(200).json({message: 'success get data fields', data: fieldsFiltered })
    }
    let field = await Database.from('fields').select('*')
    return response.status(200).json({message: 'success get data fields', data: field })
  }

  public async store ({request, response, params}: HttpContextContract) {
    console.log(request.body())
        const venue = await Venue.findByOrFail('id', params.venue_id)
        console.log('setelah validate')
        //MODEL ORM
        const newField = new Field();
            newField.name = request.input('name')
            newField.type = request.input('type')
            await newField.related('venue').associate(venue)

            console.log("id: ", newField.id) //true diterminal
            
            return response.created({message: 'Berhasil menambakan data field baru', data: newField})
  }

  public async show ({params, response}: HttpContextContract) {
      const field = await Field.query().where('id', params.id).preload('bookings', (bookingQuery) => {
        bookingQuery.select(['title', 'play_date_start', 'play_date_end'])
      }).firstOrFail()
      
      return response.ok({message: 'success get fields by id', data: field})
  }

  public async update ({request, response, params}: HttpContextContract) {
      let id = params.id
      const venue = await Venue.findOrFail('id', params.venue_id)
      //Query Builder
      //await Database.from('fields').where('id', id).update({
          //name: request.input('name'),
          //type: request.input('type'),
          //venue_id: params.venue_id
      //})

      //MODEL ORM
      let field = await Field.findOrFail(id)
        field.name = request.input('name')
        field.type = request.input('type')
        //field.venue_id = request.input('venue_id')
        await field.related('venue').associate(venue)

        //agar otomatis creat at update at berubah juga
        field.save()
        return response.status(200).json({message: 'updated'})
  }

  public async destroy ({response, params}: HttpContextContract) {
      //let id = params.id
      //Query Builder
      //await Database.from('fields').where('id', id).delete()

      //Cara Model ORM
      let field = await Field.findOrFail(params.id)
      await field.delete()
      return response.ok({ messages: 'deleted!' })
  }
}