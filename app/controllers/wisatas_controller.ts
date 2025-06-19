import type { HttpContext } from '@adonisjs/core/http'
import Wisata from '#models/wisata'
import Kategori from '#models/kategori'
import Kota from '#models/kota'
import Ulasan from '#models/ulasan'


export default class WisatasController {
  /**
   * Display a list of resource
   */
  async index({view}: HttpContext) {
    const allWisatas = await Wisata.query()
      .preload('kota')
      .preload('kategori')
    return view.render('pages/wisata/index', { wisatas: allWisatas })
  }

  /**
   * Display form to create a new record
   */
  async create({view}: HttpContext) {
    const kota = await Kota.all()
    const kategori = await Kategori.all()
    return view.render('pages/wisata/create', { kota, kategori })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['nama', 'deskripsi', 'kotaId', 'kategoriId', 'biayaMasuk', 'gambar'])
    await Wisata.create(data)
    return response.redirect('/wisata')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const wisata = await Wisata.query()
      .where('id', params.id)
      .preload('kota')
      .preload('kategori')
      .preload('ulasan', (ulasanQuery) => {
        ulasanQuery
          .preload('user')
          .orderBy('createdAt', 'desc')
      })
      .firstOrFail()
    return view.render('pages/wisata/show', { wisata })
  }

  /**
   * Edit individual record
   */
  async edit({ params , view }: HttpContext) {
    const wisata = await Wisata.findOrFail(params.id)
    const kota = await Kota.all()
    const kategori = await Kategori.all()
    return view.render('pages/wisata/edit', { wisata, kota, kategori })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request , response }: HttpContext) {
    const wisata = await Wisata.findOrFail(params.id)
    const data = request.only(['nama', 'deskripsi', 'kotaId', 'kategoriId', 'biayaMasuk', 'gambar'])
    wisata.merge(data)
    await wisata.save()
    return response.redirect('/wisata')
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const wisata = await Wisata.findOrFail(params.id)
    await wisata.delete()
    return response.redirect('/wisata')
  }
}