import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { BelongsTo, belongsTo } from '@adonisjs/lucid/orm'

import Kota from './kota.js'
import Kategori from './kategori.js'

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

  @column()
  declare biayaMasuk: number

  @belongsTo(() => Kota)
  declare kota: BelongsTo<typeof Kota>

  @belongsTo(() => Kategori)
  declare kategori: BelongsTo<typeof Kategori>
}