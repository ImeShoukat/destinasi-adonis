import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'wisatas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nama_wisata', 255).notNullable()
      table.text('deskripsi').notNullable()
      table.integer('biaya_masuk').notNullable()
      table.string('gambar').notNullable()
      table.integer('kategori_id').unsigned().notNullable()
      table.integer('kota_id').unsigned().notNullable()
      table
        .foreign('kategori_id')
        .references('id')
        .inTable('kategoris')
        .onDelete('CASCADE')

      table
        .foreign('kota_id')
        .references('id')
        .inTable('kotas')
        .onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
