import type { HttpContext } from '@adonisjs/core/http'

import Ulasan from '#models/ulasan'

export class UlasanController {
  async store({ request, response }: HttpContext) {
    await Ulasan.create(request.only(['wisataId', 'userId', 'rating', 'komentar']))
    return response.redirect('back')
  }
}