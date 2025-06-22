import type { HttpContext } from '@adonisjs/core/http'
import Ulasan from '#models/ulasan'
import { createUlasanValidator } from '#validators/ulasan'

export default class UlasansController {
  async store({ request, response, auth, session }: HttpContext) {
    const payload = await request.validateUsing(createUlasanValidator)
    const user = auth.user!

    const existingUlasan = await Ulasan.query()
      .where('user_id', user.id)
      .where('wisata_id', payload.wisataId)
      .first()

    if (existingUlasan) {
      session.flash('error', 'Anda sudah memberikan ulasan untuk wisata ini.')
      return response.redirect().back()
    }

    await Ulasan.create({
      ...payload,
      userId: user.id,
    })

    session.flash('notification', 'Terima kasih atas ulasan Anda!')
    return response.redirect().back()
  }
}