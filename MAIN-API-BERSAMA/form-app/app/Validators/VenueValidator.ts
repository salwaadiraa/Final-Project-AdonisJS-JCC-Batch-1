import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VenueValidator {
  constructor (protected ctx: HttpContextContract) {
  }

 /*
  * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
  *
  * For example:
  * 1. The username must be of data type string. But then also, it should
  * not contain special characters or numbers.
  *

  * schema.string({}, [ rules.alpha() ])
  *
  *
  * 2. The email must be of data type string, formatted as a valid
  * email. But also, not used by any other user.
  *

  * schema.string({}, [
  * rules.email(),
  * rules.unique({ table: 'users', column: 'email' }),
  * ])
  *
  */

 //tugas15
 //validator venue
  public schema = schema.create({
    name: schema.string({},[
      rules.alpha(),
      rules.minLength(4),
    ]),
    address: schema.string({},[
      rules.alpha(),
    ]),
    phone: schema.string({}, [
      rules.mobile()
    ])
  })

 
 /**
  * Custom messages for validation failures. You can make use of dot notation (.)
  * for targeting nested fields and array expressions (*) for targeting all
  * children of an array. For example:
  *
  * {
  * 'profile.username.required': 'Username is required',
  * 'scores.*.number': 'Define scores as valid numbers'
  * }
  *
  */
  public messages = {
    'required': 'the {{field}} is required to create new venues',
    'name.alpha': 'the {{field}} must be characters without number and symbols',
    'phone.mobile': 'phone is invalid'
  }
}