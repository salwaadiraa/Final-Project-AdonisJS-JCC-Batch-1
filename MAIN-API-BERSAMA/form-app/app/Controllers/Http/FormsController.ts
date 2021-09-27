import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FormvenueValidator from 'App/Validators/FormvenueValidator'
import FormbookingValidator from 'App/Validators/FormbookingValidator'



export default class FormsController {
    //index
    public async index({ request, response, params }: HttpContextContract){
        let name = request.qs().name
        response.status(200).json({ name, b: params.b})
    }
    //venue
    public async venue({ request, response }: HttpContextContract){
        try{
           await request.validate(FormvenueValidator);
            //  response.created({ message: 'createdd!'})    
           } catch (error){
               response.unprocessableEntity({ errors: error.messages})
           }
    }
    //booking
    public async bookings({ request, response }: HttpContextContract){
        try{
            await request.validate(FormbookingValidator);
            //response.created({ message: 'created!', data: payLoad})    
           } catch (error){
               response.unprocessableEntity({ errors: error.messages})
           }
    }
}