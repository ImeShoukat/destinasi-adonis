import type { HttpContext } from '@adonisjs/core/http'
import Wisata from '#models/wisata'
import Kategori from '#models/kategori'
import Kota from '#models/kota'


export default class WisatasController {
  /**
   * Display a list of resource
   */
  async index({view}: HttpContext) {
    const allWisatas = await Wisata.query()
      .preload('kota')
      .preload('kategori')
    return view.render('wisatas.index', { wisatas: allWisatas })
  }

  /**
   * Display form to create a new record
   */
  async create({view}: HttpContext) {
    const kota = await Kota.all()
    const kategori = await Kategori.all()
    return view.render('wisatas.create', { kota, kategori })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['nama', 'deskripsi', 'kotaId', 'kategoriId', 'biayaMasuk', 'gambar'])
    await Wisata.create(data)
    response.redirect().toRoute('wisatas.index')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const wisata = await Wisata.findOrFail(params.id)
    const kota = await Kota.all
    const kategori = await Kategori.all()
    return view.render('wisatas.show', { wisata, kota, kategori })
  }

  /**
   * Edit individual record
   */
  async edit({ params , view }: HttpContext) {
    const wisata = await Wisata.findOrFail(params.id)
    const kota = await Kota.all()
    const kategori = await Kategori.all()
    return view.render('wisatas.edit', { wisata, kota, kategori })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request , response }: HttpContext) {
    const wisata = await Wisata.findOrFail(params.id)
    const data = request.only(['nama', 'deskripsi', 'kotaId', 'kategoriId', 'biayaMasuk', 'gambar'])
    wisata.merge(data)
    await wisata.save()
    return response.redirect().toRoute('wisatas.index')
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const wisata = await Wisata.findOrFail(params.id)
    await wisata.delete()
    return response.redirect().toRoute('wisatas.index')
  }
}