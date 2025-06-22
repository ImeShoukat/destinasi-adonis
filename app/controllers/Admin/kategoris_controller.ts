import type { HttpContext } from '@adonisjs/core/http'
import Kategori from '#models/kategori'
import { createKategoriValidator, updateKategoriValidator } from '#validators/kategori'

export default class KategorisController {
  async index({ view }: HttpContext) {
    const kategoris = await Kategori.query().orderBy('id', 'asc')
    return view.render('pages/admin/kategori/index', { kategoris })
  }

  create({ view }: HttpContext) {
    return view.render('pages/admin/kategori/create')
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createKategoriValidator)
    await Kategori.create(payload)
    session.flash('notification', 'Data kategori berhasil ditambahkan!')
    return response.redirect().toRoute('admin.kategori.index')
  }

  async edit({ params, view }: HttpContext) {
    const kategori = await Kategori.findOrFail(params.id)
    return view.render('pages/admin/kategori/edit', { kategori })
  }

  async update({ params, request, response, session }: HttpContext) {
    const kategori = await Kategori.findOrFail(params.id)
    const payload = await request.validateUsing(updateKategoriValidator, { meta: { id: params.id }})
    kategori.merge(payload)
    await kategori.save()
    session.flash('notification', 'Data kategori berhasil diperbarui!')
    return response.redirect().toRoute('admin.kategori.index')
  }

  async destroy({ params, response, session }: HttpContext) {
    const kategori = await Kategori.findOrFail(params.id)
    await kategori.delete()
    session.flash('notification', 'Data kategori berhasil dihapus!')
    return response.redirect().back()
  }
}