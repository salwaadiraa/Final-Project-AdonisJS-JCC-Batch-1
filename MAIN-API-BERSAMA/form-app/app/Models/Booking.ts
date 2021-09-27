import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Field from './Field'
import User from './User'


export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public playDateStart: DateTime

  @column.dateTime()
  public playDateEnd: DateTime

  @column()
  public title: string

  @column()
  public userId: number

  @column()
  public bookingId: number 

  @column()
  public fieldId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //relasi bookings ke fields
  @belongsTo(() => Field)
  public field: BelongsTo<typeof Field> 

  //relasi booking ke user 
  @belongsTo(() => User)
  public bookingUser: BelongsTo<typeof User>

  @manyToMany(() => User,{
  pivotTable:'schedules'
  })

  public players: ManyToMany<typeof User>

  //public serializeExtras=true
}