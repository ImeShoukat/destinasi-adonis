import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Wisata from './wisata.js'
import User from './user.js'

export default class Ulasan extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare wisataId: number

  @column()
  declare userId: number

  @column()
  declare rating: number

  @column()
  declare komentar: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Wisata)
  declare wisata: BelongsTo<typeof Wisata>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}