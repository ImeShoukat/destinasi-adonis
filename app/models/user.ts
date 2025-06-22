import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Ulasan from './ulasan.js'

// Definisikan AuthFinder mixin di sini.
// Mixin ini akan menangani hashing password dan verifikasi secara otomatis.
const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

// Gunakan 'compose' untuk menggabungkan BaseModel dengan AuthFinder
export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  // Kita gunakan 'name' sesuai permintaan Anda
  @column()
  declare name: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare role: 'admin' | 'user'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Ulasan)
  declare ulasans: HasMany<typeof Ulasan>

  // TIDAK PERLU HOOK @beforeSave DI SINI
  // Semua sudah ditangani oleh mixin AuthFinder.
}