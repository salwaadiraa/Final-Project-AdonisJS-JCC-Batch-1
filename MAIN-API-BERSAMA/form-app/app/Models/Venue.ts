//tugas 17 relasi venue fields
import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Field from 'App/Models/Field'

//nyambung ke table venues
export default class Venue extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  //tambah column sesuai yang ada di migration nya venues
  @column()
  public name: string

  @column()
  public address: string

  @column()
  public phone: string
   
  //timestamps
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //relasi has many dari venue ke field 1 venue bisa punya banyak lapang
  @hasMany(() => Field)
  public fields: HasMany<typeof Field>
}
