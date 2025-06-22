import type { HttpContext } from '@adonisjs/core/http'
import Wisata from '#models/wisata'
import Kota from '#models/kota'
import db from '@adonisjs/lucid/services/db'

export default class WisatasController {
  async index({ request, view, auth }: HttpContext) {
    await auth.check() // ✅ penting jika auth.user dipakai di view

    const { kota_id, biaya_max } = request.qs()
    const kotas = await Kota.all()

    const query = Wisata.query().preload('kota').preload('kategori')

    if (kota_id) {
      query.where('kota_id', kota_id)
    }

    if (biaya_max) {
      query.where('biaya_masuk', '<=', biaya_max)
    }

    const wisatas = await query.orderBy('created_at', 'desc')

    return view.render('pages/wisata/index', {
      wisatas,
      kotas,
      filters: { kota_id, biaya_max },
      auth, // ✅ pastikan auth disertakan jika ingin digunakan di view
    })
  }

  async show({ params, view, auth }: HttpContext) {
    await auth.check()

    const wisata = await Wisata.query()
      .where('id', params.id)
      .preload('kota')
      .preload('kategori')
      .preload('ulasans', (query) => {
        query.preload('user').orderBy('created_at', 'desc')
      })
      .firstOrFail()

    return view.render('pages/wisata/show', { wisata, auth })
  }

  async populer({ view, auth }: HttpContext) {
    await auth.check()

    const wisatas = await Wisata.query()
      .preload('kota')
      .preload('kategori')
      .select('*')
      .select((db) =>
        db
          .from('ulasans')
          .whereColumn('ulasans.wisata_id', 'wisatas.id')
          .avg('rating')
          .as('ulasans_avg_rating')
      )
      .select((db) =>
        db
          .from('ulasans')
          .whereColumn('ulasans.wisata_id', 'wisatas.id')
          .count('*')
          .as('ulasans_count')
      )
      .whereHas('ulasans')
      .orderBy('ulasans_avg_rating', 'desc')
      .limit(10)

    return view.render('pages/wisata/populer', { wisatas, auth })
  }
}
