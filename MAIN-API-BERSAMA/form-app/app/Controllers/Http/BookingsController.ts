import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Booking from 'App/Models/Booking'
import Field from 'App/Models/Field'
//import User from 'App/Models/User'
import BookingValidator from 'App/Validators/BookingValidator'
import Database from '@ioc:Adonis/Lucid/Database'

export default class BookingsController {


    public async index({ request, response}: HttpContextContract) {
        if(request.qs().title){
            let title = request.qs().title
            let bookingFiltered = await Booking.findBy("title", title)
            return response.status(200).json({message: 'Berhasil get booking', data: bookingFiltered })
        }
        let booking = await Booking.all()
        return response.status(200).json({message: 'Berhasil get booking', data: booking })
    }



    public async store({ request, params, response, auth }: HttpContextContract) {
        
        console.log(request.body())
        const field = await Field.findByOrFail('id', params.field_id)
        const user = auth.user!

        const payLoad = await request.validate(BookingValidator)
        console.log('setelah validate')

        const booking = new Booking()
        booking.playDateStart = payLoad.play_date_start
        booking.playDateEnd = payLoad.play_date_end
        booking.title = payLoad.title

        booking.related('field').associate(field)
        user.related('myBookings').save(booking)

        return response.created({ message: 'Berhasil Booking', data: booking})
    }

    public async show({params, response }: HttpContextContract) {
        try {
        const booking = await Booking.query()
            .select('id', 'play_date_start', 'play_date_end')
            .where('id', '=', params.id)
            .withCount('players', (query) => {
                query.as('players_count')
        })
            .preload('players', (query) => {
                query.select('id', 'name', 'email')
        })
            .firstOrFail()
        const {id, play_date_start, play_date_end, players} = booking.toJSON()
        const players_count = booking.$extras.players_count
        response.ok({ message : 'success', data: {id, play_date_start, play_date_end, players_count, players} })
        } catch (error) {
        if (error.messages) {
            return response.unprocessableEntity({ message: 'failed', error: error.messages})
        } else {
            return response.unprocessableEntity({ message: 'failed', error: error.message})
        }
    }
    }

    public async join({ response, auth, params}: HttpContextContract){
        const booking = await Booking.findOrFail(params.id)
        //console.log(params.id)
        let user = auth.user!
        const checkJoin = await Database.from('schedules').where('booking_id', params.id).where('user_id', user.id).first()

        if (!checkJoin) {
            await booking.related('players').attach([user.id])
        } else {
            await booking.related('players').detach([user.id])
        }

        return response.ok({message: 'success', data: 'successfully join/unjoin'})

    }

    public async update({request, response, params}: HttpContextContract) {
        let id = params.id
        let booking = await Booking.findOrFail(id)
        booking.title = request.input('title')
        booking.playDateStart = request.input('play_date_start')
        booking.playDateEnd = request.input('play_date_end')

        booking.fieldId = request.input('field_id')
      
        booking.save()
          return response.ok({ messages: 'updated!'})
      }
      public async destroy({params, response}: HttpContextContract) {
        let booking = await Booking.findOrFail(params.id)
        await booking.delete()
         return response.ok({ messages: 'deleted!' })
    
    }
        
}
