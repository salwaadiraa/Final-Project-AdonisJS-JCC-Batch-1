//tugas 17
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
//import UserValidator from 'App/Validators/UserValidator'
import { schema } from '@ioc:Adonis/Core/Validator'
import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AuthController {



    public async register({request, response}: HttpContextContract) {
      console.log(request.body())  
      try {
          //const data = await request.validate(UserValidator)
          
          const name = request.input('name')
          const email = request.input('email')
          const password = request.input('password')
          const role = request.input('role')

          console.log('setelah validate')
            //cara cepat ambil request dari const data yang sudah di validasi diatas
          //const newUser = await User.create(data)
          const newUser = await User.create({ name, email, password, role })

          //generate random otp
          const otp_code = Math.floor(100000 + Math.random() * 900000)

          let saveCode = await Database.table('otp_codes').insert({otp_code: otp_code, user_id: newUser.id})
          await Mail.send((message) =>{
            message
              .from('admin@sanberdev.com')
              .to(email)
              .subject('Welcome Onboard!')
              .htmlView('email/otp_verification', { otp_code })

          })
          return response.created({ messages: 'register success, please check mail and verify your otp code' })
        } catch (error) {
          return response.unprocessableEntity({ messages: error.messages})
        }
    }

 
    public async login({request, response, auth}: HttpContextContract) {
      console.log(request.body())
      try {
        const loginSchema = schema.create({
          email: schema.string({ trim: true}),
          password: schema.string({ trim: true})
        })

        const payLoad = await request.validate({ schema: loginSchema})

        const token = await auth.use('api').attempt(payLoad.email, payLoad.password)

        return response.ok({ status: 'login success', data: token})

      } catch (error) {
        //kondisi untuk error messages
        //error req tidak diisi
        if (error.guard) {
          console.log(error.message)
          return response.badRequest({ message: 'login error', error: error.message })
        } else{
          //error validator salah 1 tidak di isi
          console.log(error.messages)
          return response.badRequest({ message: 'login error', error: error.messages })
        }
      }
    }



    public async otp_verification({request, response}: HttpContextContract) {
      const otp_code = request.input('otp_code')
      const email = request.input('email')
      
      const user = await User.findByOrFail('email', email)

      const otpCheck = await Database.query().from('otp_codes').where('otp_code', otp_code).first()

      if (user?.id == otpCheck.user_id) {
        user.isVerified = true
        await user?.save()
        return response.status(200).json({ messages: 'Berhasil Konfirmasi OTP'})
      } else {
        return response.status(400).json({ message: 'Gagal Verifikasi OTP'})
      }
      //console.log()
    }


}
