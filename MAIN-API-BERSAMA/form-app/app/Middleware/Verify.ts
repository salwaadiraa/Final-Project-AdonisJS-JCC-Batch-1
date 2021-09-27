import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Verify {
  public async handle ({response, auth}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    
    //cara cek user yang sedang login
    let isVerified = auth.user?.isVerified

    //pengecekan user 
    if(isVerified) {
    //kalo dicek true berarti eksekusi di await next
    await next()
    } else {
      //selain itu atau false eksekusi di else
      return response.unauthorized({messages: 'Akun Belum Terverifikasi'})
    }
  }
  
}
