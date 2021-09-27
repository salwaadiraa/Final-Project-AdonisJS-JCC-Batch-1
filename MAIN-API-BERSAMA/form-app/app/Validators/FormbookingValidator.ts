import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FormbookingValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	/*
	 * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
	 *
	 * For example:
	 * 1. The username must be of data type string. But then also, it should
	 *    not contain special characters or numbers.
	 *    ```
	 *     schema.string({}, [ rules.alpha() ])
	 *    ```
	 *
	 * 2. The email must be of data type string, formatted as a valid
	 *    email. But also, not used by any other user.
	 *    ```
	 *     schema.string({}, [
	 *       rules.email(),
	 *       rules.unique({ table: 'users', column: 'email' }),
	 *     ])
	 *    ```
	 */
  public schema = schema.create({
	nama: schema.string({},[
		rules.alpha(),
	] ),
	venue : schema.string({},[
		rules.alpha()
	] ),
	waktu : schema.date({
		//contoh input format waktu : 08-November-2002
		format: 'dd-MMMM-yyyy'
	}, [
		rules.after('today')
	])
  })

	/**
	 * Custom messages for validation failures. You can make use of dot notation `(.)`
	 * for targeting nested fields and array expressions `(*)` for targeting all
	 * children of an array. For example:
	 *
	 * {
	 *   'profile.username.required': 'Username is required',
	 *   'scores.*.number': 'Define scores as valid numbers'
	 * }
	 *
	 */
	//tampilan jika salah
  public messages = {
	'required': 'the {{field}} is required to create new form',
	'name.alpha': 'the {{field}} must be characters without number and symbols',
	'venue.alpha': 'venue is invalid',
	'telepon.mobile': 'telepon salah',
	'waktu.after': 'Booking Invalid, pastikan booking satu hari sebelumnya'
  }
}
