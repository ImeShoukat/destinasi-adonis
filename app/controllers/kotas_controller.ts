import type { HttpContext } from '@adonisjs/core/http'
import Kota from '#models/kota'

export class KotaController {
  async index({ view }: HttpContext) {
    const data = await Kota.all()
    return view.render('pages/kota/index', { data })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/kota/create')
  }

  async store({ request, response }: HttpContext) {
    await Kota.create(request.only(['namaKota']))
    return response.redirect('/kota')
  }

  async edit({ params, view }: HttpContext) {
    const kota = await Kota.findOrFail(params.id)
    return view.render('pages/kota/edit', { kota })
  }

  async update({ params, request, response }: HttpContext) {
    const kota = await Kota.findOrFail(params.id)
    kota.merge(request.only(['namaKota']))
    await kota.save()
    return response.redirect('/kota')
  }

  async destroy({ params, response }: HttpContext) {
    const kota = await Kota.findOrFail(params.id)
    await kota.delete()
    return response.redirect('/kota')
  }
}