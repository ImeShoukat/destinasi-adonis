import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { BelongsTo, belongsTo } from '@adonisjs/lucid/orm'

import Wisata from './wisata.js'
import User from './user.js'

export default class Ulasan extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  
  @column()
  declare ulasan: string
  @column()
  declare rating: number

  @column()
  declare wisataId: number

  @column()
  declare userId: number

  @belongsTo(() => Wisata)
  declare wisata: BelongsTo<typeof Wisata>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}