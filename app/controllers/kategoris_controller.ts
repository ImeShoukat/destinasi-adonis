import type { HttpContext } from '@adonisjs/core/http'
import Kategori from '#models/kategori'

export class KategoriController {
  async index({ view }: HttpContext) {
    const data = await Kategori.all()
    return view.render('pages/kategori/index', { data })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/kategori/create')
  }

  async store({ request, response }: HttpContext) {
    await Kategori.create(request.only(['namaKategori']))
    return response.redirect('/kategori')
  }

  async edit({ params, view }: HttpContext) {
    const kategori = await Kategori.findOrFail(params.id)
    return view.render('pages/kategori/edit', { kategori })
  }

  async update({ params, request, response }: HttpContext) {
    const kategori = await Kategori.findOrFail(params.id)
    kategori.merge(request.only(['namaKategori']))
    await kategori.save()
    return response.redirect('/kategori')
  }

  async destroy({ params, response }: HttpContext) {
    const kategori = await Kategori.findOrFail(params.id)
    await kategori.delete()
    return response.redirect('/kategori')
  }
}