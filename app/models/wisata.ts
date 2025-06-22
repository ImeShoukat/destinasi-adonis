import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Kategori from './kategori.js'
import Kota from './kota.js'
import Ulasan from './ulasan.js'

export default class Wisata extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama: string

  @column()
  declare deskripsi: string

  @column()
  declare kotaId: number

  @column()
  declare kategoriId: number

  @column({
    prepare: (value: number) => Number(value),
  })
  declare biayaMasuk: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Kategori)
  declare kategori: BelongsTo<typeof Kategori>

  @belongsTo(() => Kota)
  declare kota: BelongsTo<typeof Kota>

  @hasMany(() => Ulasan)
  declare ulasans: HasMany<typeof Ulasan>

  // Computed Property untuk JSON output
  public get ulasans_avg_rating() {
    return this.$extras.ulasans_avg_rating
  }

  public get ulasans_count() {
    return this.$extras.ulasans_count
  }
}