import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'wisatas'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nama').notNullable()
      table.text('deskripsi').notNullable()
      table.integer('kota_id').unsigned().references('kotas.id').onDelete('CASCADE')
      table.integer('kategori_id').unsigned().references('kategoris.id').onDelete('CASCADE')
      table.decimal('biaya_masuk', 12, 2).notNullable().defaultTo(0)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }
  async down() { this.schema.dropTable(this.tableName) }
}