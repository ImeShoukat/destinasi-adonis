import vine from '@vinejs/vine'

export const createKategoriValidator = vine.compile(
  vine.object({
    namaKategori: vine.string().trim().minLength(3).unique(async (db, value) => {
        const match = await db.from('kategoris').where('nama_kategori', value).first()
        return !match
    }),
  })
)

export const updateKategoriValidator = vine.compile(
    vine.object({
      namaKategori: vine.string().trim().minLength(3).unique(async (db, value, field) => {
          const match = await db.from('kategoris').where('nama_kategori', value).whereNot('id', field.meta.id).first()
          return !match
      }),
    })
  )