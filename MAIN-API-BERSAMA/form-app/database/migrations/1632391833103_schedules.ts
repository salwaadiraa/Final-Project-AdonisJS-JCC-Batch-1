import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Schedules extends BaseSchema {
  protected tableName = 'schedules'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('booking_id').unsigned().references('id').inTable('bookings')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
