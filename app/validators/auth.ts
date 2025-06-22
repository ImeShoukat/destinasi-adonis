import vine from '@vinejs/vine'

/**
 * Validator untuk login user
 */
export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(8),
  })
)

/**
 * Validator untuk registrasi user baru
 */
export const registerValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(255),
    email: vine
      .string()
      .email()
      // Pengecekan unik dilakukan langsung di sini
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(8).confirmed(),
  })
)