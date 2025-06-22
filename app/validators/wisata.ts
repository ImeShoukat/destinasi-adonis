import vine from '@vinejs/vine'

export const createWisataValidator = vine.compile(
  vine.object({
    nama: vine.string().trim().minLength(3),
    deskripsi: vine.string().trim().minLength(10),
    kotaId: vine.number().exists(async (db, value) => {
        const match = await db.from('kotas').where('id', value).first()
        return !!match
    }),
    kategoriId: vine.number().exists(async (db, value) => {
        const match = await db.from('kategoris').where('id', value).first()
        return !!match
    }),
    biayaMasuk: vine.number().min(0),
  })
)

export const updateWisataValidator = createWisataValidator