import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import Database from '@ioc:Adonis/Lucid/Database';
import VenueValidator from 'App/Validators/VenueValidator';

//tugas 16
//model
import Venue from 'App/Models/Venue'
//import UserValidator from 'App/Validators/UserValidator';

//langsung ke bagian store tugas 16
//ubah ke model orm
export default class VenuesController {
    public async index ({request, response}: HttpContextContract) {
        if(request.qs().name){
            let name = request.qs().name
            //Query Builder
            // let venuesFiltered = await Database.from('venues').where('name', name).select('id', 'name', 'address', 'phone')
            let venuesFiltered = await Venue.findBy("name", name)
            return response.status(200).json({message: 'success get venues', data: venuesFiltered })
        }
        // let venues = await Database.from('venues').select('*')
        let venues = await Venue.all()
        return response.status(200).json({message: 'success get venues', data: venues })
    }
    
    public async store({request, response }: HttpContextContract) {
        try {
            const data = await request.validate(VenueValidator);
            //query builder
            //let newVenue = await Database.table('venues').returning('id').insert({
               // name: request.input('name'),
               // address: request.input('address'),
               //phone: request.input('phone'),
            //})

            //Model ORM
            //cara instance baru

            //let newVenue = new Venue();
            //newVenue.name = request.input('name')
            //newVenue.address = request.input('address')
            //newVenue.phone = request.input('phone')

            const newVenue = await Venue.create(data)
            //simpan ke db metode .save
            //pake await karena memanggil function sql 
            await newVenue.save()
            console.log("id: ", newVenue.id) //true diterminal
            response.created({message : 'success venues created!' })
        } catch (error) {
            response.unprocessableEntity({error: error.messages})
        }
    }
    
    //agar tidak array pake show diakhir ditambah first
    //first or fail error 404
    public async show({params, response,}: HttpContextContract) {
        //Query builder 
        //let venue = await Database.from('venues').where('id', params.id).select('id', 'name', 'address', 'phone').firstOrFail()
        
        //cara model ORM
        let venue = await Venue.query().where('id', params.id).preload('fields').firstOrFail()
        return response.ok({ status: 'berhasil get data venue by id', data: venue})
    }
 
    //update
    public async update({request, response, params}: HttpContextContract) {
        let id = params.id
        //cara query builder
        //let affectedRows = await Database.from('venues').where('id', id).update({
            //name: request.input('name'),
            //address: request.input('address'),
            //phone: request.input('phone'),
        //})

        //cara model ORM
        let venue = await Venue.findOrFail(id)
        venue.name = request.input('name')
        venue.address = request.input('address')
        venue.phone = request.input('phone')

        //agar otomatis creat at update at berubah juga
        venue.save()
        return response.ok({ messages: 'success update venues' })
    }
    //delete
    public async destroy({params, response}: HttpContextContract) {
        //Cara Query Builder
        //await Database.from('venues').where('id', params.id).delete
        
        //Cara Model ORM
        let venue = await Venue.findOrFail(params.id)
        await venue.delete()
        return response.ok({ messages: 'deleted!' })
    }
    //return nya cuman 1 karena true false
}

