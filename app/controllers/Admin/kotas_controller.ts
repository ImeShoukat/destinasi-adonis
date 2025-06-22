import type { HttpContext } from '@adonisjs/core/http'
import Kota from '#models/kota'
import { createKotaValidator, updateKotaValidator } from '#validators/kota'

export default class KotasController {
  async index({ view }: HttpContext) {
    const kotas = await Kota.query().orderBy('id', 'asc')
    return view.render('pages/admin/kota/index', { kotas })
  }

  create({ view }: HttpContext) {
    return view.render('pages/admin/kota/create')
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createKotaValidator)
    await Kota.create(payload)
    session.flash('notification', 'Data kota berhasil ditambahkan!')
    return response.redirect().toRoute('admin.kota.index')
  }

  async edit({ params, view }: HttpContext) {
    const kota = await Kota.findOrFail(params.id)
    return view.render('pages/admin/kota/edit', { kota })
  }

  async update({ params, request, response, session }: HttpContext) {
    const kota = await Kota.findOrFail(params.id)
    const payload = await request.validateUsing(updateKotaValidator, { meta: { id: params.id }})
    kota.merge(payload)
    await kota.save()
    session.flash('notification', 'Data kota berhasil diperbarui!')
    return response.redirect().toRoute('admin.kota.index')
  }

  async destroy({ params, response, session }: HttpContext) {
    const kota = await Kota.findOrFail(params.id)
    await kota.delete()
    session.flash('notification', 'Data kota berhasil dihapus!')
    return response.redirect().back()
  }
}