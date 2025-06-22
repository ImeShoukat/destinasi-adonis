import vine from '@vinejs/vine'

export const createKotaValidator = vine.compile(
  vine.object({
    namaKota: vine.string().trim().minLength(3).unique(async (db, value) => {
        const match = await db.from('kotas').where('nama_kota', value).first()
        return !match
    }),
  })
)

export const updateKotaValidator = vine.compile(
    vine.object({
        namaKota: vine.string().trim().minLength(3).unique(async (db, value, field) => {
            const match = await db.from('kotas').where('nama_kota', value).whereNot('id', field.meta.id).first()
            return !match
        }),
    })
  )