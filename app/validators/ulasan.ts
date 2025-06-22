import vine from '@vinejs/vine'

export const createUlasanValidator = vine.compile(
  vine.object({
    wisataId: vine.number(),
    rating: vine.number().min(1).max(5),
    komentar: vine.string().trim().optional(),
  })
)