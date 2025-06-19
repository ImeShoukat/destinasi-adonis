import { DateTime } from 'luxon'
import { BaseModel, column, dateColumn, hasMany } from '@adonisjs/lucid/orm'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

import Kota from './kota.js'
import Kategori from './kategori.js'
import Ulasan from './ulasan.js'

export default class Wisata extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama_wisata: string

  @column()
  declare deskripsi: string

  @column()
  declare kotaId: number

  @column()
  declare kategoriId: number

  @hasMany(() => Ulasan)
  public ulasan!: HasMany<typeof Ulasan>

  @column()
  declare biayaMasuk: number
  @belongsTo(() => Kota)
  declare kota: BelongsTo<typeof Kota>

  @belongsTo(() => Kategori)
  declare kategori: BelongsTo<typeof Kategori>

  @column()
  declare gambar: string

  @dateColumn({ autoCreate: true })
  declare createdAt: DateTime

  @dateColumn({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}