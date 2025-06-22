import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'ulasans'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('wisata_id').unsigned().references('wisatas.id').onDelete('CASCADE')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('rating').notNullable().unsigned().checkBetween([1, 5])
      table.text('komentar').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }
  async down() { this.schema.dropTable(this.tableName) }
}