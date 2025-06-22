import type { HttpContext } from '@adonisjs/core/http'
import Kategori from '#models/kategori'
import Kota from '#models/kota'
import Wisata from '#models/wisata'
import { createWisataValidator, updateWisataValidator } from '#validators/wisata'

export default class WisatasController {
  async index({ view }: HttpContext) {
    const wisatas = await Wisata.query().preload('kota').preload('kategori').orderBy('id', 'asc')
    return view.render('pages/admin/wisata/index', { wisatas })
  }

  async create({ view }: HttpContext) {
    const kotas = await Kota.all()
    const kategoris = await Kategori.all()
    return view.render('pages/admin/wisata/create', { kotas, kategoris })
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createWisataValidator)
    await Wisata.create(payload)
    session.flash('notification', 'Data wisata berhasil ditambahkan!')
    return response.redirect().toRoute('admin.wisata.index')
  }

  async edit({ params, view }: HttpContext) {
    const wisata = await Wisata.findOrFail(params.id)
    const kotas = await Kota.all()
    const kategoris = await Kategori.all()
    return view.render('pages/admin/wisata/edit', { wisata, kotas, kategoris })
  }

  async update({ params, request, response, session }: HttpContext) {
    const wisata = await Wisata.findOrFail(params.id)
    const payload = await request.validateUsing(updateWisataValidator)
    wisata.merge(payload)
    await wisata.save()
    session.flash('notification', 'Data wisata berhasil diperbarui!')
    return response.redirect().toRoute('admin.wisata.index')
  }

  async destroy({ params, response, session }: HttpContext) {
    const wisata = await Wisata.findOrFail(params.id)
    await wisata.delete()
    session.flash('notification', 'Data wisata berhasil dihapus!')
    return response.redirect().back()
  }
}