import BaseSchema from '@ioc:Adonis/Lucid/Schema'
//import { schema } from '@ioc:Adonis/Core/Validator'

export default class Fields extends BaseSchema {
  protected tableName = 'fields'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').unique().notNullable()
      table.enum('type', ['futsal', 'mini soccer', 'basket ball'] ) 
      table.integer('venue_id').unsigned().references('id').inTable('venues')
      table.timestamps(true, true)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      //table.timestamp('created_at', { useTz: true })
      //table.dateTime('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

/*table.enum('type', ['futsal', 'mini soccer', 'basket ball']),
table.integer('venue_id'),
table.foreign('venue_id').references('id').inTable('venues')
*/